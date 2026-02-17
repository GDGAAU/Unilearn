import api from "./api";

export async function register({ email, name, password }) {
  const res = await api.post("/auth/register/", {
    email,
    name,
    password,
  });
  return res.data;
}

