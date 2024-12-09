import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, CssBaseline, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UserList from "./components/UserList";
import RegionList from "./components/RegionList";

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: "#19a7d2",
    },
    secondary: {
      main: "#f50014",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Box>
              <Button
                color="inherit"
                component={Link}
                to="/users"
                sx={{ textTransform: "none", marginRight: 2 }}
              >
                Usuario
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/regions"
                sx={{ textTransform: "none" }}
              >
                Região
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/regions" element={<RegionList />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
