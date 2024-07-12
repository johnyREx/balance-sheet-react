import React, { useRef, useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import { Formik, Form } from "formik";
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ContextUser } from '../Context/UserContext';
import DashboardForm from './DashboardForm';

function Dashboard() {

  const value = useContext(ContextUser);

  console.log("userRole", value.userRole);

  const [age, setAge] = useState('');

  const initialFormState = {
    Sheet: "",
    sheetNo: "",
  };

  const formValidation = Yup.object().shape({
    Sheet: Yup.string()
      .ensure()
      .required("*Sheet No. is required!!!!"),
    sheetNo: Yup.string()
      .ensure()
      .required("*Sheet No. is required!!!!"),
  });

  const myRef = useRef(null);

  const clickElement = (ref) => {
    if (age.length === 0) {
      ref.current.dispatchEvent(
        new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        }),
      );
    } else {
      return false;
    }
  };

  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onClear = () => {
    setAge("");
  };

  return (
    <React.Fragment>
      <Box
        display="flex"
        alignItems="left"
        justifyContent="left"
        sx={{
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Typography variant="h4" component="h2" >
          Welcome {value.userRole}
        </Typography>
      </Box>

      <Formik
        initialValues={{ ...initialFormState }}
        validationSchema={formValidation}
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Form>
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
              marginBottom: 5,
            }}
          >
            <Container maxWidth="sm" sx={{ marginTop: 5 }}>
              <Grid container columnSpacing={{ xs: 1, sm: 5, md: 20, lg: 20 }} alignContent="left" justifyContent="left" sx={{ flexDirection: { xs: "column", md: "row" } }}>
                <Grid item xs={10} md={7} lg={7}>
                  <div>
                    <InputLabel id="demo-select-small">Sheet</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={age}
                      label="Sheet"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Data">Data</MenuItem>
                    </Select>
                  </div>
                </Grid>

                <Grid item xs={10} md={7} lg={9} ml={1} mt={4}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: "wrap" }}>
                    <div>
                      <Button variant='contained' color='primary' onClick={() => { clickElement(myRef); onClear(); setShow(true) }}>ADD Sheet</Button>
                    </div>

                    <br />
                    <br />
                    <br />

                    <div>
                      <TextField size='small' type='text' hidden={(show && age.length === 0) ? null : true} name='sheetNo.' label="New Sheet Name"
                        placeholder='Enter Sheet Name'
                      />
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          <DashboardForm myRef={myRef} age={age} setShow={setShow} />

        </Form>
      </Formik>
    </React.Fragment>
  );
}

export default Dashboard;
