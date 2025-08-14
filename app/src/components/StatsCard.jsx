export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
