
import AboutSection from "../../Components/LandingPageComponent/AboutSection";
import DevSection from "../../Components/LandingPageComponent/DevSection";
import HomeBannerSlider from "../../Components/LandingPageComponent/HomeBannerSlider";
import SectionHeading from "../../Components/Shared/SectionHeading";
import FeaturesSection from '../../Components/LandingPageComponent/FeaturesSection'

const Home = () => {
    return (
        <div>
            <HomeBannerSlider />
            <SectionHeading heading="Features"/>
            <FeaturesSection></FeaturesSection>
            <AboutSection></AboutSection>
            <DevSection></DevSection>
        </div>
    );
};

export default Home;