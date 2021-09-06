/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: 'Operation and Regional',
    hadir: 10,
    sakit: 5,
    cuti: 12,
    sppd: 24,
    terlambat: 100,
  },
  {
    name: 'CORPORATE AFFAIR',
    hadir: 10,
    sakit: 5,
    cuti: 12,
    sppd: 24,
    terlambat: 100,
  },
  {
    name: 'STRATEGIC PLANNING & INVESTMENT',
    hadir: 10,
    sakit: 5,
    cuti: 12,
    sppd: 24,
    terlambat: 100,
  },
  {
    name: 'BUSINESS INNOVATION & SOLUTION',
    hadir: 10,
    sakit: 5,
    cuti: 12,
    sppd: 24,
    terlambat: 100,
  },
  {
    name: 'ENTERPRISE BUSINESS',
    hadir: 10,
    sakit: 5,
    cuti: 12,
    sppd: 24,
    terlambat: 100,
  },
  {
    name: 'GOVERNMENT, POLICE & MILITARY BUSINESS',
    hadir: 10,
    sakit: 5,
    cuti: 12,
    sppd: 24,
    terlambat: 100,
  },
  // More people...
];

export default function Table() {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                </tr>
              </thead>
              <tbody>
                {people.map((person, personIdx) => (
                  <tr
                    key={Math.random()}
                    className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                      {person.name.toLowerCase()}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                      <span
                        onClick={() => alert(person.hadir)}
                        className="text-apps-primary hover:text-blue-600 transition-all duration-300 cursor-pointer">
                        {person.hadir}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                      <span
                        onClick={() => alert(person.hadir)}
                        className="text-apps-primary hover:text-blue-600 transition-all duration-300 cursor-pointer">
                        {person.hadir}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                      <span
                        onClick={() => alert(person.sakit)}
                        className="text-apps-primary hover:text-blue-600 transition-all duration-300 cursor-pointer">
                        {person.sakit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                      <span
                        onClick={() => alert(person.cuti)}
                        className="text-apps-primary hover:text-blue-600 transition-all duration-300 cursor-pointer">
                        {person.cuti}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium">
                      <span
                        onClick={() => alert(person.terlambat)}
                        className="text-apps-primary hover:text-blue-600 transition-all duration-300 cursor-pointer">
                        {person.terlambat}
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
