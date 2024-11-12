import { Button, Form, Input, InputNumber, message, Select, Spin } from "antd";
import { useState } from "react";

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Category created successfully.");
        form.resetFields();
      } else {
        message.error("Category create failed.");
      }
    } catch (error) {
      console.log("Category create failure:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Price"
          name="current"
          rules={[
            {
              required: true,
              message: "Please input product price!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Discount Rate"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input discount rate!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Products Image(Links)"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input min. 4 product image links!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="* Write each visual link on a new line."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Products Colors(RGB codes)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Please input min. 1 product color code !",
            },
          ]}
        >
          <Input.TextArea
            placeholder="* Write each RGB code on a new line."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Product Sizes"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Please input min. 1 product size !",
            },
          ]}
        >
          <Input.TextArea
            placeholder="* Write each size on a new line."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Product Categories"
          name="category"
          rules={[
            {
              required: true,
              message: "Please choose at least one category !",
            },
          ]}
        >
          <Select>
            <Select.Option value="Smartphone">Smartphone</Select.Option>
            <Select.Option value="2">Category 2</Select.Option>
            <Select.Option value="3">Category 3</Select.Option>
          </Select>
        </Form.Item>

        {/* <Button type="primary" htmlType="submit">
          Create
        </Button> */}
      </Form>
    </Spin>
  );
};
export default CreateProductPage;
