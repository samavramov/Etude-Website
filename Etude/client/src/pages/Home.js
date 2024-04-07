import {Grid, Container} from '@mui/material';
import GymnastProfile from '../components/GymnastProfile';

import {GetAllGymnasts} from '../api';
import { useState, useEffect } from "react";

const Home = () => {
    const [data, setData] = useState('');
    useEffect(() => {
      GetAllGymnasts().then((res) => setData(res.data));
    }, []);

    if (!data) {
      return <p>Loading data...</p>;
    }

    return (
    <div className="App">
        <Container sx={{ marginY: 5 }}>
            <Grid container spacing={5}>
                {data.map((gymnast, index) => (
                    <GymnastProfile gymnast={gymnast} />)
                )}
            </Grid>
        </Container>
    </div>);
}
export default Home
