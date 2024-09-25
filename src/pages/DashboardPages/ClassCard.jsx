import { GoFileCode, GoComment, GoFileZip } from "react-icons/go";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
const ClassCard = ({ classData }) => {
    return (
        <Link to={`/class/${classData.classId}`} className="rounded-lg shadow  w-full my-4">
            <div
                className="bg-cover h-[200px] md:h-[250px] lg:h-[300px] text-white relative"
                style={{ backgroundImage: `url(${classData.classImage})` }}
            >
                <div className="bg-black/30 w-full h-full absolute"></div>
                <div className="relative px-5 py-5">
                    <h2 className="font-bold text-lg z-10">{classData.className}</h2>
                    <p>
                        <span className="block">Section: {classData.section}</span>
                        <span className="block font-semibold">Subject: {classData.subject}</span>
                    </p>
                </div>
            </div>
            <div className="px-4 py-2 bg-[#004085] text-white flex justify-between items-center">
                <p>Conducting By: <span className="font-semibold">{classData.teacher.name}</span></p>
                <div className="flex space-x-2">
                    {classData?.resources.map((resource, index) => (
                        <button key={index} className="p-2 rounded">
                            {resource.type === 'ZIP' && <GoFileZip size={30} />}
                            {resource.type === 'Code' && <GoFileCode size={30} />}
                            {resource.type === 'Comments' && <GoComment size={30} />}
                        </button>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default ClassCard;
ClassCard.propTypes = {
    classData: PropTypes.object,
}
