import React, { useEffect } from 'react';
import { Grid, Typography, List, ListItem, ListItemText , Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbum } from '../../store/actions/albumActions'
import { Link } from "react-router-dom";

const AlbumInfo = ({ match }) => {
    const dispatch = useDispatch();
    const album = useSelector(state => state.albums.album);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchAlbum(match.params.id));
    }, [dispatch, match.params.id]);

    return album && (
        <Grid container direction="column" justifyContent='center'>
            {user?.role === 'admin' && (
                <Grid item sx={{float: 'right'}}>
                    <Button coloe="primary" component={Link} to="/track/new">Add</Button>
                </Grid>
            )}
            <Typography variant="h6" sx={{ margin: '1rem' }}>
                {album.author}
            </Typography>
            <Typography variant="h7" sx={{ margin: '1rem' }}>
                {album.title}
            </Typography>
            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                <List
                    aria-label="contacts"
                    sx={{ minWidth: 480 }}
                >
                    <Grid sx={{ bgcolor: '#e8e8e8', justifyContent: 'center', margin: '1rem' }}>
                        <ListItem disablePadding>
                            <ListItemText inset primary={album.album} />
                            <ListItemText inset primary={album.title} />
                            <ListItemText inset primary={album.duration} />
                        </ListItem>
                    </Grid>
                </List>
            </Grid>
        </Grid>
    )
}

export default AlbumInfo;
