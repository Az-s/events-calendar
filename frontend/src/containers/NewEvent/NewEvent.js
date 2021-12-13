import React from 'react';
import { Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { createAlbum } from "../../store/actions/albumActions";
import EventForm from '../../components/EventForm/EventForm';

const NewEvent = ({history}) => {
    const dispatch = useDispatch();

    const onSubmit = async albumData => {
        await dispatch(createAlbum(albumData));
        history.replace('/');
    };

    return (
        <>
            <Typography variant="h4">New Event</Typography>
            <EventForm
                onSubmit={onSubmit}
            />
        </>
    )
}

export default NewEvent;