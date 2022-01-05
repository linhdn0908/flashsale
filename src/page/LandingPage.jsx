import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const LandingPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      <div style={{ textAlign: "center", fontWeight: 500, fontSize: 24 }}>
        Welcome To MAGESTORE
      </div>
      <div style={{ textAlign: "center", fontWeight: 500, fontSize: 24 }}>
        {userInfo ? (
          <>
            <div style={{ fontWeight: 700 }}>Hi, {userInfo.name}</div>
            <Link to="/flashsale">
              <Button style={{ marginRight: 5 }}>
                Join To Flash Sale Now !
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">
              <Button style={{ marginRight: 5 }}>Register</Button>
            </Link>
            <Link to="/login">
              <Button type="primary">Login</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
