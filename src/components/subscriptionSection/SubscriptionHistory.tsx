
const SubscriptionHistory = () => {
  return (
    <div>

      <h2 className="text-lg font-semibold mb-4 ">Subscription history</h2>
      <div className=" rounded-lg p-4 bg-white mt-6">
        <div className="flex justify-between items-center mb-2">
          <select className="border px-2 py-1 text-sm rounded">
            <option>25</option>
          </select>
          <div className="relative w-34"> {/* Reduced width from max-w-sm */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <img
                src="/search.png"
                alt="Search"
                className="w-4 h-4"
              />
              <div className="w-px h-6 bg-gray-300" /> {/* Thin vertical line */}
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-14 pr-4 py-1 border border-gray-200 text-sm rounded w-full"
            />
          </div>


        </div>
        <div className="overflow-x-auto rounded-md">

        <table className="w-full text-sm text-left overflow-x-auto text-gray-600">
          <thead className="bg-gray-100 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Subscription</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Paid</th>
              <th className="px-4 py-2">Purchase date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="px-4 py-2 text-blue-600">#1</td>
              <td className="px-4 py-2 text-blue-600 underline cursor-pointer">My super device</td>
              <td className="px-4 py-2">—</td>
              <td className="px-4 py-2">Paid</td>
              <td className="px-4 py-2">2024-08-01 23:06:18</td>
            </tr>
          </tbody>
        </table>
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>Showing 1 to 1 of 1 entries</span>
          <div className="space-x-1">
            <button className="border border-gray- px-2 py-1 rounded">Previous</button>
            <button className="border px-2 py-1 bg-blue-600 text-white rounded">1</button>
            <button className="border px-2 py-1 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionHistory;
