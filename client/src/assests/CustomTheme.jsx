import { createMuiTheme } from '@material-ui/core/styles';

const CustomTheme = createMuiTheme({
  direction: 'rtl',
  palette: {
     primary: {
      main: "rgb(114, 193, 244)",
      contrastText: "#fff"
    },
    secondary: {
      main: "#ff6a52",
      contrastText: "#fff"
    }
  },
});


export default CustomTheme;