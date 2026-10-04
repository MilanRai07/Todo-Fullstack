import React, { useState, useRef, useEffect } from 'react';


const CustomDropdown = ({ label, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative w-full">
            <label className={`block mb-3 text-xs sm:text-sm font-semibold text-gray-800`}>
                {label}
            </label>

            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`
                    w-full
    min-h-[46px] sm:min-h-[50px] min-w-[200px]
    px-3.5 sm:px-4
    flex items-center justify-between
    gap-3
    bg-white
    border
    rounded-xl
    text-left
    transition-all duration-200
    outline-none
    focus:outline-none
    focus-visible:outline-none
    focus:ring-0
    ${isOpen
                        ? 'border-[#0067B0]'
                        : 'border-gray-200 hover:border-gray-300'
                    }
                `}
            >
                <span className="truncate text-sm sm:text-[15px] font-medium text-gray-600">
                    {value}
                </span>

                <svg
                    className={`
                        w-4 h-4 sm:w-5 sm:h-5
                        flex-shrink-0
                        text-gray-400
                        transition-transform duration-200
                        ${isOpen ? 'rotate-180 text-[#0067B0]' : ''}
                    `}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="
                        absolute
                        left-0
                        right-0
                        top-full
                        z-50
                        mt-2
                        overflow-hidden
                        rounded-xl
                        border border-gray-100
                        bg-white
                        shadow-xl
                        shadow-black/10
                        animate-[dropdownIn_0.15s_ease-out]
                    "
                >
                    <div className="max-h-60 overflow-y-auto p-1.5">
                        {options.map((option) => {
                            const isSelected = option === value;

                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={`
                                        w-full
                                        flex items-center justify-between
                                        px-3 sm:px-3.5
                                        py-2.5 sm:py-3
                                        rounded-lg
                                        text-left
                                        text-sm sm:text-[15px]
                                        transition-colors duration-150
                                        ${isSelected
                                            ? 'bg-[#0067B0]/8 text-[#0067B0] font-semibold'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <span className="truncate">
                                        {option}
                                    </span>

                                    {isSelected && (
                                        <svg
                                            className="w-4 h-4 flex-shrink-0 ml-3 text-[#0067B0]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
export default CustomDropdown;