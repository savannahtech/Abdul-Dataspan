import Chevron from "./Chevron";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export default function PaginationBar({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav className="flex items-center justify-center mt-4">
      <i
        className="rotate-180 mr-2 w-[30px]"
        onClick={() => onPageChange(page - 1)}
      >
        {page > 1 && (
          <div
            className="px-3 py-1 cursor-pointer"
            onClick={() => onPageChange(page - 1)}
          >
            <Chevron />
          </div>
        )}
      </i>

      <div className="bg-gray-100 rounded-xl">
        {range(1, totalPages).map((_page) => (
          <button
            key={_page}
            className={`mx-0 w-[29px] h-[29px] text-[12px] font-semibold  rounded-full ${
              page === _page ? "bg-yellow  text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => onPageChange(_page)}
          >
            {_page}
          </button>
        ))}
      </div>

      <i className="mr-2 w-[30px]">
        {page < totalPages && (
          <div
            className="px-3 py-1 cursor-pointer"
            onClick={() => onPageChange(page + 1)}
          >
            <Chevron />
          </div>
        )}
      </i>
    </nav>
  );
}

export const getPageData = (
  array: any[],
  page: number,
  itemsPerPage: number
) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
};
