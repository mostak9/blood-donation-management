import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUserFunding =  () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['funding', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/getFunding/${user.email}`)
            return res.data;
        }
    })
    return [data, isLoading, refetch];
};

export default useUserFunding;