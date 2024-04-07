import { AppBar, Toolbar, Typography, Container, Avatar, Button, Stack, Link, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
const redirect = '/';
const redirect2newgymnast = '/newgymnast';
const exit = '/';
function ResponsiveAppBar() {
  const signOut = () => {
    document.cookie =
      "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.location.href = exit;
  };
return (
    <AppBar position="static" sx={{ bgcolor: "purple" }}>
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Box m={1}>
            <Stack direction="row" spacing={5}>
              <Link href={redirect} underline="none" color="inherit" >
                <Avatar alt="Etude Logo" src="/EtudeLogo.jpg" variant="square" sx={{ width: 100, height: 100 }} />
              </Link>
            </Stack>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            padding={3}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            <Link href={redirect} underline="none" color="inherit">
              Etude Rythmic Gymnastics
            </Link>
          </Typography>
          <Stack direction="row" spacing={4}>
            <Container align="Right">
              <Stack direction="row" spacing={1}>
                <Link href={redirect} underline="none" color="inherit" >
                  <Button color='inherit' startIcon={<HomeIcon />}>
                    Home
                  </Button>
                </Link>
                <Link href={redirect2newgymnast} underline="none" color="inherit">
                  <Button color='inherit' startIcon={<AddIcon />}>
                    New Gymnast
                  </Button>
                </Link>
                <Button onClick={signOut} color='inherit'>
                  Sign Out
                </Button>
              </Stack>
            </Container>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default ResponsiveAppBar;
