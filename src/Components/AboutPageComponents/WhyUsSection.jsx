import SectionHeading from "../Shared/SectionHeading";

const WhyUsSection = () => {
  return (
    <div className="container mx-auto px-2 lg:px-12">
      <SectionHeading heading={"Why US?"}></SectionHeading>

      <div className="flex flex-col lg:flex-row items-center gap-10 mt-9">
        <div className="flex-1">
          <h3 className="font-bold md:text-lg text-right">
            We’re more than just a virtual classroom platform—we’re a community.
            Whether you’re an educator looking to enhance your teaching tools or
            a student seeking a flexible learning environment, EduSphere offers
            a simple yet powerful solution. Here’s why we stand out:
          </h3>
        </div>

        <div className="flex-1">
          <h3 className="font-medium md:text-lg mb-5">
            <span className="text-[#004085] font-semibold">
            {">"} User-Friendly Interface:
            </span>{" "}
            No steep learning curve. Our clean, intuitive design ensures that
            both teachers and students can focus on learning, not navigating
            complex systems.
          </h3>

          <h3 className="font-medium md:text-lg mb-5">
            <span className="text-[#004085] font-semibold"> {">"} Secure Api:</span>{" "}
            We prioritize the safety of your data. All communications and
            materials are protected with end-to-end encryption, ensuring your
            privacy.
          </h3>

          <h3 className="font-medium md:text-lg mb-5">
            <span className="text-[#004085] font-semibold">
              {" "}
              {">"} Continuous Innovation:
            </span>{" "}
            We are always improving. With regular updates and new features, we
            ensure our platform evolves with the needs of our users.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default WhyUsSection;
