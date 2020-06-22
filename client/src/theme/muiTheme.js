import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#939393',
      main: '#939393',
      dark: '#939393',
      contrastText: '#939393',
    },
    grey: {
      light: '#939393',
      main: '#939393',
      dark: '#939393',
      contrastText: '#939393',
    },
  },
  // shape: {
  //   borderRadius: 8,
  // },
  overrides: {
    MuiDrawer: {
      paper: {
        minWidth: 256,
      },
      paperAnchorDockedLeft: {
        borderRight: 'none',
      },
    },
  },
});

export default theme;
