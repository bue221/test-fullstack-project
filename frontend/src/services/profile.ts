import axios from "axios";

const baseUrl = "http://localhost:3001/api/prifile";

const getProfile = async (token: string) => {
  const { data } = await axios.get(`${baseUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export { getProfile };
