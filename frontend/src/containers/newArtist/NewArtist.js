import React from 'react';
import { Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { createArtist } from "../../store/actions/albumActions";
import ArtistForm from '../../components/ArtistForm/ArtistForm';

const NewArtist = ({history}) => {
    const dispatch = useDispatch();

    const onSubmit = async artistData => {
        await dispatch(createArtist(artistData));
        history.replace('/');
    };

    return (
        <>
            <Typography variant="h4">Add Artist</Typography>
            <ArtistForm
                onSubmit={onSubmit}
            />
        </>
    )
}

export default NewArtist;
