import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  FreeMode,
  Mousewheel,
  Keyboard,
} from "swiper";
import { getSlide, getData } from "../serviceApi";
import Loading from "../Fearture/Loading";
import { Select, message } from "antd";
import Cart from "./Cart";
function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState([]);
  const [product, setProduct] = useState([]);
  const [scrollPosition, setPosition] = useState(0);
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState(0);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);

  const dataUser = JSON.parse(localStorage.getItem("userInfo"));

  function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    return str;
  }
  useEffect(() => {
    setIsLoading(true);
    setTimeout(async () => {
      const data = await getSlide();
      setService(data);
      const dataProduct = await getData();
      setProduct(dataProduct);
      setData(dataProduct);
      setIsLoading(false);
    }, 500);
  }, []);

  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  const handleBuy = (data) => {
    if (data.status === "Hết hàng") {
      return message.error("Sản phẩm hiện đang hết hàng !");
    } else {
      setOrder((pre) => {
        return [...pre, data];
      });
      const dataArr = [data];
      const datas = JSON.parse(localStorage.getItem("dataBuy"));

      if (datas === null) {
        localStorage.setItem("dataBuy", JSON.stringify(dataArr));
        setCart(1);
      } else {
        datas.push(data);
        setCart(datas?.length);
        localStorage.setItem("dataBuy", JSON.stringify(datas));
      }
    }
  };

  useEffect(() => {
    const datas = JSON.parse(localStorage.getItem("dataBuy"));
    if (datas !== null) {
      setCart(datas?.length);
    }
  }, []);

  const handleFilter = (data) => {
    if (data === 1) {
      const test = product?.sort((a, b) => a.cost - b.cost);
      setProduct([...test]);
    } else {
      const test = product?.sort((a, b) => b.cost - a.cost);
      setProduct([...test]);
    }
  };

  useEffect(() => {
    const dataSearch = removeVietnameseTones(search);
    if (search !== "") {
      const a = product?.filter((data) =>
        dataSearch
          ? removeVietnameseTones(data.name)
              .toLocaleLowerCase()
              .includes(dataSearch.toLocaleLowerCase())
          : data
      );
      setProduct([...a]);
    } else {
      setProduct([...data]);
    }
  }, [search]);

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="home-container">
        <div className="home-content">
          <div className="home-header">
            <div className="home-header-container">
              <div
                className="home-header-content"
                style={
                  scrollPosition > 800 ? { color: "#000" } : { color: "#fff" }
                }
              >
                <div className="home-header-logo">
                  <img
                    src="https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/mybayut-logo-new-small2x.png"
                    alt=""
                  />
                </div>
                <div className="home-header-search">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setSearch(e.target.value.trim())}
                  />
                  {/* <button>
                    <i><AiOutlineSearch /></i>
                  </button> */}
                </div>
                <div className="home-header-cart">
                  {/* <div
                    className="div"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/cart")}
                  >
                    <i>
                      <AiOutlineShoppingCart />
                    </i>
                  </div> */}
                </div>
                <div className="home-header-login">
                  <div className="login">
                    <p>Xin chào: {dataUser?.userName}</p>
                  </div>
                </div>
                <div
                  className="home-header-login"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  <div className="login">
                    <p>Đăng xuất</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-body">
            <div className="home-body-container">
              <div className="home-body-content">
                <h1>Sản phẩm </h1>
                <div className="filter" style={{ margin: "50px 0" }}>
                  <Select
                    placeholder="Sắp xếp sản phẩm..."
                    style={{ width: "30%" }}
                    onChange={(data) => handleFilter(data)}
                    options={[
                      { value: 1, label: "Thấp đến Cao" },
                      { value: 2, label: "Cao đến Thấp" },
                    ]}
                  />
                </div>
                <div className="home-body-items">
                  {product?.map((data, index) => {
                    return (
                      <div className="home-body-item" key={index}>
                        <div className="img-item">
                          <img src={data.img} alt="" />
                        </div>
                        <div className="code-item">
                          <span>MÃ: {data.code}</span>
                        </div>
                        <div className="name-item">
                          <span>{data.name}</span>
                        </div>
                        <div className="cost-item">
                          <span>
                            {Number(data.cost).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                        <div className="status-item">
                          <span
                            style={
                              data.status === "Còn hàng"
                                ? { color: "#2cc067" }
                                : { color: "#cf1322" }
                            }
                          >
                            {data.status}
                          </span>
                        </div>
                        <div className="buy-btn">
                          <button onClick={() => handleBuy(data)}>Order</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Cart dataOrder={order} setOrder={setOrder} />
            </div>
          </div>
          {/* <div className="home-slider">
            <Swiper
              cssMode={true}
              mousewheel={true}
              keyboard={true}
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {service &&
                service?.map((data, index) => {
                  return (
                    <SwiperSlide>
                      <div className="img-slider" key={index}>
                        <img src={data.img} alt=""></img>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Home;
