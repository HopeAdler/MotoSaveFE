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
      subTitle="Not found this page."
      extra={
        <Button type="primary" onClick={handleGoBack}>
          Trở lại trang trước
        </Button>}
    />
  );
};

export default ErrorPage;