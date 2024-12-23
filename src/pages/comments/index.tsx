import {
  useCreateComment,
  useGetGasStationsComment,
} from "@/utils/api/comment/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import dayjs from "dayjs";
import { VscArrowLeft, VscSend } from "react-icons/vsc";

export const Comments = () => {
  const { id } = useParams();
  const { data } = useGetGasStationsComment(id);
  const { mutate: createComment, isLoading } = useCreateComment();
  const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   await createComment({
  //     gas_station_id: id,
  //     name: localStorage.getItem("name"),
  //     phone: localStorage.getItem("phone_number"),
  //   });
  // };

  return (
    <div className="space-y-4 p-2 bg-[#181818] min-h-screen">
      {/* Header */}
      <div className="bg-[#242424] fixed top-0 left-0 w-full p-2 flex justify-between items-center z-50">
        <Button
          onClick={() => navigate(-1)}
          type="link"
          icon={<VscArrowLeft size={24} className="text-white" />}
        />
      </div>

      {/* Comments List */}
      <div className="grid gap-2 py-10 pt-16">
        {data?.map((item) => (
          <div
            key={item.text + item.created_at}
            className="border-solid border-slate-700 rounded-sm px-2 py-1 flex flex-col relative shadow-sm bg-[#242424]"
          >
            <div className="font-semibold text-lg text-slate-100">
              {item.name}
            </div>
            <div className="text-slate-300">{item.text}</div>
            <div className="text-xs text-slate-500 flex justify-end">
              {dayjs(item.created_at).format("DD MMM, HH:mm")}{" "}
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <div className="fixed bottom-0 left-0 w-full flex items-center z-50 px-2 py-2 bg-[#242424]">
        <input
          className="w-full p-3 text-xl bg-[#333333] text-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          placeholder="Введите комментарий"
        />
        <Button
          icon={<VscSend size={35} className="text-slate-200" />}
          loading={isLoading}
          type="link"
          className="-ml-10"
        />
      </div>
    </div>
  );
};
