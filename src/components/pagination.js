import ScrollLeft from '../assets/scroll-left.svg'
import ScrollRight from '../assets/scroll-right.svg'

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  setCurrentPage,
}) {
  const generatePageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 3

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1)
      }

      if (startPage > 1) {
        pageNumbers.push(1, '...')
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (endPage < totalPages) {
        pageNumbers.push('...', totalPages)
      }
    }

    return pageNumbers
  }

  const handlePageClick = (pageNumber) => {
    if (typeof pageNumber === 'number') setCurrentPage(pageNumber)
  }

  if (totalItems === 0) return <></>

  const pageNumbers = generatePageNumbers()

  return (
    <div className="flex justify-end pt-7">
      {pageNumbers.length > 1 && (
        <div className="flex items-center">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            className="hover:bg-neutral-100 disabled:hover:bg-white focus-visible:ring focus-visible:ring-purple-410 focus:outline-none rounded-tl-[3px] rounded-bl-[3px]"
            disabled={currentPage === 1}
          >
            <img src={ScrollLeft} alt="" />
          </button>
          <div>
            {pageNumbers.map((pageNumber, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(pageNumber)}
                className={`py-[7px] px-[10px] text-xs border border-neutral-400 first:border-l-0 last:border-r-0 shadow-sm disabled:hover:bg-white focus-visible:ring focus-visible:ring-purple-410 focus-visible:outline-none
                ${
                  pageNumber === currentPage
                    ? 'bg-primary-700 text-neutral-300 border-primary-800 focus:ring-0'
                    : 'text-neutral-800 hover:bg-neutral-100'
                }`}
                disabled={pageNumber === '...'}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            className="hover:bg-neutral-100 disabled:hover:bg-white focus-visible:ring focus-visible:ring-purple-410 focus-visible:outline-none rounded-tr-[3px] rounded-br-[3px]"
            disabled={currentPage === totalPages}
          >
            <img src={ScrollRight} alt="" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Pagination
