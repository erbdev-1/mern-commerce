import { Button, Form, Input, InputNumber, message, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Data retrieval failed.");
        }
      } catch (error) {
        console.log("Data error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  const onFinish = async (values) => {
    console.log(values);
    const imgLinks = values.img.split("\n").filter((link) => link.trim());
    const colors = values.colors.split("\n").filter((link) => link.trim());
    const sizes = values.sizes.split("\n").filter((link) => link.trim());

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          img: imgLinks,
          price: {
            current: values.current,
            discount: values.discount,
          },
          colors,
          sizes,
        }),
      });
      if (response.ok) {
        message.success("Product created successfully.");
        form.resetFields();
      } else {
        message.error("Product create failed.");
      }
    } catch (error) {
      console.log("Product create failure:", error);
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
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
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
          label="Product Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input product description!",
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            style={{
              backgroundColor: "white",
            }}
          />
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

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Spin>
  );
};
export default CreateProductPage;
