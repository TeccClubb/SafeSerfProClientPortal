const stats = [
    { label: 'Tickets', value: 1, color: 'text-red-500 border-red-500' },
    { label: 'Subscriptions', value: 0, color: 'text-green-500 border-green-500' },
    { label: 'Devices', value: 0, color: 'text-blue-500 border-blue-500' },
    { label: 'DNS', value: 29, color: 'text-indigo-500 border-indigo-500' },
    { label: 'VPN Servers', value: 253, color: 'text-purple-500 border-purple-500' },
  ];
  
  export default function StatsSection() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white shadow rounded p-4 text-center border-1 border-gray-100  }`}
          >
            <p className={`${stat.color.split(' ')[0]} text-left font-medium`}>{stat.label}</p>
            <p className="text-gray-800 font-bold text-left mt-2 text-lg">{stat.value}</p>
          </div>
        ))}
      </div>
    );
  }
  