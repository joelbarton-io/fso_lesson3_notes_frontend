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

const remove = async (id) => {
  console.log("attempting to invoke axios.delete from frontend");
  const response = await axios.delete(`${baseURL}/${id}`);
  return response;
};

// this isn't implemented
const update = async (id, updatedNote) => {
  const { data } = await axios.put(`${baseURL}/${id}`, updatedNote);
  return data;
};

export default {
  getAll,
  create,
  update,
  remove,
};
