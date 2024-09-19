import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  const breadCrumbs = [{ path: "/", label: "Home" }, { label: "About Us" }];
  return (
    <div className="breadcrumbs text-xl absolute bottom-16 w-full  flex justify-center text-white font-semibold ">
      <ul>
        {breadCrumbs.map((breadcrumbData, idx) => (
          <li key={idx}>
            {breadcrumbData.path ? (
              <Link to={breadcrumbData.path}>{breadcrumbData.label}</Link>
            ) : (
              <Link>{breadcrumbData.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
