import axios from "axios"
import { message } from "antd"

export const getSlide = async () => {
    try {
        const res = await axios.get("http://localhost:8000/service")
        return res.data
    } catch (error) {
        message.error("Đã có lỗi xảy ra !")
    }
}


export const getData = async () => {
    try {
        const res = await axios.get("http://localhost:8000/product")
        return res.data
    } catch (error) {
        message.error("Đã có lỗi xảy ra !")
    }
}

