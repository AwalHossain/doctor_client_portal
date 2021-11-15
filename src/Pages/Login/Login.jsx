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
import { NavLink, useHistory, useLocation } from "react-router-dom";
import useAuth from "../../contex/useAuth";
import login from "../../images/login.png";
const Login = () => {
  const [info, setInfo] = useState({});
  // useAuth
  const { user, logInUser, isloading, googleSignIn } = useAuth();
  // react router history
  const location = useLocation();
  const history = useHistory();
  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    console.log(field, value);
    const newLogin = { ...info };
    newLogin[field] = value;
    setInfo(newLogin);
  };
  const handleSubmit = (e) => {
    console.log(info.email);
    logInUser(info.email, info.password, location, history);
    e.preventDefault();
  };
  const handleGooglelog = () => {
    googleSignIn(location, history);
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
            <NavLink to="register">New user? Register</NavLink>
            <br />
            <Button
              sx={{ my: 3, width: "300px" }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </form>
          <p>--------------------------</p>
          <button onClick={handleGooglelog} variant="contained">
            Google Sign in
          </button>
          {isloading && <CircularProgress />}
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

export default Login;
