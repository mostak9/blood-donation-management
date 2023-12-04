import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminStats = () => {
    const axiosSecure = useAxiosSecure();
    const {data, isLoading} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/admin-stats');
            return res.data;
        }
    })
    return [data, isLoading];
};

export default useAdminStats;