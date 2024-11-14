import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Spin,
} from "antd";
import { useState } from "react";

const CreateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Coupon created successfully.");
        form.resetFields();
      } else {
        message.error("Coupon create failed.");
      }
    } catch (error) {
      console.log("Coupon create failure:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Coupon Code"
          name="code"
          rules={[
            {
              required: true,
              message: "Please input coupon code!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Coupon Discount Rate"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input coupon discount rate!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Coupon Expiration Date"
          name="expirationDate"
          rules={[
            {
              required: true,
              message: "Please input coupon expiration date!",
            },
          ]}
        >
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm:ss.SSS" // Desired format with date and time
            placeholder="Select date"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Spin>
  );
};
export default CreateCouponPage;
