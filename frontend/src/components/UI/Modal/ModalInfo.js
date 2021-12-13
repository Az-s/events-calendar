import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import EmailIcon from '@material-ui/icons/Email';

const Modalinfo = ({ show, close, title, description, published, id, onDelete }) => {

    return (
        <>
            <Modal
                hideBackdrop
                open={show}
                onClose={close}
                id={id}
            >
                <Box sx={{ ...style, width: 400 }}>
                    <Button onClick={close} sx={{ float: 'right' }}>&#10006;</Button>
                    <div className='contactCard'>
                        <div className='contactInfo'>
                            <h2>{title}</h2>
                            <p>
                                <AddIcCallIcon /> {description}
                            </p>
                            <p>
                                <EmailIcon /> {published}
                            </p>
                        </div>
                    </div>
                    <Stack spacing={2} direction="row" mt={2} justifyContent='center'>
                        <NavLink to={'/' + id + '/edit'}>
                            <Button
                                variant="contained"
                            >
                                Edit
                            </Button>
                        </NavLink>
                        <Button
                            variant="contained"
                            type='button'
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
};

export default Modalinfo;