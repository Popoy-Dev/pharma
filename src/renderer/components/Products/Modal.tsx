import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';

type FieldType = {
  product_name: string;
  category: string;
  indication: string;
};

const ProductModal = ({
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
        name="product"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={editValue}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Product name"
          name="product_name"
          rules={[{ required: true, message: 'Please input full name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please input position!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Indication"
          name="indication"
          rules={[{ required: true, message: 'Please input rate!' }]}
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

export default ProductModal;
