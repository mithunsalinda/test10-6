import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider, App as AntdApp } from "antd";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ConfigProvider theme={{}}>
            <AntdApp message={{ maxCount: 1, duration: 2 }}>
                <App />
            </AntdApp>
        </ConfigProvider>
    </StrictMode>
);
