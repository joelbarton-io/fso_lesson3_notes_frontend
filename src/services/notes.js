import axios from "axios";
const baseURL = "/api/notes";

const getAll = async () => {
  const { data } = await axios.get(baseURL);
  return data;
};

const create = async (newNote) => {
  const { data } = await axios.post(baseURL, newNote);
  return data;
};

const update = async (id, updatedNote) => {
  const { data } = await axios.put(`${baseURL}/${id}`, updatedNote);
  return data;
};

export default {
  getAll,
  create,
  update,
};
