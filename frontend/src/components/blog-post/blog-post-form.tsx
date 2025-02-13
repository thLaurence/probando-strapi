import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CreateBlogPostDTO } from "@/interfaces/blogpost.interface";
import { useEffect, useState } from "react";
import { AuthorDTO } from "@/interfaces/author.interface";
import { postBlogPost } from "@/services/blog-post/postBlogPost";

interface BlogPostFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  onCreate: () => void;
}

export const BlogPostForm: React.FC<BlogPostFormProps> = ({
  setShowForm,
  onCreate,
}) => {
  const [author, setAuthor] = useState<AuthorDTO | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "El título debe tener al menos 5 caracteres")
      .max(100, "El título no puede exceder los 100 caracteres")
      .required("El título es obligatorio"),
    content: Yup.string()
      .min(5, "El contenido debe tener al menos 20 caracteres")
      .required("El contenido es obligatorio"),
    publicationDate: Yup.date()
      .required("La fecha de publicación es obligatoria")
      .nullable(),
    author: Yup.number().required("El autor es obligatorio"),
  });

  const handleSubmit = async (values: CreateBlogPostDTO) => {
    const response = await postBlogPost(values);
    if (response.status === 201) {
      onCreate();
      setMessage("Se ha creado con éxito el nuevo Blog");
      setMessageType("success");
    } else {
      setMessage(
        `Ha ocurrido un error, entregar este código como referencia del error: ${response.status}`
      );
      setMessageType("error");
    }
  };

  useEffect(() => {
    const storedAuthor = JSON.parse(localStorage.getItem("author") || "{}");
    if (storedAuthor != null) {
      setAuthor(storedAuthor);
    }
  }, []);

  if (!author) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-6 rounded-lg shadow-md">
        <div className="flex justify-left mb-5">
          <button onClick={() => setShowForm(false)}>X</button>
        </div>
        <Formik
          initialValues={{
            title: "",
            content: "",
            publicationDate: "",
            author: author?.id,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 p-4 w-96">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Título
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contenido
                </label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  rows={4}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="publicationDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de publicación
                </label>
                <Field
                  id="publicationDate"
                  name="publicationDate"
                  type="date"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <ErrorMessage
                  name="publicationDate"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700"
                >
                  Autor
                </label>
                <Field
                  id="author"
                  name="author"
                  type="text"
                  disabled
                  value={author?.name}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 disabled:bg-gray-400"
                >
                  {isSubmitting ? "Enviando..." : "Crear Post"}
                </button>
                <span
                  className={`block mt-2 font-semibold ${
                    messageType === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
