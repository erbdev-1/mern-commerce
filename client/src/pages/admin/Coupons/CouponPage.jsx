import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Table columns
  const columns = [
    {
      title: "Coupon Code",
      dataIndex: "code",
      key: "code",
      render: (code) => <b>{code}</b>,
    },
    {
      title: "Discount Rate",
      dataIndex: "discount",
      key: "discount",
      render: (text) => <span>% {text}</span>,
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
            title="Delete this Coupon?"
            description="Are you sure you want to delete this Coupon?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCoupon(record._id)}
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
      const response = await fetch(`${apiUrl}/coupons`);
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
  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(`${apiUrl}/coupons/${couponId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Coupon deleted successfully.");
        fetchCategories();
      } else {
        message.error("Coupon delete failed.");
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
export default CouponPage;
