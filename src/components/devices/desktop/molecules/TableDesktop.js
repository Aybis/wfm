import React from 'react';

function TableDesktop({ children }) {
  return (
    <div className="w-full mt-4">
      <div className="px-4 md:px-10 py-4 md:py-7  rounded-tl-lg rounded-tr-lg hidden">
        <div className="sm:flex items-center justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Projects
          </p>
          <div>
            <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
              <p className="text-sm font-medium leading-none text-white">
                New Project
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none bg-gray-200 text-gray-800">
              <th className="font-medium text-base text-left pl-4">Libur</th>
              <th className="font-medium text-base text-left pl-12">Hari</th>
              <th className="font-medium text-base text-left pl-12">Status</th>
              <th className="font-medium text-base text-left pl-20">
                Updated At
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="w-full">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default TableDesktop;
