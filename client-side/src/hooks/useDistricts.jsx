import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useDistricts = () => {
    const axiosPublic = useAxiosPublic();
    const {data, isLoading} = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/v1/districts');
            return res.data;
        }
    })

    return [data, isLoading];
};

export default useDistricts;