import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }
  console.log(payments);
  return (
    <div className="overflow-x-auto bg-base-100 shadow-md rounded-xl p-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Transaction ID</th>
            <th>Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td>{index + 1}</td>
              <td className="text-sm">{payment.parcelId}</td>
              <td className="text-sm">{user.email}</td>
              <td className="text-green-600 font-semibold">
                ৳{payment.amount}
              </td>
              <td className="text-xs break-all">{payment.transactionId}</td>
              <td>{new Date(payment.paid_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
