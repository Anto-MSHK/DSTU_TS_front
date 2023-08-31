import { Breadcrumb, Layout, Space, theme } from "antd";
import React, { FC } from "react";
import { Head } from "./Head";
import { Nav } from "./Nav";
import { data } from "../app/dataExample";
import { useLocation } from "react-router-dom";
import useScreenWidth from "../hooks/useScreenSize";

const { Header, Content, Footer, Sider } = Layout;

interface MainLayoutI {
  children: any;
  withNav?: boolean;
  withBacking?: boolean;
  contentStyle?: React.CSSProperties;
  layoutStyle?: React.CSSProperties;
}
export const MainLayout: FC<MainLayoutI> = ({
  children,
  withNav = false,
  withBacking = false,
  contentStyle,
  layoutStyle,
}) => {
  const { token } = theme.useToken();
  const style = contentStyle || { padding: "0 30px 0 30px" };
  const location = useLocation();
  const widthSize = useScreenWidth();
  const mobileWidth = 600;
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout style={{ minHeight: "100vh", height: "fit-content" }}>
        <Head />
        <Content style={style}>
          <div style={{}} />
          <Layout
            style={
              layoutStyle || {
                padding: widthSize > mobileWidth ? "20px 20px" : "0px",
                borderRadius: 10,
              }
            }
          >
            {withNav && <Nav />}
            <Content>{children}</Content>
          </Layout>
        </Content>
        {!location.pathname.includes("quiz") && (
          <Footer style={{ textAlign: "center" }}>Created by Random()</Footer>
        )}
      </Layout>
    </Space>
  );
};
