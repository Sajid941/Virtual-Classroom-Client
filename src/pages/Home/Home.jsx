import AboutSection from "../../Components/LandingPageComponent/AboutSection";
import DevSection from "../../Components/LandingPageComponent/DevSection";
import HomeBannerSlider from "../../Components/LandingPageComponent/HomeBannerSlider";
import SectionHeading from "../../Components/Shared/SectionHeading";
import FeaturesSection from "../../Components/LandingPageComponent/FeaturesSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Class Net | Expanding Learning Horizons.</title>
      </Helmet>
      <header>
        <HomeBannerSlider />
      </header>
      <main className="px-5 md:px-10 xl:px-28">
        <SectionHeading heading="Features" />
        <FeaturesSection></FeaturesSection>
        <AboutSection></AboutSection>
        <DevSection></DevSection>
      </main>
    </>
  );
};

export default Home;
