export default function Reports() {
  const reports = [
    { name: "Monthly Invoice Report", date: "2024-04-01" },
    { name: "Outstanding Payments Report", date: "2024-04-01" },
    { name: "Annual Summary", date: "2023-12-31" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Reports</h2>
      <table className="w-full bg-white border border-gray-200 rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Report Name</th>
            <th className="p-3 border">Generated Date</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={i} className="text-center">
              <td className="p-3 border">{r.name}</td>
              <td className="p-3 border">{r.date}</td>
              <td className="p-3 border">
                <button className="bg-green-500 text-white px-3 py-1 rounded">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
