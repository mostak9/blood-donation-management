import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider/AuthProvider';

const useVolunteer = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext); 
    const {data, isLoading} = useQuery({
        queryKey: ['volunteer', user?.email],
        queryFn: async () => {
            
                const res = await axiosSecure.get(`/api/v1/volunteer/${user.email}`);
                return res.data;
        }
    })
    return [data, isLoading];
};

export default useVolunteer;