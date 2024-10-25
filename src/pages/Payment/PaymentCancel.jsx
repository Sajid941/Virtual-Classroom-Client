import { Link } from "react-router-dom";
import cancelImg from "../../assets/images/undraw_cancel_re_pkdm.svg"
const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                <img
                    src={cancelImg}
                    alt="Payment Success"
                    className="w-48 mx-auto mb-6"
                />
                <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
                    Payment Cancel
                </h2>
                <p className="text-gray-600 mb-6">
                Thank you for considering ClassNet Premium. Your payment process has been canceled. You can continue using the free version, which allows you to create up to 5 classes. Feel free to upgrade anytime to unlock unlimited class creation.
                </p>

                <ul className="steps mb-8">
                    <li className="step step-neutral">Confirm proceed</li>
                    <li className="step">Choose Payment Method</li>
                    <li className="step">Payment</li>
                    <li className="step">Success Payment</li>
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

export default PaymentCancel;