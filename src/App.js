import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Modal } from 'antd';
import Login from "./page/LoginScreen/LoginScreen";
import Register from "./page/RegisterScreen/RegisterScreen";
import LandingPage from "./page/LandingPage";
import FlashSalePage from "./page/FlashSalePage/FlashSalePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
const { Content, Footer } = Layout;
function App() {
  return (
    <BrowserRouter>
      <Layout className="layout" id="components-layout-demo-top">
        <Header>
        </Header>
        <Content>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>FLASH SALE</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="site-layout-content">
            {/* <Login /> */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/flashsale" element={<FlashSalePage />} />
            </Routes>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Created by Linh Dang</Footer> */}
      </Layout>
    </BrowserRouter>

  );
}

export default App;
