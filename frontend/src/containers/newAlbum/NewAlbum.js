import React from 'react';
import { Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { createAlbum } from "../../store/actions/albumActions";
import AlbumForm from '../../components/AlbumForm/AlbumForm';

const NewAlbum = ({history}) => {
    const dispatch = useDispatch();

    const onSubmit = async albumData => {
        await dispatch(createAlbum(albumData));
        history.replace('/');
    };

    return (
        <>
            <Typography variant="h4">New Album</Typography>
            <AlbumForm
                onSubmit={onSubmit}
            />
        </>
    )
}

export default NewAlbum;
