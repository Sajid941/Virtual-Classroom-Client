
import DevSection from "../../Components/LandingPageComponent/DevSection";
import HomeBannerSlider from "../../Components/LandingPageComponent/HomeBannerSlider";
import SectionHeading from "../../Components/Shared/SectionHeading";

const Home = () => {
    return (
        <div>
            <HomeBannerSlider />
            <SectionHeading heading="Features"/>
            <DevSection></DevSection>
        </div>
    );
};

export default Home;