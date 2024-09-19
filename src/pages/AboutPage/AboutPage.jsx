import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";

const AboutPage = () => {
  const breadCrumbs = [{ path: "/", label: "Home" }, { label: "About Us" }];

  return (
    <>
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
    </>
  );
};

export default AboutPage;
