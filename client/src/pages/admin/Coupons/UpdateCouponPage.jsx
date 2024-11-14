import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Spin,
} from "antd";
import moment from "moment"; // Import moment library
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Form hooks from antd library
  const navigate = useNavigate();
  const params = useParams();
  const couponId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          expirationDate: values.expirationDate.toISOString(), // Convert to ISO string before sending
        }),
      });
      if (response.ok) {
        message.success("Coupon updated successfully.");
        navigate("/admin/coupons");
      } else {
        message.error("Coupon update failed.");
      }
    } catch (error) {
      console.log("Coupon update failure:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleCoupon = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/coupons/${couponId}`);
        if (!response.ok) {
          throw new Error("Coupon not found");
        }
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            code: data.code,
            discount: data.discount,
            expirationDate: moment(data.expirationDate), // Parse expirationDate to moment object
          });
        }
      } catch (error) {
        console.log("Coupon error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleCoupon();
  }, [apiUrl, couponId, form]);
  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Coupon Code"
          name="code"
          rules={[
            {
              required: true,
              message: "Please input Coupon name!",
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
              message: "Please input Coupon rate!",
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
          Update
        </Button>
      </Form>
    </Spin>
  );
};
export default UpdateCouponPage;
