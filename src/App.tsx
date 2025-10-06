import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ConfigProvider } from "antd";

export default function App() {
    return (
        <ConfigProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ConfigProvider>
    );
}
