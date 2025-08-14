export default function MakePayment() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Make a Payment</h2>
      <form className="bg-white p-6 rounded shadow w-96">
        <label className="block mb-2">Invoice ID</label>
        <input className="border p-2 mb-4 w-full" placeholder="Enter Invoice ID" />

        <label className="block mb-2">Amount</label>
        <input type="number" className="border p-2 mb-4 w-full" placeholder="Enter Amount" />

        <label className="block mb-2">Payment Method</label>
        <select className="border p-2 mb-4 w-full">
          <option>Credit Card</option>
          <option>UPI</option>
          <option>Net Banking</option>
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit Payment</button>
      </form>
    </div>
  );
}
