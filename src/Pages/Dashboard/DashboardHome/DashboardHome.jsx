import * as React from "react";
import Grid from "@mui/material/Grid";
import Calendar from "../../Shared/Calendar/Calendar";
import Appointment from "../Dashboard/Appointment/Appointment";

const DashboardHome = () => {
  const [date, setDate] = React.useState(new Date());
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5}>
        <Calendar date={date} setDate={setDate}></Calendar>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Appointment date={date}></Appointment>
      </Grid>
    </Grid>
  );
};

export default DashboardHome;
