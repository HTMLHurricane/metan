import { useAuthDetail } from "@/utils/api/auth/api";
import { IAuthDetailPost } from "@/utils/api/auth/types";
import { Form, Input, Button } from "antd";

export const AuthDetails = () => {
  const [form] = Form.useForm();
  const isLoading = false;
  const { mutate: authDetail, isError, error } = useAuthDetail();
  const onFinish = (data: IAuthDetailPost) => authDetail(data);

  return (
    <Form
      form={form}
      className="min-h-screen flex flex-col justify-center items-center"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Ваше имя"
        className="w-[200px]"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваше имя!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="number"
        label="Номер машины"
        className="w-[200px]"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите номер машины!",
          },
          {
            len: 8,
            message: "Номер машины должен содержать 8 символов!",
          },
        ]}
      >
        <Input placeholder="xx xxxxxx" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          отправить
        </Button>
      </Form.Item>
      {isError && <span className="error">{error?.message}</span>}
    </Form>
  );
};
