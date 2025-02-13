import axios, { AxiosResponse } from "axios";
import { token } from "../config";

export const getBlogPosts = async (page = 1, pageSize = 5) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `http://localhost:1337/api/blog-posts?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=author`,
      { headers }
    );

    return response;
  } catch (error) {
    throw new Error("Error al traer los blogs");
  }
};
