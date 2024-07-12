import React from "react";
import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import DashboardTable from "./DashboardTable";

const CenteredContent = styled.div`
  text-align: center;
`;

const theme = createTheme();

function DashboardForm({ myRef, age, setShow }) {

  return (
    <React.Fragment>
      <CenteredContent>
        <ThemeProvider theme={theme}>
          <DashboardTable myRef={myRef} age={age} setShow={setShow} />
        </ThemeProvider>
      </CenteredContent>
    </React.Fragment>
  );
}

export default DashboardForm;
