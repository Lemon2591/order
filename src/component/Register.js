import React, { useState } from "react";
import background from "../assets/img/bg.jpeg";
import { NavLink } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Fearture/Loading";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    confirmPassWord: "",
    email: "",
    passWord: "",
    role: "BN",
    userName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (
      data.confirmPassWord === "" ||
      data.email === "" ||
      data.passWord === "" ||
      data.userName === ""
    ) {
      message.error("Vui lòng nhập đầy đủ !");
    } else {
      if (data.passWord !== data.confirmPassWord) {
        message.error("Mật khẩu không giống nhau");
      } else {
        setIsLoading(true);
        try {
          const res = await axios.post(
            "https://alo-server.onrender.com/api/user/register/patient",
            data
          );
          setIsLoading(false);
          message.success(res.data.message);
          setTimeout(() => {
            navigate("/");
          }, 500);
        } catch (error) {
          setIsLoading(false);
          message.error(error.response.data.message);
        }
      }
    }
  };
  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="login-container">
        <div className="login-content">
          <div className="banner">
            <div className="img">
              <div className="bg-login" ></div>
              <div className="form-login" style={{ top: "5%" }}>
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "3.4rem",
                    margin: "4rem 0 2rem 0",
                  }}
                >
                  RS Computer
                </span>
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "1.6rem",
                  }}
                >
                  Mua sắm ngay !
                </span>
                <p>Đăng ký</p>
                <div className="input">
                  <label htmlFor="">Tên tài khoản</label>
                  <input
                    placeholder="Nhập tài khoản..."
                    type="text"
                    onChange={(e) => {
                      setData((pre) => {
                        return { ...pre, userName: e.target.value.trim() };
                      });
                    }}
                  />
                </div>
                <div className="input">
                  <label htmlFor="">Mật khẩu</label>
                  <input
                    placeholder="Nhập mật khẩu..."
                    type="password"
                    onChange={(e) => {
                      setData((pre) => {
                        return { ...pre, passWord: e.target.value.trim() };
                      });
                    }}
                  />
                </div>

                <div className="input">
                  <label htmlFor="">Nhập lại khẩu</label>
                  <input
                    placeholder="Nhập mật khẩu..."
                    type="password"
                    onChange={(e) => {
                      setData((pre) => {
                        return {
                          ...pre,
                          confirmPassWord: e.target.value.trim(),
                        };
                      });
                    }}
                  />
                </div>

                <div className="input">
                  <label htmlFor="">Điền email</label>
                  <input
                    placeholder="Nhập email..."
                    type="text"
                    onChange={(e) => {
                      setData((pre) => {
                        return { ...pre, email: e.target.value.trim() };
                      });
                    }}
                  />
                </div>

                <div className="input" style={{ textAlign: "center" }}>
                  <button className="btn" onClick={handleRegister}>
                    Đăng ký
                  </button>
                </div>
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
                    Bạn đã có tài khoản ? &nbsp;
                  </p>
                  <NavLink className="login-rg" to="/">
                    Đăng nhập ngay.
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;