import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';

const TrackForm = ({ onSubmit }) => {
    const [track, setTrack] = useState({
        title: "",
        duration: "",
        number: "",
        youtube: ''
    });

    const submitFormHandler = e => {
        e.preventDefault();
        onSubmit();
    };

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setTrack(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    return track && (
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
                    label="Title"
                    name="title"
                    value={track.title}
                    onChange={inputChangeHandler}
                />
            </Grid>

            <Grid item xs>
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    type="number"
                    label="Number"
                    name="number"
                    value={track.number}
                    onChange={inputChangeHandler}
                />
            </Grid>

            <Grid item xs>
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Duration"
                    name="duration"
                    value={track.duration}
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
                    label="Youtube"
                    name="youtube"
                    value={track.youtube}
                    onChange={inputChangeHandler}
                />
            </Grid>

            <Grid item xs>
                <Button type="submit" color="primary" variant="contained">Create</Button>
            </Grid>
        </Grid>
    )
}

export default TrackForm;
