import { IoMdArrowDropright } from "react-icons/io";
import SectionHeading from "../Shared/SectionHeading";

const JoinUsSection = () => {
  return (
    <div className="container mx-auto px-2 lg:px-12">
      <SectionHeading
        heading={"Join Us in Shaping the Future of Education"}
      ></SectionHeading>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 my-12">
        <div className="flex-1">
          <h3 className="font-bold md:text-lg text-right">
            EduSphere is here to help teachers and students alike embrace the
            future of learning. Our platform simplifies the complexities of
            education and provides all the tools needed to succeed in a digital
            world. Ready to be a part of the EduSphere community?
          </h3>
        </div>

        <div className="flex-1 flex justify-center">
            <button className="btn bg-[#FFC107] text-2xl font-bold">Get Started <IoMdArrowDropright size={50} /></button>
        </div>
      </div>
    </div>
  );
};

export default JoinUsSection;
