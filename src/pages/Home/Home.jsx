
import AboutSection from "../../Components/LandingPageComponent/AboutSection";
import DevSection from "../../Components/LandingPageComponent/DevSection";
import HomeBannerSlider from "../../Components/LandingPageComponent/HomeBannerSlider";
import SectionHeading from "../../Components/Shared/SectionHeading";

const Home = () => {
    return (
        <div>
            <HomeBannerSlider />
            <SectionHeading heading="Features"/>
            <AboutSection></AboutSection>
            <DevSection></DevSection>
        </div>
    );
};

export default Home;