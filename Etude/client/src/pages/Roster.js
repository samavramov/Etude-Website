import { Container, Grid } from "@mui/material";
import GymnastAccordion from '../components/GymnastAccordion';
import { GetAllGymnasts } from "../api";
import { useState, useEffect } from "react";

const Roster = () => {
    const [data, setData] = useState('');
    useEffect(() => {
        GetAllGymnasts().then((res) => setData(res.data));
    }, []);

    if (!data) {
        return <p>Loading data...</p>;
    }

    return <Container>
        <Grid container spacing={0}>
            {data.map((gymnast, index) => (
                <GymnastAccordion gymnast={gymnast} key={index} />)
            )}
        </Grid>
    </Container>
}

export default Roster
