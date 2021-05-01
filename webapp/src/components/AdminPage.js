import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BlockIcon from '@material-ui/icons/Block';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAdmin, refreshUsersAdmin, setSearchText } from "../redux/slices/adminUsersSlice";
import { useSession } from "@inrupt/solid-ui-react";

export default function AdminPage(props) {
    let { session } = useSession();
    if (typeof props.sess !== "undefined")
        session = props.sess;

    const dispatch = useDispatch();
    const userStatus = useSelector(state => state.users.status);
    const refreshStatus = useSelector(state => state.users.refreshStatus);
    const error = useSelector(state => state.users.error);
    const filterText = useSelector(state => state.users.searchText);

    const users = useSelector(state => state.users.users);

    useEffect(() => {
        if (userStatus === "idle") {
            dispatch(fetchUsersAdmin(session));
        } else if (userStatus === "succeeded" && refreshStatus === "idle") {
            setTimeout(() => {
                dispatch(refreshUsersAdmin(session));
            }, 30000);
        }
    }, [userStatus, refreshStatus, dispatch, session]);

    const onChange = e => {
        dispatch(setSearchText(e.target.value));
    }

    let content;

    if (userStatus === "loading") {
        content = (<div className="spinner-border mt-5 center2" role="status">
            <span className="sr-only">Loading...</span>
        </div>);
    } else if (userStatus === "succeeded") {
        content = (
            <Grid item xs={12} md={6}>
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
                            users.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()))
                                .map(element => {
                                    return (< ListItem >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={element.webId}
                                            secondary='Secondary text'
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <BlockIcon />
                                            </IconButton>
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