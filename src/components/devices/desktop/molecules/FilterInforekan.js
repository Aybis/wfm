import React from 'react';

export default function FilterInforekan() {
  return (
    <>
      <div className="flex flex-col gap-1 px-6 py-2">
        <label htmlFor="Status" className="text-gray-400 font-medium">
          Direktorat
        </label>
        <select className="p-2 border-none text-gray-800 font-semibold tracking-wide focus:outline-none">
          <option value="progress">Progress</option>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="reject">Rejected</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 px-6 py-2">
        <label htmlFor="Status" className="text-gray-400 font-medium">
          Unit
        </label>
        <select className="p-2 border-none text-gray-800 font-semibold tracking-wide">
          <option value="atasan">Atasan</option>
          <option value="all">All</option>
          <option value="hr">HR</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 px-6 py-2">
        <label htmlFor="Status" className="text-gray-400 font-medium">
          Sub Unit
        </label>
        <select className="p-2 border-none text-gray-800 font-semibold tracking-wide">
          <option value="atasan">Atasan</option>
          <option value="all">All</option>
          <option value="hr">HR</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 px-6 py-2">
        <label htmlFor="Status" className="text-gray-400 font-medium">
          Jabatan
        </label>
        <select className="p-2 border-none text-gray-800 font-semibold tracking-wide">
          <option value="atasan">Atasan</option>
          <option value="all">All</option>
          <option value="hr">HR</option>
        </select>
      </div>

      <div className="grid col-span-2 divide-x-2 divide-gray-100 h-full w-full">
        <div className="flex col-span-3 px-4 justify-center items-center">
          <input
            id="email-address"
            type="text"
            autoComplete="email"
            placeholder="Search Name"
            required
            className="appearance-none min-w-0 w-full  bg-white border-2 border-gray-300 rounded-md shadow-sm py-3 px-4 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-apps-primary focus:ring-1 focus:ring-apps-primary"
          />
          <div className="ml-4 flex-shrink-0">
            <button
              type="submit"
              className="w-full bg-apps-primary border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apps-primary">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
