import { Container, Box, Typography, Stack, Avatar } from "@mui/material";
import { GoogleLogin } from '@react-oauth/google';
import { useCookies } from "react-cookie";

const Login = () => {
  const [cookies, setCookie] = useCookies(["auth"]);

  const responseMessage = (token) => {
    console.log("token: " + token)
    setCookie("auth", JSON.stringify(token), { path: "/" });
    console.log(cookies["auth"]);
    document.location.href = '/';
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <Container>
      <Typography variant="h1" align="center">
        <br></br>
        Welcome to Etude Rythmic Gymnastics
      </Typography>
      <br></br>
      <br></br>
      <br></br>
      <Stack direction="row" spacing={5} justifyContent="Center">
            <Avatar alt="Etude Logo" src="/EtudeLogo.jpg" variant="square" sx={{ width: 400, height: 400 }} />
       </Stack>
      <br></br>
      <Stack direction="row" spacing={2} justifyContent="Center">
        <Typography variant="h5" component="h1" align="center">
          <br></br>
          Please Sign In Using Google Below
        </Typography>
      </Stack>
      <br></br>
      <br></br>
      <Stack direction="row" spacing={2} justifyContent="Center">
        <Box>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </Box>
      </Stack>
    </Container>
  );
}
export default Login
