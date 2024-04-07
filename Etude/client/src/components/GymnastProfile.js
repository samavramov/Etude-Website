import {Card,CardActionArea, Grid, Box, Typography, Link,} from '@mui/material/';
const GymnastProfile = ({gymnast}) => {
    const redirect = '/' + gymnast.id;
    return (  
        <Grid item xs={3}>
            <Link href={redirect} underline="none" color="inherit">
                <Card elevation={6} >
                    <CardActionArea>
                        <img src={gymnast.pic}
                            alt=""
                            className="img" />
                        <Box paddingX={1}>
                            <Typography variant="subtitle1" component="h2" align="center">
                                {gymnast.first} {gymnast.last}
                            </Typography>
                        </Box>
                        <Box paddingX={1}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                        </Box>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid >
      
    );
};
export default GymnastProfile;
