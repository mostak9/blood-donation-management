import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserDonationRequests = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['userDonationRequests', user?.email],
        queryFn: async () => {
            if(user?.email) {
                const res= await axiosSecure.get(`/api/v1/userDonationRequests/${user?.email}`)
            return res.data;
            }
            
        }
    })
    return [data, isLoading, refetch];
};

export default useUserDonationRequests;