import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const UpdateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Form hooks from antd library
  const params = useParams();
  const categoryId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Category updated successfully.");
      } else {
        message.error("Category update failed.");
      }
    } catch (error) {
      console.log("Category update failure:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/categories/${categoryId}`);
        if (!response.ok) {
          throw new Error("Category not found");
        }
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
          });
        }
      } catch (error) {
        console.log("Category error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleCategory();
  }, [apiUrl, categoryId, form]);
  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="Category Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input category name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Category Image(Link)"
        name="img"
        rules={[
          {
            required: true,
            message: "Please input category image link!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Update
      </Button>
    </Form>
  );
};
export default UpdateCategoryPage;
