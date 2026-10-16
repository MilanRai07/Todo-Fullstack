
import { ClipboardList } from "lucide-react";

const TodoEmpty = ({ message }) => {
    return (
        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
            <ClipboardList size={40} className="text-gray-400" />

            <h2 className="text-lg font-semibold text-gray-700">
                No Items Found
            </h2>

            <p className="text-sm text-gray-500">
                {message}
            </p>
        </div>
    );
};

export default TodoEmpty;
