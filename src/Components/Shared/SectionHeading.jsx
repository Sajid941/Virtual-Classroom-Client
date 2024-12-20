import PropTypes from "prop-types";
const SectionHeading = ({ heading }) => {
  return (
    <div className="text-center font-extrabold  mt-20 mb-10 text-4xl md:text-3xl lg:text-5xl text-secondary">
      {heading}
    </div>
  );
};

export default SectionHeading;
SectionHeading.propTypes = {
  heading: PropTypes.string,
};