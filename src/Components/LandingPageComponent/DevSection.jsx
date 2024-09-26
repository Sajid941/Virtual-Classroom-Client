import { FaFacebook, FaGithub, FaLinkedin, FaUser } from "react-icons/fa";
import SectionHeading from "../Shared/SectionHeading";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Loading from "../Loading";

const DevSection = () => {
    const axiosPublic = useAxiosPublic()
    const { data: developers, isPending } = useQuery({
        queryKey: ["developers"],
        queryFn: async () => {
            const res = await axiosPublic("/developers")
            return res.data
        }
    })
    if (isPending) {
        return <Loading />
    }

    return (
        <div className="max-w-screen-xl mx-auto my-20">
            <SectionHeading heading={"Meet Our Developers"} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-8 md:mx-0">
                {
                    developers.map((developer) => {
                        return (
                            <div key={developer._id} className="flex flex-col text-center items-center justify-center p-8 rounded-lg shadow-lg transition duration-700 hover:-translate-y-2 border">
                                <div>
                                    {developer.image ? <img className="w-24 h-24 object-cover rounded-full" src={developer.image} alt="" /> : <FaUser className="w-24 h-24 rounded-full text-secondary"></FaUser>}
                                </div>
                                <p className="text-3xl mt-4 font-bold text-black">{developer.name}</p>
                                <p className="font-light">{developer?.email}</p>
                                <p className="text-xl font-semibold mt-2 text-secondary rounded-xl">{developer.role}</p>
                                <hr className="w-full mt-2" />
                                <div className="flex justify-center items-center mt-4 gap-3">
                                    <a className="text-3xl text-blue-700" href={developer.linkedin} target="_blank" rel="noreferrer"><FaLinkedin></FaLinkedin></a>
                                    <a className="text-3xl text-gray-700 hover:cursor-pointer" href={developer.github} target="_blank" rel="noreferrer"><FaGithub></FaGithub></a>
                                    <a className="text-3xl text-blue-600" href={developer.facebook} target="_blank" rel="noreferrer"><FaFacebook></FaFacebook></a>
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