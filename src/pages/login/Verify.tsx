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
      className="min-h-screen flex flex-col justify-center items-center pl-28 bg-[#181818]"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item name="phone_number" className="hidden" />
      <Form.Item
        name="code"
        label={<span className="text-slate-100 text-xl">Код из смс</span>}
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите код из смс!",
          },
        ]}
      >
        <MaskedInput
          mask={"0 0 0 0"}
          className="text-slate-200 text-3xl w-[120px] bg-[#333333] border-[#333333] hover:border-[#333333] hover:!bg-[#333333] active:!bg-[#333333]"
          onChange={handleCodeChange}
        />
      </Form.Item>
      {isError && <span className="error">{error?.message}</span>}
    </Form>
  );
};
