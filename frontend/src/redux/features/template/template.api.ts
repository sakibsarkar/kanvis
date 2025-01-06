import { api } from "@/redux/api/appSlice";

const templateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTemplate: builder.mutation({
      query: ({ id, templateName }: { id: string; templateName?: string }) => ({
        url: `/template/create/${id}`,
        method: "POST",
        body: { templateName },
      }),
      invalidatesTags: ["template"],
    }),
    getAllTemplates: builder.query({
      query: () => ({
        url: `/template/get`,
        method: "GET",
      }),
      providesTags: ["template"],
    }),
  }),
});
export const { useCreateTemplateMutation, useGetAllTemplatesQuery } =
  templateApi;
