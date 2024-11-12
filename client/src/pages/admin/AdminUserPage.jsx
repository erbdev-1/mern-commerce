import { message, Table } from "antd";
import { useEffect, useState } from "react";

const AdminUserPage = () => {
  const [dataSource, setDataSource] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  console.log("API URL:", apiUrl);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
      ),
    },
  ];

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("user"); // JWT token

      const fetchUrl = `${apiUrl}/users`;
      console.log("Fetching URL:", fetchUrl);

      const response = await fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (!response.ok) {
        console.error("Error response:", responseText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = JSON.parse(responseText);
      console.log("Data:", data);
      setDataSource(data);
    } catch (error) {
      console.error("Fetch error:", error.message);
      message.error("Kullanıcı verileri alınırken hata oluştu.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
    />
  );
};

export default AdminUserPage;
