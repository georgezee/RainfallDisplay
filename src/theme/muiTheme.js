import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: "#80d6ff",
      main: "#42a5f5",
      dark: "#0077c2",
      contrastText: "#fff"
    },
    secondary: {
      light: "#534bae",
      main: "#1a237e",
      dark: "#000051",
      contrastText: "#000"
    },
    background: {
      paper: "#f5f5f5"
    }
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        color: "#28660a",
        marginRight: 0,
        marginLeft: 10
      }
    },
    MuiListItemText: {
      primary: {
        color: "#003a00",
      }
    },
    MuiListItem: {
      root: {
        marginLeft: 10,
        marginRight: 50
      }
    },
    MUIDataTableBodyCell: {
      root: {
        color: "#000",
        height: 30,
        fontSize: 14
      }
    },
    MUIDataTableBodyRow: {
      root: {
        "&:nth-child(odd)": {
          backgroundColor: "#ffffff"
        },
        "&:nth-child(even)": {
          backgroundColor: "#fafafa"
        },
        "&:hover": {
          backgroundColor: "#80d6ff!important",
          cursor: "pointer"
        }
      }
    },
    MUIDataTableHeadCell: {
      root: {
        fontSize: 15
      }
    },
    MuiTableCell: {
      root: {
        padding: 0,
        margin: 0,
        textAlign: "center",
        borderLeft: "solid #e0e0e0 1px"
      }
    }
  }
});

export default theme;
