import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['allDonationRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/allDonationRequests')
            return res.data;
        }
    })
    return [data, isLoading, refetch];
};

export default useAllDonationRequests;