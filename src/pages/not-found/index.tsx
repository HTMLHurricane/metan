import { useEffect } from "react";
import { Button, Result, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location.pathname = "/notfound";
  }, []);

  return (
    <>
      <Result
        status='404'
        title='404'
        subTitle='Извините, страница, которую вы посетили, удалена или не существует.'
        extra={
          <Space>
            <Button onClick={() => navigate(-1)} type='primary'>
              Назад
            </Button>
            <Button href='/login' type='primary'>
              Авторизация
            </Button>
          </Space>
        }
      />
    </>
  );
};
export default NotFound;
