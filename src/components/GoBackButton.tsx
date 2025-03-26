import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
export default function GoBackButton() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1)
    }
    return (
        <Button onClick={handleGoBack}
            type="primary"
            icon={<ArrowLeftOutlined />}>Trở về trước</Button>
    )
}
