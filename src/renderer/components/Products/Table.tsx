import React from 'react';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import collections from '@/renderer/database/db';

interface DataType {
  id: number;
  key: string;
  product_name: string;
  category: string;
  indication: string;
}

const ProductTable = ({ products, handleDeleteResult, editProduct }): any => {
  const doConfirm = async (id: number) => {
    const query = collections.products.find({
      selector: {
        id: {
          $eq: id.toString(),
        },
      },
    });
    const result = await query.remove();

    if (result) {
      handleDeleteResult(result);

      message.success('Product is successfully deleted!');
    } else {
      message.error('Something wrong please try again!');
    }
  };

  const cancel = (e) => {
    console.log(e);
    message.error('Action canceled');
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'id',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Indication',
      dataIndex: 'indication',
    },
    {
      title: 'Action',
      key: 'product.id',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ backgroundColor: '#d9d764' }}
            onClick={() => editProduct(record)}
          >
            Update {record.name}{' '}
          </Button>

          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              doConfirm(record.id);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products.map((product) => ({
        ...product,
        key: product.id,
      }))}
    />
  );
};

export default ProductTable;
