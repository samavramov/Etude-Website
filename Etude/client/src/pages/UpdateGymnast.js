import { Container, Grid } from "@mui/material";
import Form from "../components/Form";
import { useParams } from "react-router-dom";
import { GetGymnast } from "../api";
import { useState, useEffect } from "react";

const UpdateGymnast = () => {
  const gymnastId = useParams().gymnastId;
  const [gymnast, setGymnast] = useState('');
  useEffect(() => {
    GetGymnast(gymnastId).then((res) => setGymnast(res.data));
  }, [gymnastId]);
  if (!gymnast) {
    return <p>Gymnast not found</p>;
  }
  return (
    <Container>
      <Grid>
        <Form gymnast={gymnast} />
      </Grid>
    </Container>
  );
};
export default UpdateGymnast;
