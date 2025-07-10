import React from 'react';
import { Table, Tag } from 'antd';
import { motion } from 'framer-motion';

const Payments = () => {
  // Dummy placeholder — replace with real transaction data
  const transactionData = [
    // {
    //   id: 'txn_1ABCD2345',
    //   campName: 'STEM Camp 2025',
    //   fees: 199,
    //   date: '2025-07-10',
    //   status: 'Paid'
    // }
  ];

  const columns = [
    {
      title: 'Camp Name',
      dataIndex: 'campName',
      key: 'campName',
      render: text => <strong>{text}</strong>,
    },
    {
      title: 'Fees ($)',
      dataIndex: 'fees',
      key: 'fees',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
      render: id => (
        <span className="text-blue-700 font-mono text-sm">{id}</span>
      ),
    },
    {
      title: 'Payment Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color="green" className="font-semibold">{status}</Tag>
      ),
    },
  ];

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stripe Transactions</h2>

      <Table
        columns={columns}
        dataSource={transactionData}
        pagination={{ pageSize: 5 }}
        bordered
        rowKey="id"
      />
    </motion.div>
  );
};

export default Payments;
