import swal from "sweetalert";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";
import useAllDonationRequests from "./useAllDonationRequests";

const useDeleteDonReqByAdmin = () => {
  const [, , refetch] = useAllDonationRequests();
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
          `/api/v1/deleteDonationRequestByAdmin/${id}`
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

export default useDeleteDonReqByAdmin;