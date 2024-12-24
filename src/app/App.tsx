import { Button, Result } from "antd";
import useNetwork from "@/hooks/useNetwork";
import { Router } from "@/app/router";
import "./style/app.css";
import { useEffect } from "react";

const App = () => {
  const { isOnline: isNetwork } = useNetwork();

  useEffect(() => {
    if (window.TelegramWebApp) {
      const tg = window.TelegramWebApp;

      tg.expand();

      tg.ready();

      const user = tg.initDataUnsafe?.user;
      if (user) {
        console.log("User:", user);
      }

      // Пример изменения текста кнопки Telegram Web App
      tg.MainButton.text = "Нажми меня";
      tg.MainButton.show();
    }
  }, []);

  if (!isNetwork)
    return (
      <Result
        className="text-slate-100"
        status="404"
        title="No Internet Connection"
        subTitle="Check your Internet Connection or your network."
        extra={
          <Button href="/" type="primary">
            Try Again
          </Button>
        }
      />
    );
  else {
    return <Router />;
  }
};

export { App };
