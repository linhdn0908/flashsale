import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Loading from "../../components/Loading";
// import ErrorMessage from "../../components/ErrorMessage";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

function Product(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [isProcessing, setIsProcessing] = useState(false);

  let navigate = useNavigate();
  const { userInfo } = userLogin;
  useEffect(() => {
    dispatch(listProducts());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate]);

  const showModal = (productId) => {
    setIsProcessing(true);
    // setIsModalVisible(true);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };
  return (
    <>
      <div
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: 500,
          marginBottom: 30,
        }}
      >
        FLASH SALE DEALS TODAY 🔥
      </div>
      {loading && <Loading />}
      {products &&
        products.map((product) => (
          <div
            key={product._id}
            style={{ margin: "0 auto" }}
            className={`product-container ${isProcessing ? "processing" : ""}`}
          >
            <div className="product-image">
              <img src={product.img_url} alt="demo" />
            </div>
            <div className="product-detail">
              <div>
                <div className="product-detail--name">{product.name}</div>
                <div className="product-detail--price">$ {product.price}</div>
                <div className="product-detail--price">
                  In stock: {product.quantity}
                </div>
                <button onClick={() => showModal(product._id)}>Buy Now</button>
              </div>
            </div>
            <div
              className="process-order"
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                fontSize: 16,
              }}
            >
              <div style={{ marginBottom: 30, fontSize: 20, fontWeight: 500 }}>
                Buying your product...
              </div>
              <div>Your current QueueID #1</div>
              <div
                style={{
                  display: "flex",
                  height: 150,
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div>Order placed succesfully</div>
                <FiCheckCircle style={{ fontSize: 50, color: "#79e779" }} />
                <div style={{ fontSize: 14 }}>Order number #434345</div>
              </div>
              <div
                style={{
                  display: "flex",
                  height: 150,
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div>Product no longer available</div>
                <div>You just missed it.</div>
                <FiAlertCircle style={{ fontSize: 50, color: "#f93434" }} />
              </div>

              {/* <Loading size={50} /> */}

              <Button
                type="default"
                onClick={() => setIsProcessing(false)}
                style={{ marginTop: 10 }}
              >
                Close
              </Button>
            </div>
          </div>
        ))}
      {/* <Modal
        title="Order Detail"
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
    </>
  );
}

export default Product;
