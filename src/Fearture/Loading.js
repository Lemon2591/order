
import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);

function Loading() {
    return (
        <div className="spin">
            <Spin indicator={antIcon} />
        </div>
    );
}

export default Loading;