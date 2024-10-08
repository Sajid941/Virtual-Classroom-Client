import { Helmet } from "react-helmet-async";
import JoinUsSection from "../../Components/AboutPageComponents/JoinUsSection";
import OfferSection from "../../Components/AboutPageComponents/OfferSection";
import OurMission from "../../Components/AboutPageComponents/OurMission";
import WhyUsSection from "../../Components/AboutPageComponents/WhyUsSection";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import { ScrollRestoration } from "react-router-dom";

const AboutPage = () => {
  const breadCrumbs = [{ path: "/", label: "Home" }, { label: "About Us" }];

  return (
    <>
    <Helmet>
      <title>About Us | Class Net</title>
    </Helmet>
      <header
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/8C5pPQdJ/about-page-cover.jpg')",
        }}
        className={`relative bg-center h-[300px] `}
      >
        {/* overlay */}
        <div className="h-[300px] bg-[#004085] bg-opacity-75"></div>
        <Breadcrumbs breadCrumbs={breadCrumbs} />
      </header>
      <main className="md:px-10 lg:px-28">
        <OurMission />
        <OfferSection></OfferSection>
        <WhyUsSection></WhyUsSection>
        <JoinUsSection></JoinUsSection>
      </main>
      <ScrollRestoration/>
    </>
  );
};

export default AboutPage;
