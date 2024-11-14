import { Button, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Table columns
  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc[0]} alt="Image" width={100} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text.current.toFixed(2)}</span>,
    },
    {
      title: "Discount",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>% {text.discount}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this category?"
            description="Are you sure you want to delete this category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProduct(record._id)}
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

  // Delete category
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/products/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Product deleted successfully.");
        setDataSource((prevProducts) => {
          return prevProducts.filter((product) => product._id !== productId);
        });
      } else {
        message.error("Product delete failed.");
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUrl}/categories`),
          fetch(`${apiUrl}/products`),
        ]);

        if (!categoriesResponse.ok || !productsResponse.ok) {
          message.error("Data retrieval failed.");
        }

        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);

        const productsWithCategory = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find(
            (item) => item._id === categoryId
          );
          return {
            ...product,
            categoryName: category?.name,
          };
        });

        setDataSource(productsWithCategory);
      } catch (error) {
        console.log("Data error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};
export default ProductPage;
