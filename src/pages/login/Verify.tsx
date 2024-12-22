import { useVerifyMutation } from "@/utils/api/auth/api";
import { IVerifyPost } from "@/utils/api/auth/types";
import { Form } from "antd";
import MaskedInput from "antd-mask-input";
import { useEffect } from "react";

export const Verify = () => {
  const [form] = Form.useForm();
  const { mutate: verify, isError, error } = useVerifyMutation();
  
  useEffect(() => {
    const phoneNumber = localStorage.getItem("phone_number");
    if (phoneNumber) {
      form.setFieldsValue({ phone_number: phoneNumber });
    }
  }, [form]);

  const onFinish = (data: IVerifyPost) => verify(data);

  const handleCodeChange = (e: any) => {
    const code = e.unmaskedValue;
    if (code.length === 4) {
      form.submit();
    }
  };

  return (
    <Form
      form={form}
      className="min-h-screen flex flex-col justify-center items-center pl-28"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item name="phone_number" className="hidden" />
      <Form.Item
        name="code"
        label="Код из смс"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите код из смс!",
          },
        ]}
      >
        <MaskedInput
          mask={"0 0 0 0"}
          className="text-3xl w-[120px] border-none"
          onChange={handleCodeChange}
        />
      </Form.Item>
      {isError && <span className="error">{error?.message}</span>}
    </Form>
  );
};
