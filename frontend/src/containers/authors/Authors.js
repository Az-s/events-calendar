import React, { useEffect } from 'react';
import { Card, CardMedia, CardContent, Button, Typography, CardActions, Grid } from '@mui/material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthors } from '../../store/actions/authorActions';
import Spinner from '../../components/UI/Spinner/Spinner';

const Authors = () => {
    const dispatch = useDispatch();
    const authors = useSelector(state => state.authors.authors);
    const user = useSelector(state => state.users.user);
    const fetchLoading = useSelector(state => state.albums.fetchLoading);

    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            {user?.role === 'admin' && (
                <Grid item sx={{ float: 'right' }}>
                    <Button coloe="primary" component={Link} to="/artist/new">Add</Button>
                </Grid>
            )}
            {fetchLoading ? (
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                        <Spinner />
                    </Grid>
                </Grid>
            ) :
                authors.map(author => (
                    <Card sx={{ maxWidth: 300, margin: '1rem' }} key={author.id}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={author.image}
                            alt="executor"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {author.name}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="small" component={Link} to='/albums'>More info</Button>
                        </CardActions>
                    </Card>
                ))}
        </Grid>
    )
}

export default Authors;
