import PropTypes from "prop-types";
const SectionHeading = ({ heading }) => {
  return (
    <div className="text-center font-extrabold text-secondary mt-20 mb-5 text-2xl md:text-3xl lg:text-[55px]">
      {heading}
    </div>
  );
};

export default SectionHeading;
SectionHeading.propTypes = {
  heading: PropTypes.string,
};
