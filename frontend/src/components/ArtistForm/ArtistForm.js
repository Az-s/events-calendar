import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';

const ArtistForm = ({ onSubmit }) => {

    const [artist, setArtist] = useState({
        name: "",
        description: '',
        image: null,
    });

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(artist).forEach(key => {
            formData.append(key, artist[key]);
        });

        onSubmit(formData);
    };

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setArtist(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setArtist(prevState => {
            return { ...prevState, [name]: file };
        });
    }

    return artist && (
        <Grid
            container
            direction="column"
            spacing={2}
            component="form"
            autoComplete="off"
            onSubmit={submitFormHandler}
            sx={{ padding: '1rem 4rem' }}
        >

            <Grid item xs>
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    label="Artist"
                    name="name"
                    value={artist.name}
                    onChange={inputChangeHandler}
                />
            </Grid>

            <Grid item xs>
                <TextField
                    required
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    label="Description"
                    name="description"
                    value={artist.description}
                    onChange={inputChangeHandler}
                />
            </Grid>

            <Grid item xs>
                <TextField
                    required
                    type="file"
                    name="image"
                    onChange={fileChangeHandler}
                />
            </Grid>

            <Grid item xs>
                <Button type="submit" color="primary" variant="contained">Create Artist</Button>
            </Grid>
        </Grid>
    )
}

export default ArtistForm;
