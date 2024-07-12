import React, { useContext } from 'react';
import Paper from '@mui/material/Paper';
import TextfieldWrapperrr from '../addUser/TextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SubmitButtonWrapperrr from '../addUser/SubmitBtn';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { ContextUser } from '../Context/UserContext';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function LoginForm() {
  const Navigate = useNavigate();
  const value = useContext(ContextUser);

  const initialFormState = {
    email: '',
    password: '',
  };

  const formValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('*Required'),
    password: Yup.string().max(30, '*Must be 30 characters or less').required('*Required'),
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const AlertComponent = React.forwardRef((props, ref) => (
    <Alert elevation={6} severity={value.alert === 'error' ? 'error' : 'success'} variant="filled" {...props} ref={ref} />
  ));

  const handleSubmit = (values) => {
    console.log(values);
    value.login();
    handleClick();
  };

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (value.loginStatus === true) {
      localStorage.setItem('token', value.userStatus);
      localStorage.setItem('tokenRole', value.userRole);

      setTimeout(() => {
        Navigate('/dashboard');
      }, 2000);
    }
  }, [value.loginStatus, Navigate]);

  return (
    <>
      <section className="login-root flex-wrapper">
        <h2 className="mt-5 text-center">LOGIN</h2>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="login"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
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
                m={5}
                pt={3}
              >
                <Formik initialValues={{ ...initialFormState }} validationSchema={formValidation} onSubmit={handleSubmit}>
                  <Form>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 7, sm: 10, md: 20, lg: 15 }}
                      fluid="md"
                      justifyContent="center"
                      alignContent="center"
                    >
                      <Grid item xs={8} md={9} lg={12}>
                        <div className="form-outline mb-4">
                          <TextfieldWrapperrr name="email" label="Email" placeholder="Your Email Address" inputRef={value.loginEmail} />
                        </div>
                      </Grid>

                      <Grid item xs={8} md={9} lg={12}>
                        <div className="form-outline mb-3">
                          <TextfieldWrapperrr
                            name="password"
                            label="password"
                            placeholder="Your Password"
                            type="password"
                            inputRef={value.loginPassword}
                          />
                        </div>
                      </Grid>

                      <Grid item xs={8} md={9} lg={12}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <div className="mb-3">
                            <a style={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => value.ResetEmail()}>
                              Forgot password?
                            </a>
                          </div>
                        </Box>
                      </Grid>

                      <Grid item xs={8} md={9} lg={12}>
                        <div className="pt-1 mb-4">
                          <SubmitButtonWrapperrr>Login</SubmitButtonWrapperrr>
                        </div>
                      </Grid>
                    </Grid>
                  </Form>
                </Formik>
              </Box>
            </div>
          </div>
        </div>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            <div className="text-white mb-3 mb-md-0">MONGO TECH Copyright © 2022. All rights reserved.</div>
            <div>
              <a href="!#" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="!#" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="!#" className="text-white me-4">
                <i className="fab fa-google"></i>
              </a>
              <a href="!#" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </Paper>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <AlertComponent onClose={handleClose}>{value.status}</AlertComponent>
        </Snackbar>
      </section>
    </>
  );
}

export default LoginForm;
