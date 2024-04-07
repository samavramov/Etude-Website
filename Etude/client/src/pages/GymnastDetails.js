import * as React from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Link, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useParams } from "react-router-dom";
import { GetGymnast } from "../api";
import { useState, useEffect } from "react";
import { DeleteGymnast } from '../api';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
const GymnastDetails = () => {
  const gymnastId = useParams().gymnastId;
  const [gymnast, setGymnast] = useState('');
  const redirect = '/';
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    GetGymnast(gymnastId).then((res) => setGymnast(res.data));
  }, [gymnastId]);
  if (!gymnast) {
    return <p>Gymnast not found</p>;
  }

  const handleDeleteGymnast = () => {
    return DeleteGymnast(gymnastId);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <Container sx={{ border: '2px solid grey', width: 900 }} align="center">
        <Typography variant="h3" component="h1" marginTop={3} align="center">
          Gymnast Details for {gymnast.first} {gymnast.last}
        </Typography>
        <Box height={250} width={250} paddingY={5}>
          <img src={gymnast.pic}
            alt=""
            className="img"></img>
        </Box>
        <Accordion margin={5}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Gymnast Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Name: {gymnast.first} {gymnast.last}
              <br></br>
              Birthday: {gymnast.Birthday}
              <br></br>
              Level: {gymnast.level}
              <br></br>
              Additional Comments: {gymnast.comments}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion margin={5}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>
              Waivers
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {!gymnast.waivers ? (
                <p>No Present Waivers Found</p>
              ) : (<ul>
                {gymnast.waivers.map((waiver) => (

                  <Container>
                    <Accordion>

                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography><Typography key={waiver.name}>{waiver.name}</Typography></Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <Box><Typography key={waiver.url}> Waiver URL: <a href={waiver.url} target="_blank" rel="noopener noreferrer">
                            {waiver.url.length > 30
                              ? waiver.url.substring(0, 30) + "..."
                              : waiver.url}
                          </a></Typography></Box>
                          <Box><Typography key={waiver.isComplete}>
                            Waiver Status: {waiver.isComplete ? "Complete" : "Incomplete"}
                          </Typography></Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Container>
                ))}
              </ul>
              )}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <br></br>
        <Typography variant="h3" component="h1" marginTop={1} marginBottom={1} align="center">
          <Button
            variant="contained"
            style={{ minWidth: '100%' }}
            endIcon={<UpdateIcon />}
            onClick={()=> document.location.href = '/updategymnast/' + gymnastId}
            >
            Update Gymnast
          </Button>
          <React.Fragment>
            <Button
              variant="contained"
              color="error"
              style={{ minWidth: '100%' }}
              onClick={handleClickOpen}
             endIcon={<DeleteIcon />}
            >
              Delete Gymnast
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this gymnast?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Deleting this gymnast is a permanent action. This cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Link href={redirect} underline="none" color="inherit">
                  <Button color="error" onClick={handleDeleteGymnast} autoFocus>
                    Yes
                  </Button>
                </Link>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </Typography>
      </Container>
    </Container>
  );
}
export default GymnastDetails;
