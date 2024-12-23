import { useAuthDetail } from "@/utils/api/auth/api";
import { IAuthDetailPost } from "@/utils/api/auth/types";
import { Form, Input, Button } from "antd";

export const AuthDetails = () => {
  const [form] = Form.useForm();
  const isLoading = false;
  const { mutate: authDetail, isError, error } = useAuthDetail();
  const onFinish = (data: IAuthDetailPost) => {
    authDetail(data);
    localStorage.setItem("name", data.name);
  };

  return (
    <Form
      form={form}
      className="min-h-screen flex flex-col justify-center items-center bg-[#181818]"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label={<span className="text-slate-100 text-xl">ваше имя</span>}
        className="w-[200px]"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваше имя!",
          },
        ]}
      >
        <Input className="bg-[#333333] text-2xl border-[#333333] hover:border-[#333333] hover:!bg-[#333333] active:!bg-[#333333] text-slate-100" />
      </Form.Item>
      <Form.Item
        name="number"
        label={<span className="text-slate-100 text-xl">номер машины</span>}
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
        <Input
          placeholder="xx xxxxxx"
          className="bg-[#333333] text-2xl border-[#333333] hover:border-[#333333] hover:!bg-[#333333] active:!bg-[#333333] text-slate-100"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="link"
          htmlType="submit"
          className="text-slate-100 text-2xl hover:!text-slate-100 bg-[#333333] px-10 py-5"
          loading={isLoading}
        >
          отправить
        </Button>
      </Form.Item>
      {isError && <span className="error">{error?.message}</span>}
    </Form>
  );
};
