import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-center mt-6 gap-2 text-sm">
      <button className="hover:underline">{'<'}</button>
      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
        <button
          key={num}
          className={`px-2 py-1 rounded ${
            num === 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"
          }`}
        >
          {num}
        </button>
      ))}
      <button className="hover:underline">{'>'}</button>
    </div>
  );
};

export default Pagination;
