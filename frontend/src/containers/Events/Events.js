import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Container, Box , Grid, Card , CardContent , CardMedia , Typography } from "@mui/material";
import { fetchProducts } from "../../store/actions/productsActions";

const Events = ({ mathch, history }) => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events.events);
    const fetchLoading = useSelector(state => state.events.fetchLoading);
    const user = useSelector(state => state.users.user);
    const search = useLocation().search;

    const [open, setOpen] = useState(false);

    const handleClickOpen = (id) => {
        setOpen({
            [id]: true
        });
    };

    // useEffect(() => {
    //     dispatch(fetchEvents(search));
    // }, [dispatch, search]);

    // const delContact = async (id) => {
    //     try {
    //         await dispatch(deleteEvent(id));
    //     } finally {
    //         handleClose();
    //     }
    // };

    return (
        <Container maxWidth="lg">
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            {Events.map((event) => (
                <Grid key={event.id}>
                    <Card sx={{ display: 'flex',  margin: '1rem' }}
                        className='cards'
                        onClick={() => handleClickOpen(event.id)}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '300px' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {event.title}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                    <Modalinfo
                        key={event.id}
                        show={open[event.id]}
                        close={handleClose}
                        id={event.id}
                        title={event.title}
                        description={event.description}
                        published={event.published}
                        onDelete={() => delContact(event.id)}
                    />
                </Grid>
            ))}
        </Grid>
    </Container>
    )
}

export default Events;
