import { Button, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import ProjectModal from './Project/Modal';
import collections from '../database/db';
import ProjectTable from './Project/Table';

function Project() {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [projects, setProjects] = useState<any>([]);
  const [deleteResult, setDeleteResult] = useState('');
  const [modalText, setModalText] = useState('Content of the modal');
  // const [isProjectEditModal, setIsProjectEditModalVisible] = useState(false);
  const [editValue, setEditValue] = useState<any>({});

  const showModal = () => {
    setOpen(true);
    form.setFieldsValue({
      name: '',
      location: '',
      status: '',
    });
    setEditValue('');
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const getProjects = async () => {
    const result = await collections.projects.find().exec();
    if (result && result.length > 0) {
      const data = result.map((item) => item.toJSON());

      setProjects(data);
    } else {
      setProjects([]);
    }
  };
  const onFinish = async (values: any) => {
    if (editValue) {
      try {
        // Fetch the document you want to modify by its ID
        const existingDoc = await collections.projects
          .findOne({ selector: { id: editValue.id } })
          .exec();

        if (existingDoc) {
          await existingDoc.update({
            id: editValue.id,
            name: values.name,
            location: values.location,
            status: values.status,
          });
          setOpen(false);
          getProjects();
        }
      } catch (error) {
        console.error('Error modifying project:', error);
      }
    } else {
      try {
        const result = await collections.projects.insert({
          id: Math.floor(Math.random() * 100).toString(),
          name: values.name,
          location: values.location,
          status: values.status,
        });
        if (result.isInstanceOfRxDocument) {
          setOpen(false);
          form.setFieldsValue({
            name: '',
            location: '',
            status: '',
          });
          getProjects();
        }
      } catch (error) {
        console.error('Error saving project:', error);
      }
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    getProjects();
  }, [deleteResult]);

  const handleDeleteResult = (data) => {
    setDeleteResult(data);
  };

  const editProject = (list) => {
    setOpen(true);
    setEditValue(list);
  };

  return (
    <div>
      <h1>Cash Fund</h1>
      <div style={{ textAlign: 'right' }}>
        <Button type="primary" onClick={showModal}>
          Create new project
        </Button>

        <ProjectModal
          title="Title"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          modalText={modalText}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          editValue={editValue}
          form={form}
        />
      </div>

      <ProjectTable
        projects={projects}
        handleDeleteResult={handleDeleteResult}
        editProject={editProject}
      />
    </div>
  );
}

export default Project;
