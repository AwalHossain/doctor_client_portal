import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import login from "../../images/login.png";
import useAuth from "../../contex/useAuth";
const Register = () => {
  const [info, setInfo] = useState({});
  const history = useHistory();
  const { registerUser, isloading, user } = useAuth();
  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    console.log(field, value);
    const newLogin = { ...info };
    newLogin[field] = value;
    setInfo(newLogin);
    // setInfo()
  };
  const handleSubmit = (e) => {
    if (info.password !== info.password2) {
      alert("Your password did not match");
      return;
    }
    console.log(info.email);
    registerUser(info.email, info.password, info.name, history);
    e.preventDefault();
  };
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={12}
          md={6}
        >
          <Typography variant="h4">Login</Typography>
          <form onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              id="standard-basic"
              label="Your name"
              name="name"
              onChange={handleChange}
              sx={{ width: "300px", my: 2 }}
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Your email"
              name="email"
              onChange={handleChange}
              sx={{ width: "300px", my: 2 }}
              variant="standard"
            />
            <br />
            <TextField
              id="standard-basic"
              label="Your Password"
              type="password"
              name="password"
              onChange={handleChange}
              sx={{ width: "300px", mb: 2 }}
              variant="standard"
            />
            <br />
            <TextField
              id="standard-basic"
              label="Retype Your Password"
              type="password"
              name="password2"
              onChange={handleChange}
              sx={{ width: "300px", mb: 2 }}
              variant="standard"
            />
            <br />
            <NavLink to="/login">Already Registered? Log in</NavLink>
            <br />
            <Button
              sx={{ my: 3, width: "300px" }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
            {isloading && <CircularProgress />}
          </form>

          {user?.email && (
            <Alert severity="success">
              This is a success alert — check it out!
            </Alert>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <img width="100%" src={login} alt="" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
