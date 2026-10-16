
const Error = () => {
    return (
        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center">
            <h2 className="text-lg font-semibold text-red-600">
                Something went wrong!
            </h2>
            <p className="text-sm text-gray-500">
                Failed to load. Please try again.
            </p>
        </div>
    );
};
export default Error
