import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";
import SessionComponent from "./SessionComponent";
import ChatComponent from "./ChatComponent";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "Guest",
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Hey, {user.username}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <SessionComponent onSelectSession={setSelectedSession} />
          </Grid>
          <Grid item xs={8}>
            {selectedSession ? (
              <ChatComponent
                selectedSessionId={selectedSession.id}
                selectedSessionName={selectedSession.sessionName}
              />
            ) : (
              <div>Select a session to view chats</div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
