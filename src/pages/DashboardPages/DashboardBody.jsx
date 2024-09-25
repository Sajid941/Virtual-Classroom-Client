import{ useState, useEffect } from "react";
import ClassCard from "./ClassCard";

const DashboardBody = () => {
  const [classes, setClasses] = useState([]);

  // Fetch class data from public folder
  useEffect(() => {
    fetch("/class.json")
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching class data:", error));
  }, []);
  console.log(classes);
  return (
    <div>
      <div className="w-full">
        {/* Map over the classes and render ClassCard for each */}
        {classes.length > 0 ? (
          classes.map((classData) => (
            <ClassCard key={classData.classId} classData={classData} />
          ))
        ) : (
          <p>Loading classes...</p>
        )}
      </div>
    </div>
  );
};

export default DashboardBody;
