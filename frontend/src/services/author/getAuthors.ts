import axios, { AxiosResponse } from "axios";
import { AuthorDTO } from "@/interfaces/author.interface";
import { token } from "../config";

export const getAuthors = async () => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`http://localhost:1337/api/authors`, {
      headers,
    });

    return response.data.data;
  } catch (error) {
    throw new Error("Error al traer los autores");
  }
};
