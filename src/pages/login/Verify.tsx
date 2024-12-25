import { useVerifyMutation } from "@/utils/api/auth/api";
import { useState } from "react";

export const Verify = () => {
  const phone_number = localStorage.getItem("phone_number");
  const [code, setCode] = useState<string | undefined>("");
  const { mutate: verify, isLoading } = useVerifyMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) return;
    setCode(value);
    if (value.length === 4 && phone_number) {
      submit(value);
    }
  };

  const submit = (inputCode: string) => {
    if (inputCode && phone_number) {
      verify({ code: inputCode, phone_number });
    }
  };

  return (
    <div className="bg-[#1e1e2e] text-gray-200 w-full min-h-screen flex flex-col justify-center items-center p-4">
      <div className="text-2xl font-semibold mb-6 text-gray-100">
        Введите ваш код из СМС
      </div>
      <input
        type="text"
        placeholder="XXXX"
        value={code || ""}
        onChange={handleChange}
        disabled={isLoading}
        className="w-[100px] text-center text-2xl max-w-md px-4 py-2 mb-4 rounded-lg bg-[#2e2e3e] text-gray-200 border border-gray-600 focus:outline-none"
      />
      {isLoading && <div className="text-gray-500 text-lg">Проверка...</div>}
    </div>
  );
};
