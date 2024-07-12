import React, { useContext } from 'react';
import { Formik, Form } from "formik";
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import InputLabel from '@mui/material/InputLabel';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import TextfieldWrapper from "./TextField";
import SubmitButtonWrapper from "./SubmitBtn";
import SelectWrapper from "./Select";
import Role from './Role.json';
import { ContextUser } from '../Context/UserContext';
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";

function AddUser() {
  const value = useContext(ContextUser);

  const initialFormState = {
    name: "",
    email: "",
    password: "",
    role: ""
  };

  const formValidation = Yup.object().shape({
    name: Yup.string()
      .max(15, '*Must be 15 characters or less')
      .required('*Required'),

    email: Yup.string().email('Invalid email address').required('*Required'),

    role: Yup.string()
      .ensure()
      .required("Role is required!!!!"),

    password: Yup.string()
      .min(8, '*Minimum 8 characters')
      .max(30, '*Must be 30 characters or less')
      .required('*Required'),
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const AlertComponent = React.forwardRef((props, ref) =>
    <Alert elevation={6} severity={(value.alert === 'error') ? 'error' : 'success'} variant="filled" {...props} ref={ref} />
  );

  return (
    <React.Fragment>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Typography variant="h4" component="h2">
          Add User
        </Typography>
      </Box>
      <Container maxWidth="md" style={{ 'backgroundColor': '#efeff6' }} sx={{ mt: 10, boxShadow: 3 }}>
        <Box
          componenet="form"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          m={5} pt={3}
        >
          <Formik
            initialValues={{ ...initialFormState }}
            validationSchema={formValidation}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              value.register();
              handleClick();
              resetForm({ values: '' });
            }}
          >
            <Form>
              <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 5, md: 20, lg: 20 }} alignContent="center" justifyContent="center" sx={{ flexDirection: { xs: "column", md: "row" } }}>
                <Grid item xs={10} md={7} lg={7}>
                  <InputLabel id="demo-simple-select-standard-label">Full Name</InputLabel>
                  <TextfieldWrapper
                    name="name"
                    label="Name"
                    placeholder="Your Name"
                    inputRef={value.Name}
                  />
                </Grid>
                <Grid item xs={10} md={7} lg={7}>
                  <InputLabel id="demo-simple-select-standard-label">Email</InputLabel>
                  <TextfieldWrapper
                    label="email"
                    name="email"
                    placeholder="Your Email"
                    inputRef={value.Email}
                  />
                </Grid>
                <Grid item xs={10} md={7} lg={7}>
                  <InputLabel id="demo-simple-select-standard-label">Password</InputLabel>
                  <TextfieldWrapper
                    label="Password"
                    name="password"
                    type='password'
                    placeholder="Enter Strong Password"
                    inputRef={value.Password}
                  />
                </Grid>
                <Grid item xs={10} md={7} lg={7}>
                  <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                  <SelectWrapper
                    name="role"
                    label="Role"
                    options={Role}
                    inputRef={value.Role}
                  />
                </Grid>
                <Grid item xs={10} md={7} lg={7}>
                  <div>
                    <SubmitButtonWrapper>
                      submit
                    </SubmitButtonWrapper>
                  </div>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <AlertComponent onClose={handleClose}>
            {value.status}
          </AlertComponent>
        </Snackbar>
      </Container>
    </React.Fragment>
  );
}

export default AddUser;
