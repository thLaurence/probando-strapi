"use client";
import { getBlogPosts } from "@/services/blog-post/getBlogPosts";
import { useEffect, useState } from "react";
import { BlogPostRawDTO } from "@/interfaces/blogpost.interface";
import { BlogPostForm } from "./blog-post-form";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const BlogPostMain = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPostRawDTO[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    pageCount: 1,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const fetchBlogPosts = async (page = pagination.page) => {
    try {
      const response = await getBlogPosts(page, pagination.pageSize);
      setBlogs(response.data.data);
      setPagination(response.data.meta.pagination);
    } catch (error) {
      console.error("Error al obtener blogs:", error);
      setMessage("Error al cargar los blogs");
      setMessageType("error");
    }
  };

  useEffect(() => {
    fetchBlogPosts(1);
  }, []);

  if (!blogs) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen px-10 space-y-6">
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <BlogPostForm
            onCreate={() => fetchBlogPosts(pagination.page)}
            setShowForm={setShowForm}
          />
        </div>
      )}
      <div className="w-full max-w-4xl px-6 flex justify-start">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 mr-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-300"
        >
          Volver
        </button>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-300"
        >
          Crear nuevo blog
        </button>
      </div>
      <span
        className={`block mt-2 font-semibold ${
          messageType === "success" ? "text-green-600" : "text-red-600"
        }`}
      >
        {message}
      </span>

      <div className="w-full max-w-4xl px-6 overflow-x-auto">
        <table className="w-full table-fixed border-separate border-spacing-0 shadow-lg rounded-lg mx-auto">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider min-w-[50px]">
                ID
              </th>
              <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider min-w-[150px]">
                Título
              </th>
              <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider min-w-[250px]">
                Contenido
              </th>
              <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider min-w-[180px]">
                Fecha de Publicación
              </th>
              <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider min-w-[120px]">
                Autor
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="hover:bg-green-50 transition-colors duration-300"
              >
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">
                  {blog.id}
                </td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700 max-w-[150px]">
                  {blog.title}
                </td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700 max-w-[250px]">
                  {blog.content}
                </td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">
                  {blog.publicationDate}
                </td>
                <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">
                  {blog.author.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          disabled={pagination.page === 1}
          onClick={() => fetchBlogPosts(pagination.page - 1)}
          className="px-4 py-2 text-gray-700 rounded disabled:opacity-50"
        >
          <ChevronLeft />
        </button>

        <span className="py-2">
          Página {pagination.page} de {pagination.pageCount}
        </span>

        <button
          disabled={pagination.page === pagination.pageCount}
          onClick={() => fetchBlogPosts(pagination.page + 1)}
          className="px-4 py-2 text-gray-700 rounded disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
