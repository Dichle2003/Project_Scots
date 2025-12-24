import { Spin } from "antd";

const FullScreenLoading = ({ visible }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/25 backdrop-blur-[2px]">
            <Spin size="large" />
        </div>
    );
};

export default FullScreenLoading;
