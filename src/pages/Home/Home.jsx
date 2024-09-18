import AboutSection from "../../Components/LandingPageComponent/AboutSection";
import HomeBannerSlider from "../../Components/LandingPageComponent/HomeBannerSlider";
import SectionHeading from "../../Components/Shared/SectionHeading";

const Home = () => {
    return (
        <div>
            <HomeBannerSlider />
            <SectionHeading heading="Features"/>
            <AboutSection></AboutSection>
        </div>
    );
};

export default Home;