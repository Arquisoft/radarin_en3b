import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MapView from "./MapView";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { List, Divider, AppBar, Tabs, Tab } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "../css/Map.css";
import LocationList from "./LocationsList";
import LocationListMock from "./LocationsListMock";

const useStyles = makeStyles((theme) => ({
    
    root: {
        display: "flex",
        background: "rgb(245, 244, 244)"
    },
    tabs: {
        flexGrow: 1,
    },
    tabsBar: {
        flexGrow: 1,
        backgroundColor: "#235996",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: 350,
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
    toolbar: {
        marginTop: "-2.0em",
    },
    drawerPaper: {
        width: 350,

        marginTop: "5.8em",
        height: "calc(100% - 5.8em)",

        position: "absolute",
        "z-index": "9",
    },
    drawerPaperInner: {
        width: 350,
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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                data-testid="button"
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
                        classes={{
                            paper: classes.drawerPaperInner,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <div className={classes.tabs}>
                    <AppBar className={classes.tabsBar} position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="Tabs for locations">
                        <Tab label="Created locations" {...a11yProps(0)} />
                        <Tab label="Your daily routes" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <div>
                            <div className={classes.toolbar} />
                            <List component='nav'>
                                <LocationListMock locationType='created'/>
                                <Divider />
                            </List>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div>
                            <div className={classes.toolbar} />
                            <List component='nav'>
                                <LocationListMock locationType='poly'/>
                                <Divider />
                            </List>
                        </div>
                    </TabPanel>
                    </div>
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
                        <div className={classes.tabs}>
                    <AppBar className={classes.tabsBar} position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="Tabs for locations">
                        <Tab label="Created locations" {...a11yProps(0)} />
                        <Tab label="Your daily routes" {...a11yProps(1)} />
                    </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <div>
                            <div className={classes.toolbar} />
                            <List component='nav'>
                                <LocationList locationType='created'/>
                                <Divider />
                            </List>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div>
                            <div className={classes.toolbar} />
                            <List component='nav'>
                                <LocationList locationType='poly'/>
                                <Divider />
                            </List>
                        </div>
                    </TabPanel>
                    </div>
                        
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <MapView />
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }