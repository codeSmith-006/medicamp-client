import React from 'react';

const Payments = () => {
  const payments = [
    { id: 1, participant: 'Emma Johnson', amount: 350, date: '2024-07-01', status: 'Completed', method: 'Credit Card' },
    { id: 2, participant: 'Liam Smith', amount: 280, date: '2024-07-02', status: 'Completed', method: 'Bank Transfer' },
    { id: 3, participant: 'Olivia Davis', amount: 320, date: '2024-07-03', status: 'Pending', method: 'PayPal' },
    { id: 4, participant: 'Noah Wilson', amount: 400, date: '2024-07-04', status: 'Completed', method: 'Credit Card' },
    { id: 5, participant: 'Ava Brown', amount: 350, date: '2024-07-05', status: 'Failed', method: 'Credit Card' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Payment History</h2>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          Process Payment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.participant}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${payment.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.method}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;