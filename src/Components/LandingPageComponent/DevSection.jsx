import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaUser } from "react-icons/fa";
import SectionHeading from "../Shared/SectionHeading";

const DevSection = () => {

    const [dev, setDev] = useState([]);

    useEffect(() => {
        fetch('dev.json')
            .then(res => res.json())
            .then(data => {
                setDev(data);
            })
    })
    console.log(dev);

    return (
        <div className="max-w-screen-xl mx-auto my-20">
             <SectionHeading heading={"Meet Our Developers"}/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-8 md:mx-0">
                {
                    dev.map((dev, index) => {
                        return (
                            <div key={index} className="flex flex-col text-center items-center justify-center p-8 rounded-lg shadow-lg transition duration-700 hover:-translate-y-2 border">
                               <div>
                                {dev.image ? <img className="w-24 h-24 object-cover rounded-full" src={dev.image} alt="" /> : <FaUser className="w-24 h-24 rounded-full text-secondary"></FaUser>}
                               </div>
                                <p className="text-3xl mt-4 font-bold text-black">{dev.name}</p>
                                <p className="font-light">{dev?.email}</p>
                                <p className="text-xl font-semibold mt-2 text-secondary rounded-xl">{dev.role}</p>
                                <hr className="w-full mt-2" />
                                <div className="flex justify-center items-center mt-4 gap-3">
                                    <a className="text-3xl text-blue-700" href={dev.linkedin} target="_blank" rel="noreferrer"><FaLinkedin></FaLinkedin></a>
                                    <a className="text-3xl text-gray-700" href={dev.github} target="_blank" rel="noreferrer"><FaGithub></FaGithub></a>
                                    <a className="text-3xl text-blue-600" href={dev.facebook} target="_blank" rel="noreferrer"><FaFacebook></FaFacebook></a>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default DevSection;