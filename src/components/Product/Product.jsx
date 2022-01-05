import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function Product(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  let navigate = useNavigate();
  const { userInfo } = userLogin;
  useEffect(() => {
    dispatch(listProducts());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate]);

  const showModal = (productId) => {
    debugger;
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      {loading && <Loading />}
      {products &&
        products.map((product) => (
          <div className="product-container">
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
          </div>
        ))}
      <Modal
        title="Order Detail"
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default Product;
