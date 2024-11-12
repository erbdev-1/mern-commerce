import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Table columns
  const columns = [
    {
      title: "Category Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc} alt="Image" width={100} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/categories/update/${record._id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Kullanıcıyı Sil"
            description="Kullanıcıyı silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCategory(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/categories`);
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Data retrieval failed.");
      }
    } catch (error) {
      console.log("Data error:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // Delete category
  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/categories/${categoryId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Category deleted successfully.");
        fetchCategories();
      } else {
        message.error("Category delete failed.");
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};
export default CategoryPage;
