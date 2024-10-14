const API_URL = "https://tasteful-action-aefc460dc7.strapiapp.com/api/auth";

export const registerUser = async (username, email, password) => {
  const response = await fetch(`${API_URL}/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return await response.json();
};

export const loginUser = async (identifier, password) => {
  const response = await fetch(`${API_URL}/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
};
