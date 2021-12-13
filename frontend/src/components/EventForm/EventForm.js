import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';

const EventForm = ({ onSubmit }) => {
    const [event, setEvent] = useState({
        title: "",
        description: "",
    });

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(album).forEach(key => {
            formData.append(key, album[key]);
        });

        onSubmit(formData);
    };

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setEvent(prev => {
            return { ...prev, [name]: value };
        });
    };

    // const fileChangeHandler = e => {
    //     const name = e.target.name;
    //     const file = e.target.files[0];
    //     setEvent(prev => {
    //         return { ...prev, [name]: file };
    //     });
    // };

    return (
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
                    value={event.title}
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
                    value={event.description}
                    onChange={inputChangeHandler}
                />
            </Grid>

            <Grid item xs>
                <Button type="submit" color="primary" variant="contained">Create</Button>
            </Grid>
        </Grid>
    )
}

export default EventForm;
