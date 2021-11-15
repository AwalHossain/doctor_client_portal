import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../../contex/useAuth";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const { token } = useAuth();
  const handleBlur = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    const user = { email };
    fetch("http://localhost:5000/users/admin", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        alert("success");
        console.log(result);
      });
    e.preventDefault(user);
  };
  return (
    <div>
      <h2>This is from admin</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-required"
          label="Email"
          onBlur={handleBlur}
        />
        <Button type="submit" variant="contained">
          Make Admin
        </Button>
      </form>
    </div>
  );
};

export default MakeAdmin;
