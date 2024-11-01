import AdminLayout from "./AdminLayout";
import MainLayout from "./MainLayout";
import { isAdmin } from "../config/isAdmin";

// If the path is /admin, use the AdminLayout, otherwise use the MainLayout
export const Layout = isAdmin ? AdminLayout : MainLayout;
