import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  LaptopOutlined,
  RollbackOutlined,
  BarcodeOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

function getUserRole() {
  const token = localStorage.getItem("user");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);
    return decoded?.user?.role || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate(`/admin`);
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Categories",
      path: "/",
      children: [
        {
          key: "3",
          label: "Category List",
          path: "/admin/categories",
          onClick: () => {
            navigate(`/admin/categories`);
          },
        },
        {
          key: "4",
          label: "Create New Category",
          path: "/admin/categories/create",
          onClick: () => {
            navigate("/admin/categories/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: "Products",
      path: "/",
      children: [
        {
          key: "6",
          label: "Product List",
          path: "/admin/products",
          onClick: () => {
            navigate(`/admin/products`);
          },
        },
        {
          key: "7",
          label: "Create New Product",
          path: "/admin/products/create",
          onClick: () => {
            navigate("/admin/products/create");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <BarcodeOutlined />,
      label: "Coupons",
      path: "/admin/coupons",
      children: [
        {
          key: "9",
          label: "Coupon List",
          path: "/admin/coupons",
          onClick: () => {
            navigate(`/admin/coupons`);
          },
        },
        {
          key: "10",
          label: "Create New Coupon",
          path: "/admin/coupons/create",
          onClick: () => {
            navigate("/admin/coupons/create");
          },
        },
      ],
    },
    {
      key: "11",
      icon: <UserOutlined />,
      label: "Users List",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    {
      key: "12",
      icon: <ShoppingCartOutlined />,
      label: "Orders List",
      onClick: () => {
        navigate(`/admin/orders`);
      },
    },
    {
      key: "13",
      icon: <RollbackOutlined />,
      label: "Back to Main Site",
      onClick: () => {
        window.location.href = "/";
      },
    },
  ];

  if (userRole === "admin") {
    return (
      <div className="admin-layout">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider width={200} theme="dark">
            <Menu
              mode="vertical"
              style={{
                height: "100%",
              }}
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Header>
              <div
                style={{
                  color: "white",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                <h2>Admin Dashboard</h2>
              </div>
            </Header>
            <Content>
              <div
                className="site-layout-background"
                style={{
                  padding: "24px 50px",
                  minHeight: 360,
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    window.location.href = "/";
    return null;
  }
};
export default AdminLayout;
AdminLayout.propTypes = {
  children: PropTypes.node,
};
