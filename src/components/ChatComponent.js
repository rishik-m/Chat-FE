import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "https://tasteful-action-aefc460dc7.strapiapp.com";
const socket = io(SOCKET_SERVER_URL);

const Message = styled(Paper)(({ theme, from = "client" }) => ({
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: "16px",
  backgroundColor: from === "client" ? "#d1e7dd" : "#f8d7da",
  marginLeft: from === "server" ? "0" : "auto",
  marginRight: from === "client" ? "0" : "auto",
  alignSelf: from === "client" ? "flex-end" : "flex-start",
}));

const MessageList = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
}));

const ChatComponent = ({ selectedSessionId, selectedSessionName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedSessionName) {
        const response = await fetch(
          `https://tasteful-action-aefc460dc7.strapiapp.com/api/chat/messages/${selectedSessionName}`
        );
        const data = await response.json();
        setMessages(data);
      }
    };

    fetchMessages();
  }, [selectedSessionName]);

  useEffect(() => {
    socket.connect();
    socket.on("message", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          from: "server",
          message: data.message,
        },
      ]);
    });

    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      alert("Message cannot be empty.");
      return;
    }

    const userObj = JSON.parse(localStorage.getItem("user"));
    const currentUserId = userObj.id;

    socket.emit("sendMessage", {
      userId: currentUserId,
      message: newMessage.trim(),
      sessionId: selectedSessionId,
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        from: "client",
        message: newMessage.trim(),
      },
    ]);

    setNewMessage("");
  };

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", height: "80vh" }}
    >
      <Typography variant="h6">Chat: {selectedSessionName}</Typography>
      <MessageList display="flex" flexDirection="column">
        {messages.map((msg, index) => {
          if (msg.from) {
            return (
              <Message key={index} from={msg.from}>
                <ListItemText primary={msg.message} />
              </Message>
            );
          }
          return (
            <Message key={index}>
              <ListItemText primary={msg.message} />
            </Message>
          );
        })}
      </MessageList>
      <TextField
        label="Type a message"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Container>
  );
};

export default ChatComponent;
