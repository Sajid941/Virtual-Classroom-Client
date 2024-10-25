import { Link } from "react-router-dom";
import successImg from "../../assets/images/undraw_done_re_oak4.svg";
const PaymentSuccess = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                <img
                    src={successImg}
                    alt="Payment Success"
                    className="w-48 mx-auto mb-6"
                />
                <h2 className="text-2xl font-semibold text-green-500 mb-4">
                    Payment Successful
                </h2>
                <p className="text-gray-600 mb-6">
                    Thank you for choosing ClassNet. Your class creation access
                    has been upgraded successfully. You can now create unlimited
                    classes as a premium user.
                </p>

                <ul className="steps mb-8">
                    <li className="step step-neutral">Confirm proceed</li>
                    <li className="step step-neutral">Choose Payment Method</li>
                    <li className="step step-neutral">Payment</li>
                    <li className="step step-neutral">Success Payment</li>
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

export default PaymentSuccess;
