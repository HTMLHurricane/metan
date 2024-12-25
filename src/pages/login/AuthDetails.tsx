import { useAuthDetail } from "@/utils/api/auth/api";
import { useState } from "react";

export const AuthDetails = () => {
  const [name, setName] = useState<string | undefined>();
  const [number, setNumber] = useState<string | undefined>();
  const isLoading = false;
  const { mutate: authDetail } = useAuthDetail();
  const submit = () => {
    if (name && number) {
      authDetail({ name, number });
      localStorage.setItem("name", name);
    }
  };

  return (
    <div className="bg-[#1e1e2e] text-gray-200 w-full min-h-screen flex flex-col justify-center items-center p-4">
      <div className="text-2xl font-semibold mb-6 text-gray-100">
        Введите ваше имя
      </div>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name || ""}
        className="w-[200px] text-center text-2xl max-w-md px-4 py-2 mb-4 rounded-lg bg-[#2e2e3e] text-gray-200 border border-gray-600 focus:outline-none"
      />
      <div className="text-2xl font-semibold mb-6 text-gray-100">
        Номер машины
      </div>
      <input
        type="text"
        onChange={(e) => setNumber(e.target.value)}
        value={number || ""}
        className="w-[200px] text-center text-2xl max-w-md px-4 py-2 mb-4 rounded-lg bg-[#2e2e3e] text-gray-200 border border-gray-600 focus:outline-none"
      />
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
