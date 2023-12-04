import toast from "react-hot-toast";
import useAxiosSecure from "./useAxiosSecure";
import useUserDonationRequests from "./useUserDonationRequests";
import useAllDonationRequests from "./useAllDonationRequests";

const useUpdateDonReqStat = () => {
  const axiosSecure = useAxiosSecure();
  const [, , userDonRefetch] = useUserDonationRequests();
  const [, , allDonRefetch] = useAllDonationRequests();
  const updateDonReqStat = async (id, data) => {
    const res = await axiosSecure.patch(`/api/v1/updateDonReq/${id}`, {
      status: data,
    });
    if (res.data.modifiedCount) {
      toast.success("Donation process inprogress!");
      userDonRefetch();
      allDonRefetch();
    } else {
      toast.error("Something went wrong!");
    }
  };
  return [updateDonReqStat];
};

export default useUpdateDonReqStat;
