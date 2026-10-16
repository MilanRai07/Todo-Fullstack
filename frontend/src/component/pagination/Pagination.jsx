import { Triangle } from 'lucide-react'
import React from 'react'
import ReactPaginateModule from 'react-paginate'

const ReactPaginate = ReactPaginateModule.default


const Pagination = ({setPage, currentPage, totalPages}) => {
    return (
        <div className='flex items-center justify-center gap-3 h-[43px] mt-16 '>
            <button
                className="min-[784px]:w-[38px] min-[784px]:h-[38px] w-[29px] h-[29px] bg-primary hover:bg-secondary transition rounded-full grid place-items-center cursor-pointer"
                onClick={() => {
                    setPage(currentPage - 1)
                }
                }
                disabled={currentPage === 1}

            >
                <Triangle size={16} className="rotate-270 text-white" />
            </button>

            <ReactPaginate
                previousLabel={null}
                nextLabel={null}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={(event) => {
                    setPage(event.selected + 1);
                }}
                containerClassName={`
                       flex items-center justify-center gap-[4px]
                       bg-primary text-white rounded-full px-[10px] py-[3px]
                       min-[784px]:h-[38px] h-[30px] transition-all duration-300
                   `}
                pageClassName={`
                       w-[24px] h-[24px] min-[784px]:w-[30px] min-[784px]:h-[30px]
                       flex items-center justify-center
                       text-white text-[12px] min-[784px]:text-sm
                       rounded-full cursor-pointer hover:text-black
                       transition-all duration-300
                   `}
                activeClassName={`!bg-white !text-black font-bold`}
                forcePage={currentPage - 1}
            />

            <button
                className="min-[784px]:w-[38px] min-[784px]:h-[38px] w-[29px] h-[29px] bg-primary hover:bg-secondary transition rounded-full grid place-items-center cursor-pointer"
                onClick={() => {
                    setPage(currentPage + 1)
                }}
                disabled={currentPage === totalPages}
            >
                     <Triangle size={16} className="rotate-90 text-white" />
            </button>
        </div>
    )
}

export default Pagination