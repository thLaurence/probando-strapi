import { AuthorDTO } from "@/interfaces/author.interface";
import { getAuthors } from "@/services/author/getAuthors";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export const AuthorInitialForm = () => {
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);
  const router = useRouter();
  const fetchAuthors = async (): Promise<AuthorDTO[]> => {
    try {
      const response = await getAuthors();
      if (!response || !Array.isArray(response)) {
        throw new Error("Respuesta inválida de la API");
      }

      return response.map((author) => ({
        id: author.id,
        documentId: author.documentId,
        name: author.name,
        email: author.email,
      }));
    } catch (error) {
      console.error("Error al obtener autores:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadAuthors = async () => {
      const data = await fetchAuthors();
      setAuthors(data);
    };
    loadAuthors();
  }, []);

  const storeAuthor = (value: any) => {
    if (value.option != undefined || null) {
      const selectedAuthor = authors.find(
        (author) => author.documentId === value.option
      );

      if (selectedAuthor) {
        localStorage.setItem("author", JSON.stringify(selectedAuthor));
        router.push("/blog");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-6 rounded-lg shadow-md">
        <Formik
          initialValues={{ option: "" }}
          validationSchema={Yup.object({
            option: Yup.string().required("Debe seleccionar una opción"),
          })}
          onSubmit={(values) => {
            storeAuthor(values);
          }}
        >
          <Form className="flex flex-col gap-4 p-4 border rounded-lg w-96">
            <label htmlFor="option">Selecciona un Autor guardado</label>
            <Field as="select" name="option" className="border p-2 rounded">
              <option value="" label="Seleccione una opción" />
              {authors.map((author) => (
                <option key={author.id} value={author.documentId}>
                  {author.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="option"
              component="div"
              className="text-red-500 text-sm"
            />
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Siguiente
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
