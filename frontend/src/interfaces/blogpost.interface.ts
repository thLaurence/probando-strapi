import { AuthorDTO } from "./author.interface";

export interface CreateBlogPostDTO {
  title: string;
  content: string;
  publicationDate: string;
  author: number;
}

export interface BlogPostRawDTO {
  author: AuthorDTO;
  id: number;
  documentId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  publicationDate: string;
}
