import { Container, Checkbox, FormGroup, FormControl, FormControlLabel, TextField, Link, Box, Stack, MenuItem, Typography, Button } from '@mui/material';
import React, { useState } from "react"
import { CreateGymnast, UpdateGymnast } from '../api';

function Updater() {
    const [value, setValue] = useState(0);
    return () => setValue(value +1);
}

const Form = ({gymnast}) => {
    const redirect = '/';
    const forceUpdate = Updater();

    const [firstName, setFirstName] = useState(gymnast ? gymnast.first : '');
    const [lastName, setLastName] = useState(gymnast ? gymnast.last : "");
    const [level, setLevel] = useState(gymnast ? gymnast.level : "");
    const [picture, setPic] = useState(gymnast ? gymnast.pic : "");
    const [Birthday, setBirthday] = useState(gymnast ? gymnast.Birthday : "");
    const [comments, setComments] = useState(gymnast ? gymnast.comments : "");
    const [waivers, setWaivers] = useState(gymnast ? gymnast.waivers : []);

    const handleAddWaiver = () => {
        setWaivers([...waivers, { name: '', file: null, isComplete: false }]);
    };

    const handleCreateGymnast = () => {
        if (gymnast) {
            return UpdateGymnast({
              ...gymnast,
              pic: picture,
              first: firstName,
              last: lastName,
              level: level,
              comments: comments,
              Birthday: Birthday,
              waivers: waivers,
            });
        }
        return CreateGymnast({

          pic: picture,
          first: firstName,
          last: lastName,
          level: level,
          comments: comments,
          Birthday: Birthday,
          waivers: waivers,
        });
    }
    const levels = [
        {
            value: 'Beginner',
            label: 'Beginner',
        },
        {
            value: '1',
            label: '1',
        },
        {
            value: '2',
            label: '2',
        },
        {
            value: '3',
            label: '3',
        },
        {
            value: '4',
            label: '4',
        },
        {
            value: '5',
            label: '5',
        },
        {
            value: '6',
            label: '6',
        },
        {
            value: '7',
            label: '7',
        },
        {
            value: '8',
            label: '8',
        },
        {
            value: '9',
            label: '9',
        },
        {
            value: '10',
            label: '10',
        },
        {
            value: 'Elite',
            label: 'Elite',
        },
    ];
    return (
      <Container>
        <br></br>
        <br></br>
        <Typography variant="h3" component="h3" align="left">
          Gymnast Information
        </Typography>
        <br></br>
        <Stack spacing={1}>
          <Stack direction="row" spacing={4} justifyContent="center">
            <Box
              sx={{
                width: 450,
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                label="First Name"
                placeholder="Type Here"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                width: 450,
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                label="Last Name"
                placeholder="Type Here"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                width: 450,
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                label="Birthday"
                id="fullWidth"
                placeholder="YYYY-MM-DD"
                value={Birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Box>
            <TextField
              id="outlined-select"
              select
              label="Level"
              helperText="Please select the gymnast's current level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              {levels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" spacing={4} justifyContent="center">
            <Box
              sx={{
                width: 1200,
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                label="Profile Picture URL"
                placeholder="https://"
                value={picture}
                onChange={(e) => setPic(e.target.value)}
              />
            </Box>
          </Stack>
          <br></br>
          <Stack direction="row" spacing={4} justifyContent="center">
            <FormControl>
              <Box
                sx={{
                  width: 1200,
                  maxWidth: "100%",
                }}
              >
                <TextField
                  fullWidth
                  label="Additional Comments"
                  id="fullWidth"
                  placeholder="Type Here"
                  multiline
                  rows={10}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </Box>
            </FormControl>
          </Stack>
          <br></br>
          <Typography variant="h3" component="h3" align="left">
            Waivers
          </Typography>
          {!waivers ? (
            <p>No Waivers Found</p>
          ) : (
            waivers.map((waiver, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={4}
                justifyContent="center"
              >
                {/* ... components for waiver input fields ... */}
                <Box
                  sx={{
                    width: 2000,
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Waiver Name"
                    id="fullWidth"
                    placeholder="Type Here"
                    value={waiver.name}
                    onChange={(e) => {
                      waiver.name = e.target.value;
                      forceUpdate();
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: 3000,
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Waiver URL"
                    placeholder="https://"
                    value={waiver.url}
                    onChange={(e) => {
                      waiver.url = e.target.value;
                      forceUpdate();
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: 950,
                    maxWidth: "100%",
                  }}
                >
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="Incomplete"
                        control={
                          <Checkbox
                            checked={waiver.isComplete}
                            onChange={(e) => {
                              waiver.isComplete = e.target.checked;
                              forceUpdate();
                            }}
                            sx={{
                              color: "Red",
                              "&.Mui-checked": {
                                color: "Red",
                              },
                            }}
                          />
                        }
                        label="Incomplete"
                        labelPlacement="top"
                      />
                    </FormGroup>
                  </FormControl>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="error"
                    style={{
                      maxWidth: "30px",
                      maxHeight: "30px",
                      minWidth: "30px",
                      minHeight: "30px",
                    }}
                    onClick={() =>
                      setWaivers(waivers.filter((w, i) => i !== index))
                    }
                  >
                    -
                  </Button>
                </Box>
              </Stack>
            ))
          )}
          <Box>
            <Button
              variant="contained"
              onClick={handleAddWaiver}
              color="success"
            >
              +
            </Button>
          </Box>
          <br></br>
          <Typography align="center">
            <Box
              sx={{
                width: 1000,
                minWidth: "100%",
              }}
            >
              <Link href={redirect} underline="none" color="inherit">
                <Button
                  variant="contained"
                  color="success"
                  style={{ minWidth: "100%" }}
                  onClick={handleCreateGymnast}
                >
                  Save
                </Button>
              </Link>
            </Box>
          </Typography>
        </Stack>
      </Container>
    );
}
export default Form;
