import React, { useState } from 'react';
import { Table, Input, Button, Tag, Space } from 'antd';
import { motion } from 'framer-motion';
import { SearchOutlined } from '@ant-design/icons';

const Camps = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Placeholder camp data (replace with actual data later)
  const campData = [
    // {
    //   key: '1',
    //   campName: 'Summer Adventure',
    //   fees: 150,
    //   paymentStatus: 'Unpaid',
    //   confirmationStatus: 'Pending',
    // }
  ];

  // Filtered search
  const filteredData = campData.filter(item =>
    item.campName.toLowerCase().includes(searchText.toLowerCase())
  );

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
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: status => (
        <Tag color={status === 'Paid' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Confirmation',
      dataIndex: 'confirmationStatus',
      key: 'confirmationStatus',
      render: status => (
        <Tag color={status === 'Confirmed' ? 'blue' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.paymentStatus !== 'Paid' && (
            <Button type="primary" size="small">
              Pay
            </Button>
          )}
          {record.paymentStatus !== 'Paid' && (
            <Button danger size="small">
              Cancel
            </Button>
          )}
          {record.paymentStatus === 'Paid' && (
            <Button size="small" className="bg-gray-200">
              Feedback
            </Button>
          )}
        </Space>
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
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Registered Camps</h2>
        <Input
          placeholder="Search camps..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 250 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          current: currentPage,
          pageSize: 5,
          onChange: page => setCurrentPage(page),
        }}
        bordered
        rowKey="id"
      />
    </motion.div>
  );
};

export default Camps;
