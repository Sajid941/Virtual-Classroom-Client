// import FaHome from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/classNet.png';

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className="wrap text-center">
                <img src={img} alt="" className='mx-auto w-2/5' />
                <h1 className="text-5xl my-3 font-bold text-secondary">Page not found</h1>

                <a onClick={() => navigate(-1)}  className="mt-5 text-black shadow-md hover:text-blue-700 btn border-none rounded-none bg-accent tex font-bold text-md">  Go back</a>
                {/* <FaHome className='text-xl'/> */}
            </div>
        </div>
    );
};

export default ErrorPage;