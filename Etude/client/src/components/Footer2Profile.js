import React from 'react';
import { Button, Stack, Link } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
const FooterProfile = () => {
    const redirect = '/' 
    return (
        <Stack direction="row" spacing={5} justifyContent="Center">
            <footer>
            <Link href={redirect} underline="none" color="inherit">
                <Button variant="contained" startIcon={<GridViewIcon />}>
                    Change Layout to Card
                </Button>
                </Link>
            </footer>
        </Stack>
    );
};

export default FooterProfile;