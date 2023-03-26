import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import _ from "lodash";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select, Modal, Input, message, Table, Pagination } from "antd";
import Loading from "../Fearture/Loading";
import moment from "moment";
function Cart({ dataOrder }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [stateMoney, setStateMoney] = useState(0);
  const [voucher, setVoucher] = useState("");
  const [down, setDown] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVoucher, setIsVoucer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function makeid(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  const lg = 1;
  let vc = "GIAM20";

  const calc = () => {
    let money = 0;
    for (let i = 0; i < cart?.length; i++) {
      setStateMoney((money = money + cart[i]?.cost));
    }
  };

  useEffect(() => {
    test();
  }, [dataOrder.length]);

  const test = () => {
    const data = JSON.parse(localStorage.getItem("dataBuy"));
    if (data !== null) {
      setCart([...data]);
      calc();
    } else {
      setCart([]);
    }
  };

  useEffect(() => {
    calc();
  }, [cart]);

  const deleteItem = (data) => {
    if (cart?.length > 1) {
      cart.splice(data, 1);
      setCart([...cart]);
      localStorage.setItem("dataBuy", JSON.stringify(cart));
    } else {
      setCart([]);
      localStorage.removeItem("dataBuy");
      setStateMoney(0);
      setDown(0);
    }
  };

  const okDown = () => {
    if (voucher === "") {
      setIsVoucer(false);
      return setDown(0);
    }
    if (voucher === vc) {
      setIsVoucer(false);
      setDown(stateMoney * 0.2);
    } else {
      setIsVoucer(true);
    }
  };

  const showModal = async () => {
    setIsModalOpen(true);
    try {
      const res = await axios.get("http://localhost:8000/history");
      setData(res.data);
    } catch (error) {}
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Tên đơn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã Oder",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Giá trị",
      dataIndex: "cost",
      key: "cost",
      render: (e) => (
        <p>
          {e?.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
  ];
  const handleOrder = async () => {
    setIsLoading(true);
    if (cart.length === 0) {
      return message.error("Trong giỏ không có sản phẩm nào !");
    } else {
      const now = moment();
      const data = {
        name: cart[0].name,
        code: makeid(10),
        cost: Number(stateMoney - down),
        time: now.format("L"),
      };

      try {
        await axios.post("http://localhost:8000/history", data);
        localStorage.removeItem("dataBuy");
        test();
        setStateMoney(0);
        setDown(0);
        setIsLoading(false);
        message.success("Order thành công !");
      } catch (error) {
        message.error("Thất bại");
        setIsLoading(false);
      }
    }
  };

  const itemPerPage = 5;
  const lastItem = currentPage * itemPerPage;
  const beforItem = lastItem - itemPerPage;
  const curentItem = cart?.slice(beforItem, lastItem);

  return (
    <>
      {isLoading ? <Loading /> : null}
      <Modal
        width={1200}
        title="Đặt mua sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Table width={1200} columns={columns} dataSource={data} />
      </Modal>
      <div className="cart-container">
        <div className="cart-content">
          <div className="cart-header">Giỏ hàng</div>
          <div className="cart-body">
            <div className="cart-right">
              <div
                className="cart-right-header"
                style={{ marginBottom: "20px" }}
              >
                <p style={{ width: "50%", textAlign: "center" }}>
                  Tên sản phẩm
                </p>
                <p style={{ width: "15%", textAlign: "center" }}>Đơn giá </p>
                {/* <p style={{ width: "15%", textAlign: "center" }}>Thành tiền</p> */}
                <i
                  style={{
                    width: "5%",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCart([]);
                    setStateMoney(0);
                    localStorage.removeItem("dataBuy");
                  }}
                >
                  <AiOutlineDelete />
                </i>
                {/* <p>Tổng sản phẩm

                                </p> */}
              </div>
              <div style={{ height: "480px" }}>
                {curentItem &&
                  curentItem?.map((data, index) => {
                    return (
                      <div
                        className="cart-right-body"
                        style={{ alignItems: "center" }}
                        key={index}
                      >
                        <div
                          className="cart-img"
                          style={{
                            width: "15%",
                            display: "flex",
                            justifyContent: "center",
                            height: "60px",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <img src={data.img} alt="" />
                          </div>
                        </div>
                        <p style={{ width: "35%", textAlign: "left" }}>
                          {data.name}
                        </p>
                        <p
                          style={{
                            width: "15%",
                            fontWeight: "600",
                            textAlign: "center",
                          }}
                        >
                          {data?.cost?.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                        {/* <p
                        style={{
                          width: "15%",
                          fontWeight: "600",
                          color: "#e00",
                          textAlign: "center",
                        }}
                      >
                        {Number(data?.cost * lg).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p> */}
                        <i
                          style={{
                            width: "5%",
                            cursor: "pointer",
                            textAlign: "center",
                          }}
                          onClick={() => {
                            deleteItem(index);
                          }}
                        >
                          <AiOutlineDelete />
                        </i>
                      </div>
                    );
                  })}
              </div>
              {cart.length >= 5 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px 0",
                  }}
                >
                  {console.log(cart.length)}
                  <Pagination
                    pageSize={itemPerPage}
                    defaultCurrent={1}
                    total={cart?.length > 0 ? cart?.length : 50}
                    onChange={(e) => {
                      setCurrentPage(e);
                    }}
                  />
                  ;
                </div>
              ) : null}
            </div>
            <div className="cart-left">
              <div className="cart-left-header">
                <div className="voucer">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá..."
                    onChange={(e) => setVoucher(e.target.value.trim())}
                    value={voucher}
                  />
                  <button onClick={okDown}>Áp dụng</button>
                </div>
              </div>
              {isVoucher ? (
                <span
                  style={{
                    fontSize: "12px",
                    color: "#e00",
                    textAlign: "end",
                    display: "block",
                  }}
                >
                  Mã giảm giá không đúng hoặc hết hạn !
                </span>
              ) : null}
              <div className="cart-left-body" style={{ marginTop: "20px" }}>
                <div className="calc">
                  <p>Tạm tính:</p>
                  <p>
                    {stateMoney.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="down">
                  <p>Giảm giá:</p>
                  <p style={{ fontWeight: "600" }}>
                    {down.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="total">
                  <p>Thành tiền:</p>
                  <p style={{ fontWeight: "600", color: "#e00" }}>
                    {(stateMoney - down).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="buy" onClick={handleOrder}>
                  <button>Order</button>
                </div>
                <div
                  style={{ fontSize: "18px", margin: "20px 50px 50px 50px" }}
                  onClick={showModal}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Lịch sử Order
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
