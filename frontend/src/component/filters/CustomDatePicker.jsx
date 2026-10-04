import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({
    selected,
    onChange,
}) => {
    return (
        <div className="w-full min-w-[300px]">
            <label className="block mb-3 text-xs sm:text-sm font-semibold text-gray-800">
                Date
            </label>
            <DatePicker
                selected={selected}
                onChange={onChange}
                placeholderText="yyyy-mm-dd"
                dateFormat="yyyy-MM-dd"
                wrapperClassName="w-full"
                className={`w-full min-h-[46px] sm:min-h-[50px] px-3.5 sm:px-4
                                                        border border-gray-200 rounded-xl text-sm sm:text-[15px] font-medium
                                                        text-gray-600 outline-none transition-all duration-200
                                                        hover:border-gray-300 focus:border-[#0067B0]
                                                        placeholder:text-gray-400`}
                calendarClassName="!bg-white !shadow-lg !rounded-xl !p-3"
            />
        </div>
    )
}

export default CustomDatePicker