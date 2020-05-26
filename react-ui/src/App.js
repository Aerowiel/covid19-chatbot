import React from 'react';

// components
import ChatBot from "./components/ChatBot/index";

// contexts
import { SnackbarContextProvider } from './contexts/others/snackbar/Context';
import { ConfirmationModalContextProvider } from './contexts/others/confirmationModal/Context';

// eslint-disable-next-line
import {BrowserRouter as Router, Route, Switch, HashRouter} from 'react-router-dom';
import {withRouter} from "react-router";

// styles
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import './style.css';

global.REST_API_ADDR = ""

const App = () => {

  return (
        <>
        <MuiThemeProvider theme={theme}>
          <CssBaseline/>
            <React.Fragment>
              <HashRouter>
                <Switch>
                  <Route path="/" component={ChatBot} />
                </Switch>
              </HashRouter>
            </React.Fragment>
          </MuiThemeProvider>
        </>
  );

}

export default App;
