import { useAuthDetail } from "@/utils/api/auth/api";
import { IAuthDetailPost } from "@/utils/api/auth/types";
import { Form, Input, Button } from "antd";

export const AuthDetails = () => {
  const [form] = Form.useForm();
  const isLoading = false;
  const { mutate: authDetail } = useAuthDetail();
  const onFinish = (data: IAuthDetailPost) => {
    authDetail(data);
    localStorage.setItem("name", data.name);
  };

  return (
    <Form
      form={form}
      className="min-h-screen flex flex-col justify-center items-center bg-[#333333]"
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
        <Input className="text-slate-100 bg-[#333333] text-2xl border-slate-100 hover:border-slate-100 hover:!bg-[#333333] active:!bg-[#333333] " />
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
          placeholder="95000AAA"
          className="text-slate-100 bg-[#333333] text-2xl border-slate-100 hover:border-slate-100 hover:!bg-[#333333] active:!bg-[#333333] "
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          className="text-slate-100 text-2xl bg-[#333333] hover:!text-slate-100 hover:!bg-[#333333] hover:!border-slate-100 px-10 py-5 focus:outline-none focus:ring-0 focus:shadow-none active:!bg-[#333333] active:text-slate-100"
          loading={isLoading}
        >
          отправить
        </Button>
      </Form.Item>
    </Form>
  );
};
