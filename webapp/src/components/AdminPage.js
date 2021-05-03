import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BlockIcon from "@material-ui/icons/Block";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAdmin, refreshUsersAdmin, setSearchText, blockUserAdmin, unblockUserAdmin, getBlacklistAdmin, changeShow, } from "../redux/slices/adminUsersSlice";
import { makeStyles } from "@material-ui/core/styles";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import "../css/AdminView.css";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "300px",
        margin: "1em",
        boxSizing: "border-box",
        alignItems: "center",
        justify: "center",
    },
    title: {
        textAlign: 'center',
        align: 'center',
        marginTop: "2%",
        marginBottom: "2%",
    },
    icon: {
        marginTop: "2%",
        fontSize: 40,
        color: "primary",
    },
    appBar: {
        position: "relative",
    },
    button: {
        marginTop: "2em",
    }

}));

export default function AdminPage() {
    const dispatch = useDispatch();
    const userStatus = useSelector(state => state.users.status);
    const refreshStatus = useSelector(state => state.users.refreshStatus);
    const error = useSelector(state => state.users.error);
    const filterText = useSelector(state => state.users.searchText);
    const users = useSelector(state => state.users.users);
    const locationStatus = useSelector(state => state.locations.status);
    const show = useSelector(state => state.users.show);

    useEffect(() => {
        if (locationStatus === "succeeded") {
            dispatch(changeShow(true));
        }


        if (show) {
            if (userStatus === "idle") {
                dispatch(getBlacklistAdmin());
                dispatch(fetchUsersAdmin());
            } else if (userStatus === "succeeded" && refreshStatus === "idle") {
                setTimeout(() => {
                    dispatch(getBlacklistAdmin());
                    dispatch(refreshUsersAdmin());
                }, 6000);
            }
        }
    });

    const onChange = e => {
        dispatch(setSearchText(e.target.value));
    }

    const block = (webId) => {
        dispatch(blockUserAdmin(webId));
        dispatch(getBlacklistAdmin());
        dispatch(refreshUsersAdmin());
    }

    const unblock = (webId) => {
        dispatch(unblockUserAdmin(webId));
        dispatch(getBlacklistAdmin());
        dispatch(refreshUsersAdmin());
    }

    const classes = useStyles();

    const blockedUsers = useSelector(state => state.users.usersBL);

    let blockedUsersArray = [];
    let i;
    for (i = 0; i < blockedUsers?.length; i++) {
        blockedUsersArray.push(blockedUsers[i].webId);
    }

    console.log(users.filter(item => item.toLowerCase().includes(filterText.toLowerCase())));
    let content;


    if (!show || userStatus === "loading") {
        content = (<div className="spinner-border mt-5 center17" role="status">
            <span className="sr-only">Loading...</span>
        </div>);
    } else if (blockedUsers === "unauthorized") {
        content = (<div className="unauthorized" role="status">
            <Typography variant="h3" component="h3" className={classes.title} styles={classes.title}>
                Unauthorized
            </Typography>
        </div>)
    }
    else if (userStatus === "succeeded" && users[0] === "No users") {
        content = (
            <Grid className={classes.root} item xs={12} md={6}>
                <Typography variant="h6">
                    Users:
                </Typography>
                <div>
                    <List>
                        <ListItem>
                            <div className="table-responsible mt-3 mb-3 ml-2">
                                <TextField
                                    type="text"
                                    placeholder="Search"
                                    className="textField"
                                    name="busqueda"
                                    data-testid="input"
                                    onChange={onChange}
                                    value={filterText}
                                />
                            </div>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Loading users..."
                            />
                        </ListItem>
                    </List>
                </div>
            </Grid>
        )
    }
    else if (userStatus === "succeeded") {
        content = (
            <Grid className={classes.root} item xs={12} md={6}>
                <Typography variant="h6">
                    Users:
                </Typography>
                <div>
                    <List>
                        <ListItem>
                            <div className="table-responsible mt-3 mb-3 ml-2">
                                <TextField
                                    type="text"
                                    placeholder="Search"
                                    className="textField"
                                    name="busqueda"
                                    data-testid="input"
                                    onChange={onChange}
                                    value={filterText}
                                />
                            </div>
                        </ListItem>
                        {
                            users.filter(item => item.toLowerCase()
                                .includes(filterText.toLowerCase()))
                                .map(element => {
                                    return (< ListItem key={element} >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText

                                            primary={element.split('//')[1].split('.')[0]}
                                            secondary={element}
                                        />
                                        <ListItemSecondaryAction>
                                            {blockedUsersArray.length !== 0 && blockedUsersArray.includes(element) ? (
                                                <IconButton edge="end" aria-label="block" onClick={function () { unblock(element) }}>
                                                    <LockOpenIcon />
                                                </IconButton>
                                            ) : (
                                                <IconButton edge="end" aria-label="block" onClick={function () { block(element) }}>
                                                    <BlockIcon />
                                                </IconButton>
                                            )}
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    )
                                })

                        }
                    </List>
                </div>
            </Grid>
        )
    } else if (userStatus === "failed") {
        content = <div className="center2">{error}</div>
    }


    return (
        <div>
            {content}
        </div >
    );

}