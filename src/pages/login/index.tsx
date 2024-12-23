import { Form } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { MaskedInput } from "antd-mask-input";
import { useLoginMutation } from "@/utils/api/auth/api";
import { ILoginCredentials } from "@/utils/api/auth/types";

const LoginPage = () => {
  const [form] = Form.useForm();
  const { mutate: login, isError, error } = useLoginMutation();
  const onFinish = (data: ILoginCredentials) => login(data);
  const maskLength = 9;

  const handlePhoneChange = (e: any) => {
    const value = e.unmaskedValue;
    form.setFieldValue("phone_number", value);

    localStorage.setItem("phone_number", value);

    if (value.length === maskLength) {
      form.submit();
    }
  };

  return (
    <Form
      form={form}
      className="min-h-screen flex flex-col justify-center items-center pl-20 bg-[#181818]"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="phone_number"
        label={<span className="text-slate-100 text-xl">номер телефона</span>}
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваш номер!",
          },
        ]}
      >
        <MaskedInput
          prefix={<PhoneOutlined />}
          mask={"(00)000 00 00"}
          className="text-slate-200 text-3xl w-[250px] bg-[#333333] border-[#333333] hover:border-[#333333] hover:!bg-[#333333] active:!bg-[#333333]"
          onChange={handlePhoneChange}
        />
      </Form.Item>
      {isError && <span className="error">{error?.message}</span>}
    </Form>
  );
};

export default LoginPage;
