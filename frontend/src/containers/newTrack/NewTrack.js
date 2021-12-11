import React from 'react';
import { Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { createTrack } from "../../store/actions/albumActions";
import TrackForm from '../../components/TrackForm/TrackForm';

const NewTrack = ({history}) => {
    const dispatch = useDispatch();

    const onSubmit = async trackData => {
        await dispatch(createTrack(trackData));
        history.replace('/');
    };


    return (
        <>
            <Typography variant="h4">New Track</Typography>
            <TrackForm
                onSubmit={onSubmit}
            />
        </>
    )
}

export default NewTrack;
