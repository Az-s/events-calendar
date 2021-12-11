import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Menu, MenuItem, Button, } from '@mui/material';
import { logoutUser } from '../../../../store/actions/usersActions';
import { NavLink } from "react-router-dom";

const UserMenu = ({ user }) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
                Hello, {user.username}!
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <NavLink to="/artist/new" exact>Add artist</NavLink>
                <NavLink to="/albums/new" exact>Add album</NavLink>
                <NavLink to="/track/new" exact>Add track</NavLink>
                <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default UserMenu;