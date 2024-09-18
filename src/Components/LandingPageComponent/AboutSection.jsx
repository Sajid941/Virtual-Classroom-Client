import SectionHeading from "../Shared/SectionHeading";

const AboutSection = () => {
  return (
    <div>
      <SectionHeading heading="About Class Net"></SectionHeading>
      <div className="md:flex md:mt-6 md:mx-10 gap-6 items-center ">
        {/* Image div */}
        <div className="flex flex-grow justify-center items-center">
          <img
            className="w-[112px] md:h-[240px] md:w-[500px] object-cover"
            src="https://i.ibb.co.com/hgXFcw0/classNet.png"
            alt=""
          />
        </div>

        {/* Text content */}
        <div className="mt-4 md:mt-0 mx-2">
          <h1 className="text-2xl md:text-3xl font-bold">
            Expanding Learning Horizons
          </h1>
          <p className="text-[16px] md:text-[20px] leading-relaxed">
            At EduSphere, we believe that education should be accessible to
            everyone, no matter where they are. Our platform enables educators
            to create dynamic virtual classrooms that allow students to learn,
            collaborate, and grow—whether they are at home, in school, or on the
            go.
          </p>
         <div className="flex md:justify-end justify-center">
         <button className="btn border-none capitalize rounded-none bg-accent font-semibold my-6 ">Read More</button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
