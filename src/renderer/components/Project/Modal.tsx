import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';

type FieldType = {
  name: string;
  location: string;
  status: string;
};

const ProjectModal = ({
  title,
  open,
  onOk,
  confirmLoading,
  onCancel,
  onFinish,
  onFinishFailed,
  editValue,
  form,
}: any) => {
  useEffect(() => {
    form.setFieldsValue({
      ...editValue,
    });
  }, [editValue]);
  return (
    <Modal
      title={title}
      footer={null}
      open={open}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={editValue}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Project Name"
          name="name"
          rules={[{ required: true, message: 'Please input your project name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Please input your location!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please input your status!' }]}
        >
          <Input />
        </Form.Item>

        <Row justify="space-between">
          <Col>
            <Button type="default" onClick={onCancel}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProjectModal;
