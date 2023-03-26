import React, { useState } from "react";
import background from "../assets/img/bg.jpeg";
import http from "../apiClient";
import { NavLink, useNavigate } from "react-router-dom";
import { Spin, message } from "antd";

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target?.username?.value;
    const password = e.target?.password?.value;
    try {
      setIsLogin(true);
      const { data } = await http.post("/user/data/patient", {
        userName: username,
        passWord: password,
      });
      console.log(data);
      window.localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/home");
      setIsLogin(false);
    } catch (error) {
      message.error("tài khoản hoặc mật khẩu không chính xác");
      setIsLogin(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <Spin spinning={isLogin}>
          <div className="banner">
            <div className="img">
              <div className="bg-login"></div>
              <div style={{ width: "30%" }} className="form-login">
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "3.4rem",
                    margin: "4rem 0 2rem 0",
                  }}
                >
                  Fooday
                </span>
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "1.6rem",
                  }}
                >
                  Order nhanh chóng !
                </span>
                <p>Đăng nhập</p>
                <form onSubmit={handleSubmit}>
                  <div className="input">
                    <label htmlFor="">Tên tài khoản</label>
                    <input placeholder="Nhập tài khoản..." name="username" />
                  </div>
                  <div className="input">
                    <label htmlFor="">Mật khẩu</label>
                    <input
                      placeholder="Nhập mật khẩu..."
                      name="password"
                      type="password"
                    />
                  </div>

                  <div className="input" style={{ textAlign: "center" }}>
                    <button className="btn" type="submit">
                      Đăng nhập
                    </button>
                  </div>
                </form>
                <div
                  className="input"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      marginBottom: "2.5rem",
                      fontSize: "1.4rem",
                    }}
                  >
                    Bạn chưa có tài khoản ? &nbsp;
                  </p>
                  <NavLink className="login-rg" to="/register">
                    Đăng ký ngay.
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
}

export default Login;
