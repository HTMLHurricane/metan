import { Breadcrumb, Layout, theme } from "antd";
import { Navigation } from "./Navigation";
import { HeaderLayout } from "./Header";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const breadcrumbItems = [
  { label: "Главная", path: "/" },
  { label: "Машины", path: "/cars" },
  { label: "Цвета", path: "/colors" },
  { label: "Водители", path: "/drivers" },
  { label: "Языки", path: "/language" },
  { label: "Цены", path: "/prices" },
  { label: "Регионы", path: "/regions" },
  { label: "Маршруты", path: "/routes" },
];

const MainLayout = () => {
  const { pathname } = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navigation />
      <Layout>
        <HeaderLayout />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            items={breadcrumbItems
              .filter((route) => pathname.includes(route.path.toLowerCase()))
              .map((item) => ({
                title: <Link to={item.path}>{item.label}</Link>,
              }))}
            style={{ margin: "16px 0" }}
          />
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
