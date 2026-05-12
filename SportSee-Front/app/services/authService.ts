const API_URL = import.meta.env.VITE_API_URL;

type LoginResponse = {
  token: string;
  userId: number;
};

export async function loginUser(username: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Identifiants invalides");
  }

  const data: LoginResponse = await response.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", String(data.userId));

  return data;
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}

export function getToken() {
  return localStorage.getItem("token");
}