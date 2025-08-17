export default function Settings() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <form className="bg-white p-6 rounded shadow w-96">
        <label className="block mb-2">Name</label>
        <input className="border p-2 mb-4 w-full" defaultValue="John Doe" />

        <label className="block mb-2">Email</label>
        <input type="email" className="border p-2 mb-4 w-full" defaultValue="john@example.com" />

        <label className="block mb-2">Password</label>
        <input type="password" className="border p-2 mb-4 w-full" placeholder="Enter new password" />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
}
