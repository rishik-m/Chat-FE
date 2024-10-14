import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const SessionComponent = ({ onSelectSession }) => {
  const [sessions, setSessions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sessionName, setSessionName] = useState("");

  const userObj = JSON.parse(localStorage.getItem("user"));
  const userId = userObj.id;

  useEffect(() => {
    const fetchSessions = async () => {
      const response = await fetch(
        `https://tasteful-action-aefc460dc7.strapiapp.com/api/chat-session-by-user/${userObj.username}`
      );
      const data = await response.json();
      setSessions(data);
    };

    fetchSessions();
  }, []);

  const handleAddSession = async () => {
    if (!sessionName) {
      alert("Session name cannot be empty."); // Alert if the name is invalid
      return;
    }

    const response = await fetch(
      "https://tasteful-action-aefc460dc7.strapiapp.com/api/chat-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          sessionName: sessionName,
        }),
      }
    );

    if (response.ok) {
      setSessionName("");
      setOpenModal(false);
      const updatedResponse = await fetch(
        `https://tasteful-action-aefc460dc7.strapiapp.com/api/chat-session-by-user/${userObj.username}`
      );
      const updatedData = await updatedResponse.json();
      setSessions(updatedData);
    } else {
      console.error("Failed to create session");
    }
  };

  return (
    <Container>
      <Typography variant="h6">Chat Sessions</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenModal(true)}
        style={{ marginBottom: "1rem" }}
      >
        Add Session
      </Button>
      <List>
        {sessions.map((session) => (
          <ListItem
            button
            key={session.id}
            onClick={() => onSelectSession(session)}
          >
            <ListItemText primary={session.sessionName} />
          </ListItem>
        ))}
      </List>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Container
          style={{
            marginTop: "20%",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6">Create New Session</Typography>
          <TextField
            label="Session Name"
            fullWidth
            value={sessionName}
            onChange={(e) => {
              const newValue = e.target.value.replace(/\s/g, "");
              setSessionName(newValue);
            }}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSession}
          >
            Save
          </Button>
        </Container>
      </Modal>
    </Container>
  );
};

export default SessionComponent;
