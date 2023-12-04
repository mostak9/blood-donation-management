import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllBlogs = () => {
    const axiosSecure = useAxiosSecure();
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['allBlogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/allBlogs')
            return res.data;
        }
    })
    return [data, isLoading, refetch];
};

export default useAllBlogs;