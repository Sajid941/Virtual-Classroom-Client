import { Link } from "react-router-dom";
import failedImg from "../../assets/images/undraw_feeling_blue_-4-b7q.svg"
const PaymentFailed = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                <img
                    src={failedImg}
                    alt="Payment Success"
                    className="w-48 mx-auto mb-6"
                />
                <h2 className="text-2xl font-semibold text-red-500 mb-4">
                    Payment Failed
                </h2>
                <p className="text-gray-600 mb-6">
                    
                Thank you for choosing ClassNet. Unfortunately, your payment could not be processed. Please try again or contact support for assistance. Your account remains on the free tier, and you are still limited to creating up to 5 classes.
                </p>

                <ul className="steps mb-8">
                    <li className="step step-neutral">Confirm proceed</li>
                    <li className="step step-neutral">Choose Payment Method</li>
                    <li className="step ">Payment</li>
                    <li className="step ">Success Payment</li>
                </ul>

                <div className="w-full">
                    <Link to="/dashboard/dashboardHome" className="w-full btn border-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded">
                        Back Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;