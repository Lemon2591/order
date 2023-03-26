import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Input, message, Select } from "antd";
import Loading from "../Fearture/Loading";
import axios from "axios"
import { getData } from "../serviceApi"


const Admin = () => {
    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ảnh sản phẩm",
            dataIndex: "",
            key: "img",
            render: (e) => (
                <div style={{ width: 100, height: 100 }}>
                    <img style={{ width: "100%" }} src={e?.img} alt="" />
                </div>
            ),
        },
        {
            title: "Mã sản phẩm",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Trạng thái",
            dataIndex: "",
            key: "status",
            render: (e) => (
                <Tag key={e.key} color={e.status === "Còn hàng" ? "blue" : "red"}>
                    {e?.status}
                </Tag>
            ),
        },
        {
            title: "Action",
            dataIndex: "",
            key: "status",
            render: (e) => (
                <div>
                    <p style={{ color: "#cf1322", cursor: "pointer" }} onClick={() => handleDelete(e)}>Xoá </p>
                    <p style={{ color: "#0958d9", cursor: "pointer" }} onClick={() => handleRepair(e)}>Sửa </p>
                </div>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [isRe, setIsRe] = useState(false)
    const [id, setId] = useState(0)

    const [addData, setAddData] = useState({
        name: "",
        img: "",
        code: "",
        cost: 0,
        status: "Còn hàng",
    });

    useEffect(() => {
        setIsLoading(true)
        setTimeout(async () => {
            try {
                setData(await getData())
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                message.error("Có lỗi xảy ra")
            }
        }, 500);
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (!isRe) {
            if (addData.code.trim() === "" || addData.name.trim() === "" || addData.img.trim() === "" || addData.cost === 0) {
                message.error("Vui lòng nhập đầy đủ thông tin")
            } else {
                setIsLoading(true)
                setTimeout(async () => {
                    try {
                        await axios.post("http://localhost:8000/product", addData)
                        setData(await getData())
                        setIsLoading(false)
                        setIsModalOpen(false)
                        setAddData({
                            name: "",
                            img: "",
                            code: "",
                            cost: 0,
                            status: "Còn hàng",
                        })
                    } catch (error) {
                        setIsLoading(false)
                        message.error("Có lỗi xảy ra")
                    }
                }, 500)
            }
        } else {
            if (addData.code.trim() === "" || addData.name.trim() === "" || addData.img.trim() === "" || addData.cost === 0) {
                message.error("Vui lòng nhập đầy đủ thông tin")
            } else {
                setIsLoading(true)
                setTimeout(async () => {
                    try {
                        await axios.put(`http://localhost:8000/product/${id}`, addData)
                        setData(await getData())
                        setIsLoading(false)
                        setIsModalOpen(false)
                        setIsRe(false)
                        setAddData({
                            name: "",
                            img: "",
                            code: "",
                            cost: 0,
                            status: "Còn hàng",
                        })
                    } catch (error) {
                        setIsLoading(false)
                        message.error("Có lỗi xảy ra")
                    }
                }, 500)
            }
        }
    };

    const handleCancel = () => {
        setIsRe(false)
        setIsModalOpen(false);
        setAddData({
            name: "",
            img: "",
            code: "",
            cost: 0,
            status: "Còn hàng",
        })
    };

    const handleDelete = (data) => {
        setIsLoading(true)
        setTimeout(async () => {
            try {
                await axios.delete(`http://localhost:8000/product/${data.id}`)
                setData(await getData())
                setIsLoading(false)
                setIsModalOpen(false)
            } catch (error) {
                setIsLoading(false)
                message.error("Có lỗi xảy ra")
            }
        }, 500)
    }

    const handleRepair = (data) => {
        setIsRe(true)
        setIsModalOpen(true)
        setId(data.id)
        setAddData({
            name: data.name,
            img: data.img,
            code: data.code,
            cost: data.cost,
            status: data.status,
        })
    }

    return (
        <>
            {isLoading ? <Loading /> : null}
            <Modal
                title="Thêm sản phẩm"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input
                    value={addData.name}
                    style={{ margin: "20px 0" }}
                    placeholder="Nhập tên sản phẩm..."
                    onChange={(e) => {
                        setAddData((pre) => {
                            return { ...pre, name: e.target.value };
                        });
                    }}
                />
                <Input
                    value={addData.img}
                    style={{ margin: "20px 0" }}
                    placeholder="Dán link ảnh sản phẩm..."
                    onChange={(e) => {
                        setAddData((pre) => {
                            return { ...pre, img: e.target.value };
                        });
                    }}
                />
                <Input style={{ margin: "20px 0" }} placeholder="Nhập giá tiền..."
                    value={addData.cost === 0 ? "" : addData.cost}
                    type="number"
                    onChange={(e) => {
                        setAddData((pre) => {
                            return { ...pre, cost: Number(e.target.value) };
                        });
                    }} />
                <Input style={{ margin: "20px 0" }} placeholder="Nhập mã sản phẩm..."
                    value={addData.code}
                    onChange={(e) => {
                        setAddData((pre) => {
                            return { ...pre, code: e.target.value.toLocaleUpperCase() };
                        });
                    }} />
                {!isRe ? <Input
                    value={addData.status}
                    style={{ margin: "20px 0" }}
                    disabled
                    defaultValue={addData?.status}
                    placeholder="Còn hàng"

                /> :
                    <Select
                        placeholder="Trạng thái"
                        defaultValue={addData.status}
                        style={{ width: "100%" }}
                        options={[
                            {
                                value: 'Còn hàng',
                                label: 'Còn hàng',
                            },
                            {
                                value: 'Hết hàng',
                                label: 'Hết hàng',
                            },
                        ]}
                        onChange={(e) => {
                            setAddData((pre) => {
                                return { ...pre, status: e };
                            });
                        }}
                    />}
            </Modal>
            <div className="admin-container">
                <div className="admin-content">
                    <div style={{ margin: "25px 0" }}>
                        <Button type="primary" onClick={showModal}>
                            Thêm sản phẩm
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
        </>
    );
};

export default Admin;
