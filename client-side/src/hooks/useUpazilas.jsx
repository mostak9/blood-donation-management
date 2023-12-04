import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUpazilas = () => {
    const axiosPublic = useAxiosPublic();
   const {data, isLoading} = useQuery ({
    queryKey: ['Upazilas'],
    queryFn: async () => {
        const res = await axiosPublic.get('/api/v1/upazilas')
        return res.data;
    }
   })

   return [data, isLoading];
};

export default useUpazilas;