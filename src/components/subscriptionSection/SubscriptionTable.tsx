
const SubscriptionTable = () => {
    return (
      <div >
        <h2 className="text-lg font-semibold mb-4">Subscriptions</h2>
        <div className=" overflow-x-auto rounded-lg p-4 bg-white">
        <table className="w-full text-sm text-left responsive text-gray-600">
          <thead className="bg-gray-100 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Subscription</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Connections</th>
              <th className="px-4 py-2">Next billing date</th>
              <th className="px-4 py-2">Paid</th>
              <th className="px-4 py-2">Purchase date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                My monthly subscription
              </td>
              <td className="px-4 py-2">Monthly</td>
              <td className="px-4 py-2">2</td>
              <td className="px-4 py-2">2024-08-01</td>
              <td className="px-4 py-2">9.99</td>
              <td className="px-4 py-2 flex items-center justify-between">
                2024-08-01 23:06:18
                <button className="bg-red-500 text-white px-2 py-0.5 text-xs rounded ml-2">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        
      </div>
    );
  };
  
  export default SubscriptionTable;
  