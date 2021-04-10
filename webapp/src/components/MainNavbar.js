import React, { useEffect } from "react";
import NavbarAnonym from "./NavbarAnonym";
import NavbarSession from "./NavbarSession";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "@inrupt/solid-ui-react";
import { setLogguedStatus } from "../redux/slices/userSlice";

function MainNavbar() {
    const loggued = useSelector(state => state.user.logguedStatus);
    const { session } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if(session.info.isLoggedIn)
            dispatch(setLogguedStatus(true));
        else
            dispatch(setLogguedStatus(false));
    });

    if (!loggued)
        return <NavbarAnonym></NavbarAnonym>;
    else
        return <NavbarSession></NavbarSession>;
}
export default MainNavbar;