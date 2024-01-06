import AboutUs from "../../../Components/Home/AboutUs/AboutUs";
import Banner from "../../../Components/Home/Banner/Banner";
import ContactUs from "../../../Components/Home/ContactUs/ContactUs";
import DonationProcess from "../../../Components/Home/DonationProcess/DonationProcess";
import LatestBlog from "../../../Components/Home/LatestBlog/LatestBlog";
import OurTeam from "../../../Components/Home/OurTeam/OurTeam";
import SiteStat from "../../../Components/Home/SiteStat/SiteStat";



const Home = () => {
    return (
        <div>
           <Banner/>
           <DonationProcess/>
           <SiteStat/>
           <LatestBlog/>
           <OurTeam/>
            <ContactUs/>
            <AboutUs/>
        </div>
    );
};

export default Home;