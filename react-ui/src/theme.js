import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

const rawTheme = createMuiTheme({
  overrides: {
    MuiGrid:{
      container: {
        '&$spacing-xs-2':{
          width:'100%',
        }
      }
    },
    MuiTablePagination:{
      root: {
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
      }
    },
    MuiSvgIcon: {
      root: {
        //fill: '#2a726b',
      }
    }
    // MuiIconButton: {
    //   root: {
    //     '&:hover': {
    //       backgroundColor: "$labelcolor"
    //     }
    //   }
    // },
  },
  palette: {
    primary: {
      ligth: '#30566B',
      main: '#30566B',
      dark: '#30566B',
    },
    secondary: {
      light: '#F22B11',
      main: '#F22B11',
      dark: '#F22B11',
    },
    button: {
      light: "#F22B11",
      main: "#F22B11",
    },
    warning: {
      main: '#ffc071',
      dark: '#ffb25e',
    },
    error: {
      xLight: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      xLight: green[50],
      main: green[500],
      dark: green[700],
    },
    text: {
      main: "#30566B"
    }
  },
  typography: {
    fontFamily: "Montserrat",

    titleDesktop: "3em",
    titleMobile: "1.7em",

    subtitle1Desktop: "1.6em",
    subtitle1Mobile: "1.4em",

    subtitle2Desktop: "1.4em",
    subtitle2Mobile: "1.2em",

    textDesktop: "1.2em",
    textMobile: "1.1em",


    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
    useNextVariants: true,
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: "auto",
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export default theme;
