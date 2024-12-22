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
      className="min-h-screen flex flex-col justify-center items-center pl-20"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="phone_number"
        label="Номер телефона"
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
          className="text-2xl w-[250px]"
          onChange={handlePhoneChange}
        />
      </Form.Item>
      {isError && <span className="error">{error?.message}</span>}
    </Form>
  );
};

export default LoginPage;
