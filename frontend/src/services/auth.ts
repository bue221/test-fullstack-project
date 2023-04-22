import axios from "axios";

const baseUrl = "http://localhost:3001/api/auth";

const login = async (credentials: { username: string; password: string }) => {
  const { data } = await axios.post(`${baseUrl}/login`, credentials);
  return data;
};

const refecth = async (token: string) => {
  const { data } = await axios.get(`${baseUrl}/refecth`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export { login, refecth };
