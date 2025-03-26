import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const nav = useNavigate();
  const handleGoBack = () => {
    nav(-1)
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
      extra={
        <Button type="primary"
          onClick={handleGoBack}>
          Quay lại trang trước
        </Button>
      }
    />
  );
};

export default ErrorPage;
