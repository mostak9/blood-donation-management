import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Main/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import CreateDonation from "../Pages/Dashboard/CreateDonation/CreateDonation";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests/MyDonationRequests";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllDonationRequests from "../Pages/Dashboard/AllDonationRequests/AllDonationRequests";
import ContentManagement from "../Pages/Dashboard/ContentManagement/ContentManagement";
import AddBlog from "../Pages/AddBlog/AddBlog";
import UpdateDonationRequest from "../Pages/Dashboard/UpdateDonationRequest/UpdateDonationRequest";
import DonationRequest from "../Pages/DonationRequests/DonationRequest";
import DonationsDetails from "../Pages/DonationDetails/DonationsDetails";
import SearchPage from "../Pages/SearchPage/SearchPage";
import AllBlogs from "../Pages/AllBlogs/AllBlogs";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import Funding from "../Pages/Funding/Funding";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage/>,
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "donationRequests",
        element: <DonationRequest />,
      },
      {
        path: "donationDetails/:id",
        element: (
          <PrivateRoute>
            <DonationsDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "funding",
        element: <PrivateRoute><Funding /></PrivateRoute>,
      },
      {
        path: "searchPage",
        element: <SearchPage />,
      },
      {
        path: "allBlogs",
        element: <AllBlogs />,
      },
      {
        path: "blogDetails/:id",
        element: <BlogDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage/>,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "userHome",
        element: <UserHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "updateProfile",
        element: <UpdateProfile />,
      },
      {
        path: "myDonationRequestsPage",
        element: <MyDonationRequests />,
      },
      {
        path: "updateDonationRequest/:id",
        element: <UpdateDonationRequest />,
      },
      {
        path: "createDonation",
        element: <CreateDonation />,
      },

      // admin related routes
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "allDonationRequests",
        element: <AllDonationRequests />,
      },
      {
        path: "contentManagement",
        element: <ContentManagement />,
      },
      {
        path: "addBlog",
        element: <AddBlog />,
      },
    ],
  },
  {
    path: "/registration",
    errorElement: <ErrorPage/>,
    element: <Registration />,
  },
  {
    path: "/login",
    errorElement: <ErrorPage/>,
    element: <Login />,
  },
]);

export default router;
