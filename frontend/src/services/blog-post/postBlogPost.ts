import axios, { AxiosResponse } from "axios";
import { CreateBlogPostDTO } from "@/interfaces/blogpost.interface";
import { token } from "../config";

export const postBlogPost = async (blog: CreateBlogPostDTO) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const payload = {
      data: blog,
    };
    const response = await axios.post(
      `http://localhost:1337/api/blog-posts`,
      payload,
      {
        headers,
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error al traer los autores");
  }
};
