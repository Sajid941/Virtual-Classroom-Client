import { GoFileCode } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { GoFileZip } from "react-icons/go";
const DashboardHome = () => {
    return (
        <div>
            <div className="rounded-lg shadow-lg border w-full">
                <div className="bg-[url('https://i.ibb.co/ngh5dsy/ivan-aleksic-PDRFee-Dni-Ck-unsplash.jpg')] bg-cover h-[200px] md:h-[250px] lg:h-[300px] text-white relative">
                    <div className="bg-black/30 w-full h-full absolute"></div>
                    <div className="relative px-5 py-5">
                        <h2 className="font-bold text-lg z-10">The law of Thermodynamics</h2>
                        <p className="">
                            <span className="block">Section: 11/B | Science</span>
                            <span className="block font-semibold">Subject: Physics</span>
                        </p>
                    </div>
                </div>
                <div className="px-4 py-2 bg-[#004085] text-white flex justify-between items-center">
                    <p>Conducting By: <span className="font-semibold">Willy Swik</span></p>
                    <div className="flex space-x-2">
                        <button className="p-2  rounded">
                            <GoFileZip size={30} />
                        </button>
                        <button className="p-2  rounded">
                            <GoFileCode size={30} />
                        </button>
                        <button className="p-2  rounded">
                            <GoComment size={30}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;