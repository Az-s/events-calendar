import React, { useEffect } from 'react';
import { Grid, Card, CardMedia, CardHeader, CardContent, Button, Typography, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from '../../store/actions/albumActions';
import Spinner from '../../components/UI/Spinner/Spinner';

const AlbumList = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums.albums);
    const fetchLoading = useSelector(state => state.albums.fetchLoading);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">Albums</Typography>
                    </Grid>
                    {user?.role === 'admin' && (
                        <Grid item>
                            <Button coloe="primary" component={Link} to="/albums/new">Add</Button>
                        </Grid>
                    )}
                </Grid>
                { fetchLoading ? (
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <Spinner />
                        </Grid>
                    </Grid>
                ) :
                    albums.map(album => (
                        <Grid key={album.id}>
                            <Typography variant="h6" sx={{ margin: '1rem' }}>
                                {album.artist}
                            </Typography>
                            <Card sx={{ maxWidth: 300, margin: '1rem' }}>
                                <CardHeader
                                    title={album.title}
                                    subheader={album.year}
                                />
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={album.image}
                                    alt="album"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" >
                                        {/* {album.amount} */}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button size="small" component={Link} to='/album/:id'>Album list</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}

export default AlbumList;
