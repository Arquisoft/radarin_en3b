import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MapView from "../MapView";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { List, Divider } from "@material-ui/core";
import "../../css/Map.css";
import Location from "./Location";
import Api from '../../api/API';
import { useSession } from "@inrupt/solid-ui-react";
import getOrCreatePrivateFilePod from "../../utils/getOrCreatePrivateFilePod";
import { getSolidDataset, getThing, getUrlAll, getSourceUrl, getStringNoLocale } from "@inrupt/solid-client";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "rgb(245, 244, 244)"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  // toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    marginTop: "4.2em",
    height: "calc(100% - 8.2em)",
    position: "absolute",
    "z-index": "9",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: "rgb(245, 244, 244)"
  },
}));

export default function LocationsView(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { session } = useSession();
  const { webId } = session.info;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(
    () => {
      async function fetchData() {
        const profileDataset = await getSolidDataset(session.info.webId, {
          fetch: session.fetch,
        });
        const profileThing = getThing(profileDataset, session.info.webId);
        const podsUrls = getUrlAll(
          profileThing,
          "http://www.w3.org/ns/pim/space#storage"
        );
        const pod = podsUrls[0];
        const privateContainerUri = `${pod}private/RadarinPrKey/`;
        const prKeyFile = await getOrCreatePrivateFilePod(privateContainerUri, session.fetch);
        const prKeyUrl = getSourceUrl(prKeyFile);
        const publicDataset = await getSolidDataset(prKeyUrl, { fetch: session.fetch });
        const existing = getThing(publicDataset, prKeyUrl);
        console.log(existing);
    
        //const prKField = setStringNoLocale(existing, "https://www.w3.org/ns/auth/cert#PrivateKey", privateKey);
    
        const aux = getStringNoLocale(existing, "https://www.w3.org/ns/auth/cert#PrivateKey");
        console.log(aux);
        Api.setIdentity(webId, aux);
        const l = await Api.getLocations();
        setLocations(l);
      }
      fetchData();
    });

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <List component='nav'>
        {locations.map((location, i) => <Location coords={location.coords} key={i} setMapCoordinates={setCoordinates}></Location>)}
        <Divider />
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <MapView/>
      </main>
    </div>
  );
}

LocationsView.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};