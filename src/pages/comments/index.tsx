import {
  useCreateComment,
  useCreateReplies,
  useGetGasStationsComment,
} from "@/utils/api/comment/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import { VscArrowLeft, VscSend } from "react-icons/vsc";
import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

export const Comments = () => {
  const { id } = useParams();
  const { data } = useGetGasStationsComment(id);
  const { mutate: createComment, isLoading } = useCreateComment();
  const { mutate: createReplies } = useCreateReplies();
  const [messageText, setMessageText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const phone = localStorage.getItem("phone_number");

  const handleSubmit = () => {
    if (id && name && phone && messageText) {
      createComment({
        gas_station_id: id,
        name: name,
        phone: phone,
        text: messageText,
      });
      setMessageText("");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (id && name && phone) {
      createReplies({
        gas_station_id: id,
        is_open: 1,
        name: name,
        phone: phone,
      });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    if (id && name && phone) {
      createReplies({
        gas_station_id: id,
        is_open: 0,
        name: name,
        phone: phone,
      });
    }
    setIsModalVisible(false);
  };

  return (
    <div className="space-y-4 p-2 bg-[#2e2e3e] min-h-screen">
      {/* Header */}
      <div className="bg-[#1e1e2e] fixed top-0 left-0 w-full p-2 flex justify-between items-center z-50">
        <Button
          onClick={() => navigate(-1)}
          type="link"
          icon={<VscArrowLeft size={25} className="text-white" />}
        />
        <RiErrorWarningLine
          size={35}
          className="text-yellow-500 cursor-pointer"
          onClick={showModal}
        />
      </div>

      {/* Модальное окно */}
      <Modal
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div
            className="flex flex-row items-center py-2 justify-between w-full"
            key="footer-container"
          >
            <Button
              type="default"
              key="close"
              onClick={handleCancel}
              className="text-xl p-5 text-red-600 font-semibold"
            >
              Закрыто
            </Button>
            <Button
              key="open"
              type="default"
              onClick={handleOk}
              className="text-xl p-5 font-semibold"
            >
              Открыто
            </Button>
          </div>,
        ]}
      >
        <div className="flex flex-col items-center space-x-2 ">
          <RiErrorWarningLine size={75} className="text-yellow-400" />
          <span className="text-xl font-semibold text-center">
            Если предоставленная информация кажется вам недостоверной, вы можете
            отправить нам отчет, нажав на соответстующий текст ниже. Если
            заправка закрыта, нажмите "закрыто", если открыта "открыто".
          </span>
        </div>
      </Modal>

      <div className="grid gap-2 py-10 pt-10">
        {data?.map((item) => (
          <div
            key={item.text + item.created_at}
            className="border-solid border-slate-700 rounded-sm px-2 py-1 flex flex-col relative shadow-sm bg-[#1e1e2e]"
          >
            <div className="font-semibold text-xl text-slate-100">
              {item.name}
            </div>
            <div className="text-slate-300 text-xl py-1">{item.text}</div>
            <div className="text-lg text-slate-500 flex justify-end">
              {dayjs(item.created_at).format("DD MMM, HH:mm")}{" "}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full flex items-center z-50 px-2 py-2 bg-[#1e1e2e]">
        <input
          className="w-full p-3 text-xl bg-[#2e2e3e] text-slate-200 rounded-sm focus:outline-none focus:ring-0"
          placeholder="Введите комментарий"
          value={messageText || ""}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <Button
          icon={<VscSend size={35} className="text-slate-200" />}
          loading={isLoading}
          type="link"
          className="-ml-10"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
