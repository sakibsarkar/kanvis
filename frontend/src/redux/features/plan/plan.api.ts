import { api } from "@/redux/api/appSlice";
import { IPlan } from "@/types/plan";

const planApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlan: builder.query<{ data: IPlan[] }, undefined>({
      query: () => ({
        url: "/plan/get",
        method: "GET",
      }),
      providesTags: ["plan"],
    }),
  }),
});
export const { useGetAllPlanQuery } = planApi;
