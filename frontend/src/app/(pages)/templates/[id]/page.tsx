"use client";
import Loader from "@/components/shared/Loader";
import { baseUrl } from "@/redux/api/appSlice";
import { useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const ChooseTemplate = () => {
  const { id } = useParams();
  const { token, user, isLoading } = useAppSelector((state) => state.auth);
  const [states, setStates] = useState({ loading: true, error: false });
  console.log(isLoading, user);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      const res = await fetch(`${baseUrl}/template/choose/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      });

      if (!res.ok) {
        setStates({ loading: false, error: true });
        return;
      }

      const data: any = await res.json();
      const projectId: string = data?.data?._id;
      setStates({ loading: false, error: false });
      router.push("/canvas/" + projectId);
    };

    if (!isLoading && !user) {
      Cookies.set("redirect", `/templates/${id}`);

      setStates({ loading: false, error: true });
      return router.push("/login");
    }
    fetchData();
  }, [router, token, id, isLoading, user]);

  return (
    <div className="w-full h-screen center">
      {states.loading ? <Loader /> : ""}
      {states.error ? "something went wrong..." : ""}
    </div>
  );
};

export default ChooseTemplate;
