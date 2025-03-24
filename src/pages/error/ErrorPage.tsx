import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
      extra={
        <Link to="/">
          <Button type="primary">Quay lại trang chủ</Button>
        </Link>
      }
    />
  );
};

export default ErrorPage;
