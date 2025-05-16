// components/StatsSection.tsx

type StatItem = {
  label: string;
  value: number;
  color: string;
};

type StatsSectionProps = {
  stats: StatItem[];
};

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 font-inter sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-white shadow rounded  p-4 text-center border border-gray-100`}
        >
          <p className={`${stat.color.split(' ')[0]} text-left text-md font-medium`}>{stat.label}</p>
          <p className=" text-left text-blue-600 mt-2  text-md font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
