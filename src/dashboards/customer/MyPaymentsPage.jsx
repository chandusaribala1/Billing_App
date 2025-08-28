import React, { useEffect, useState } from "react";
import axios from "axios";

const MyPaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/payments/me");
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading payments...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold mb-4">My Payments</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Payment ID</th>
              <th className="border p-2">Invoice ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay) => (
              <tr key={pay.id}>
                <td className="border p-2">{pay.id}</td>
                <td className="border p-2">{pay.invoiceId}</td>
                <td className="border p-2">₹{pay.amount}</td>
                <td className="border p-2">{pay.date}</td>
                <td className="border p-2">{pay.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPaymentsPage;
