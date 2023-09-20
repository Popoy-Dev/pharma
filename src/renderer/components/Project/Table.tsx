import React from 'react';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import collections from '@/renderer/database/db';

interface DataType {
  id: number;
  key: string;
  name: string;
  age: number;
}

const ProjectTable = ({ projects, handleDeleteResult, editProject }): any => {
  const doConfirm = async (id: number) => {
    const query = collections.projects.find({
      selector: {
        id: {
          $eq: id.toString(),
        },
      },
    });
    const result = await query.remove();

    if (result) {
      handleDeleteResult(result);

      message.success('Project is successfully deleted!');
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
      title: 'Project Name',
      dataIndex: 'name',
      key: 'id',
    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },

    {
      title: 'Action',
      key: 'project.id',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ backgroundColor: '#d9d764' }}
            onClick={() => editProject(record)}
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
      dataSource={projects.map((project) => ({
        ...project,
        key: project.id, // Assuming 'id' is a unique identifier for each project
      }))}
    />
  );
};

export default ProjectTable;
