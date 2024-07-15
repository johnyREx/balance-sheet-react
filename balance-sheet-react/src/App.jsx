import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Layout from './Components/SideBar/Layout';
import './Components/SideBar/sidebar.scss';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './Components/login/loginForm';
import { UserContext } from './Components/Context/UserContext';
import { positions, Provider } from 'react-alert';
import AlertMUITemplate from 'react-alert-template-mui';
import Auth from './Components/Auth';

function App() {
  const [locale, setLocale] = useState('en');

  const options = {
    position: positions.MIDDLE,
  };

  return (
    <>
      <Routes>
        <Route element={<Auth />}>
          <Route
            exact
            path="*"
            element={
              <>
                <Provider template={AlertMUITemplate} {...options}>
                  <UserContext>
                    <IntlProvider locale={locale}>
                      <Layout setLocale={setLocale} />
                    </IntlProvider>
                  </UserContext>
                </Provider>
              </>
            }
          />

          <Route
            exact
            path="/"
            element={
              <Provider template={AlertMUITemplate} {...options}>
                <UserContext>
                  <LoginForm />
                </UserContext>
              </Provider>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
