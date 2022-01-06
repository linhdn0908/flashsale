import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import {
  addOrderQueue,
  getOrderStatusByJobID,
} from "../../actions/orderAction";
import Loading from "../../components/Loading";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

function FlashSalePage(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const productList = useSelector((state) => state.productList);
  const orders = useSelector((state) => state.orders);
  const { loading, error, products } = productList;
  const { job_id, job_status, order_id, existOrder } = orders;
  const [isProcessing, setIsProcessing] = useState(false);

  let navigate = useNavigate();
  const { userInfo } = userLogin;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (job_status && job_status !== "10") {
        clearInterval(intervalId);
      }
      if (job_id) dispatch(getOrderStatusByJobID(job_id));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch, job_id, job_status]);

  useEffect(() => {
    dispatch(listProducts());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate, job_status, existOrder]);

  const handleAddOrderQueue = (productId) => {
    setIsProcessing(true);
    dispatch(addOrderQueue(userInfo._id, productId));
  };

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
                <Button
                  onClick={() => handleAddOrderQueue(product.product_id)}
                  disabled={product.quantity === 0}
                >
                  {product.quantity === 0 ? "Sold out" : "Buy Now"}
                </Button>
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
              {existOrder ? (
                <div>You already bought 1 product in this deal</div>
              ) : !job_status || job_status === "10" ? (
                <>
                  <div
                    style={{
                      marginBottom: 30,
                      fontSize: 20,
                      fontWeight: 500,
                    }}
                  >
                    Buying your product...
                  </div>
                  <div>{`Your current QueueID #${job_id}`}</div>
                  <Loading size={50} />
                </>
              ) : null}
              {job_status === "1" ? (
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
                  <div
                    style={{ fontSize: 14 }}
                  >{`Order number #${order_id}`}</div>
                </div>
              ) : job_status === "0" ? (
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
              ) : null}

              {/* <Loading size={50} /> */}

              {(existOrder || (job_status && job_status !== "10")) && (
                <Button
                  type="default"
                  onClick={() => setIsProcessing(false)}
                  style={{ marginTop: 10 }}
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        ))}
    </>
  );
}

export default FlashSalePage;
