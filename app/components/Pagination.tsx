import React from "react";

const Pagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage,
}: {
  totalPosts: number;
  postPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex gap-2 justify-center my-5 ">
      {pages.map((page, index) => (
        <button
          onClick={() => setCurrentPage(page)}
          className={`font-semibold text-cyan-500 cursor-pointer hover:bg-cyan-100 py-1 px-3 rounded-md ${
            currentPage === page ? "bg-cyan-100 border" : ""
          }`}
          key={index}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
