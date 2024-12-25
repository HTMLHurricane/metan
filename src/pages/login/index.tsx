import { Form } from "antd";
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
      className="min-h-screen flex flex-col justify-center items-center bg-[#333333]"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <span className="text-slate-100 text-xl my-5 text-center">
        Введите ваш номер телефона ниже
      </span>
      <div className="flex justify-center">
        <div className="text-3xl mr-2 pt-1 text-slate-200">+998</div>
        <Form.Item
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите ваш номер!",
            },
          ]}
        >
          <MaskedInput
            mask={"0 0 0 0 0 0 0 0 0"}
            className="text-slate-200 block text-3xl w-[250px] bg-[#333333] border-slate-100 hover:border-slate-100 hover:!bg-[#333333] active:!bg-[#333333]"
            onChange={handlePhoneChange}
          />
        </Form.Item>
      </div>
      {isError && <span className="error">{error?.message}</span>}
    </Form>
  );
};

export default LoginPage;
