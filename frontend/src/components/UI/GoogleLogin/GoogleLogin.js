import React from 'react';
import GoogleLoginButton from 'react-google-login';
import {googleClientId} from "../../../config";
import {FcGoogle} from "react-icons/fc";
import Button from '@mui/material/Button';
import {useDispatch} from "react-redux";
import {googleLogin} from "../../../store/actions/usersActions";

const GoogleLogin = () => {
    const dispatch = useDispatch();

    const handleLogin = response => {
        dispatch(googleLogin(response));
    };

    return (
        <GoogleLoginButton
            clientId={googleClientId}
            render={props => (
                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<FcGoogle />}
                    onClick={props.onClick}
                >
                    Log in with Google
                </Button>
            )}
            onSuccess={handleLogin}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleLogin;
