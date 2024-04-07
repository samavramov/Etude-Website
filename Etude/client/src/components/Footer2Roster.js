import React from 'react';
import { Button, Stack, Link } from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
const Footer = () => {
    const redirect = '/Roster' 
    return (
        <Stack direction="row" spacing={5} justifyContent="Center">
            <footer>
            <Link href={redirect} underline="none" color="inherit">
                <Button variant="contained" startIcon={<ReorderIcon />}>
                    Change Layout to List
                </Button>
                </Link>
            </footer>
        </Stack>
    );
};

export default Footer;