export default function Table({ dataSet }) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-4">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-coolGray-200">
              <thead className="bg-whtie">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-400 capitalize">
                    Unit
                  </th>
                  <th
                    scope="col"
                    className="text-center px-6 py-3 text-sm font-medium text-gray-400 capitalize">
                    Hadir
                  </th>
                  <th
                    scope="col"
                    className="text-center px-6 py-3 text-sm font-medium text-gray-400 capitalize">
                    Tidak Hadir
                  </th>
                  <th
                    scope="col"
                    className="text-center px-6 py-3 text-sm font-medium text-gray-400 capitalize">
                    Sakit
                  </th>
                  <th
                    scope="col"
                    className="text-center px-6 py-3 text-sm font-medium text-gray-400 capitalize">
                    Cuti
                  </th>
                  <th
                    scope="col"
                    className="text-center px-6 py-3 text-sm font-medium text-gray-400 capitalize">
                    Sppd
                  </th>
                  <th
                    scope="col"
                    className="text-center px-6 py-3 text-sm font-medium text-gray-400 capitalize">
                    Total Karyawan
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataSet.map((data, personIdx) => (
                  <tr
                    key={Math.random()}
                    className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                      {data.name.toLowerCase()}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                      <span
                        onClick={() => alert(data.hadir)}
                        className="text-apps-primary hover:text-blue-600 transition-all duration-300 cursor-pointer">
                        {data.hadir}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                      <span
                        onClick={() => alert(data.total_karyawan - data.hadir)}
                        className="text-apps-primary hover:text-blue-600 transition-all duration-300 cursor-pointer">
                        {data.total_karyawan - data.hadir}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                      <span
                        onClick={() => alert(data.sakit)}
                        className="text-apps-primary hover:text-blue-600 transition-all duration-300 cursor-pointer">
                        {data.sakit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                      <span
                        onClick={() => alert(data.cuti)}
                        className="text-apps-primary hover:text-blue-600 transition-all duration-300 cursor-pointer">
                        {data.cuti}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium">
                      <span
                        onClick={() => alert(data.sppd)}
                        className="text-apps-primary hover:text-blue-600 transition-all duration-300 cursor-pointer">
                        {data.sppd}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium">
                      <span className="text-gray-600 hover:text-gray-800 transition-all duration-300 cursor-pointer">
                        {data.total_karyawan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
