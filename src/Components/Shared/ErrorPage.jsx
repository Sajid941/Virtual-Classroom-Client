
const ErrorPage = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className="wrap">
                <h1 className="text-6xl font-bold text-red-500">Error 404</h1>
                <p className="text-xl">The page you're looking for doesn't exist.</p>
                <a href="/" className="mt-5 text-blue-500 hover:text-blue-700">Go back to Home</a>
            </div>
        </div>
    );
};

export default ErrorPage;