import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./Breadcrumbs.css";
const Breadcrumbs = ({ breadCrumbs }) => {
  return (
    <div className="breadcrumbs text-xl absolute bottom-16 w-full  flex justify-center text-white font-semibold ">
      <ul>
        {breadCrumbs.map((breadcrumbData, idx) => (
          <li key={idx}>
            {breadcrumbData.path ? (
              <NavLink className="breadcrumb-link" to={breadcrumbData.path}>
                {breadcrumbData.label}
              </NavLink>
            ) : (
              <NavLink className="breadcrumb-link">
                {breadcrumbData.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;

Breadcrumbs.propTypes = {
  breadCrumbs: PropTypes.array,
};
