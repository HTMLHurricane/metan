import { useLoginMutation } from "@/utils/api/auth/api";
import { useState } from "react";

const LoginPage = () => {
  const [phone, setPhone] = useState<string | undefined>("");
  const [error, setError] = useState<string | null>(null);
  const { mutate: login, isLoading } = useLoginMutation();

  const validatePhone = (value: string) => {
    // Удаляем пробелы, проверяем, что только цифры и длина равна 9
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length > 9) return cleanedValue.slice(0, 9); // Ограничиваем до 9 цифр
    return cleanedValue;
  };

  const submit = () => {
    if (!phone || phone.length !== 9) {
      setError("Номер телефона должен содержать ровно 9 цифр.");
      return;
    }
    setError(null);
    login({ phone_number: phone });
    localStorage.setItem("phone_number", phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validatedPhone = validatePhone(value);
    setPhone(validatedPhone);
  };

  return (
    <div className="bg-[#1e1e2e] text-gray-200 w-full min-h-screen flex flex-col justify-center items-center p-4">
      <div className="text-2xl font-semibold mb-6 text-gray-100">
        Введите ваш номер телефона
      </div>
      <input
        type="text"
        placeholder="880808080"
        value={phone || ""}
        onChange={handleChange}
        className="w-[200px] text-center text-2xl max-w-md px-4 py-2 mb-4 rounded-lg bg-[#2e2e3e] text-gray-200 border border-gray-600 focus:outline-none"
      />
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <button
        onClick={submit}
        disabled={isLoading}
        className={`w-[200px] px-4 py-2 text-lg font-medium rounded-lg transition-all ${
          isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 focus:ring-blue-400"
        }`}
      >
        {isLoading ? "Отправка..." : "Отправить"}
      </button>
    </div>
  );
};

export default LoginPage;
