import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Modal } from 'antd';
import Login from "./page/LoginScreen/LoginScreen";
import Register from "./page/RegisterScreen/RegisterScreen";
import LandingPage from "./page/LandingPage";
import Product from "./components/Product/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
const { Content, Footer } = Layout;
function App() {
  return (
    <BrowserRouter>
      <Layout className="layout" id="components-layout-demo-top">
        <Header>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>FLASH SALE</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="site-layout-content">
            {/* <Login /> */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/flashsale" element={<Product />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by Linh Dang</Footer>
      </Layout>
    </BrowserRouter>

  );
}

export default App;
