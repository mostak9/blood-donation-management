import swal from "sweetalert";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";
import useUserDonationRequests from "./useUserDonationRequests";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider/AuthProvider";

const useDeleteDonReqByUser = () => {
    const [, , refetch] = useUserDonationRequests();
    const {user} = useContext(AuthContext);
  
  const axiosSecure = useAxiosSecure();
  const deleteDonationRequest = async (id) => {
   
    swal({
      title: "Are you sure?",
      text: "The donation request will be deleted permanently!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await axiosSecure.delete(
          `/api/v1/deleteDonationRequest/${id}`, {email: user?.email}
        );
        if (res.data.deletedCount) {
          toast.success("Donation Request deleted successfully");
          refetch();
        }
      } else {
        toast.error("Deletion request cancelled!");
      }
    });
  };

  return [deleteDonationRequest];
};

export default useDeleteDonReqByUser;