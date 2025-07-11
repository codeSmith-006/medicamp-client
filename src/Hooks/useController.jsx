import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import axiosSecure from "./AxiousSecure"; // adjust path as needed
import AuthContext from "../Context/AuthContext"; // adjust path

const useCurrentUser = () => {
  const { user } = useContext(AuthContext);

  const { data: currentUser, isLoading, refetch } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  return { currentUser, isLoading, refetch };
};

export default useCurrentUser;
