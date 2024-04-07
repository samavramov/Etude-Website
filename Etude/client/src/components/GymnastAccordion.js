import { Container, Stack, Box, Typography, Link, Paper, styled, Avatar } from '@mui/material';
const GymnastAccordion = ({ gymnast }) => {
    const redirect = '/' + gymnast.id;
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <Container>
            <Link href={redirect} underline="none" color="inherit">
                <br></br>
                <Stack spacing={5} >
                    <Item>
                        <Box paddingX={1}>
                            <Stack direction="row" spacing={5}>
                            <Avatar alt="Etude Logo" src={gymnast.pic} sx={{ width: 56, height: 56 }} />
                                <Typography variant="h3" component="h2" align="left">
                                    {gymnast.first} {gymnast.last}
                                </Typography>
                            </Stack>
                        </Box>
                        <Box paddingX={1}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                        </Box>
                    </Item>
                </Stack>
                <br></br>
            </Link>
        </Container>
    );
};
export default GymnastAccordion;
