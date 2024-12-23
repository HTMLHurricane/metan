import { useGetGasStationsComment } from "@/utils/api/comment/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Typography } from "antd";
import dayjs from "dayjs";
import { VscSend } from "react-icons/vsc";

const { Text } = Typography;

export const Comments = () => {
  const { id } = useParams();
  const { data } = useGetGasStationsComment(id);
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-5">
      <div className="bg-slate-500 fixed top-0 left-0 w-full p-2 flex justify-between items-center">
        <Button onClick={() => navigate(-1)}>назад</Button>
      </div>
      {data?.map((item) => (
        <Card
          key={item.text + item.created_at}
          className="bg-white p-4 shadow-sm rounded-lg"
        >
          <div className="flex flex-col space-y-2">
            <Text className="font-semibold text-lg">{item.name}</Text>
            <Text className="text-gray-600">{item.text}</Text>
            <Text className="text-sm text-gray-500">
              {dayjs(item.created_at).format("DD MMM YYYY, HH:mm")}{" "}
            </Text>
          </div>
        </Card>
      ))}
      <div className="fixed bottom-0 left-0 w-full flex items-center">
        <input
          className="w-full p-2 text-xl border-b-2 focus:outline-none focus:ring-0 text-slate-700"
          placeholder="Введите комментарии"
        />
        <Button
          icon={<VscSend size={35} className="text-slate-700" />}
          type="link"
          className="-ml-10"
        />
      </div>
    </div>
  );
};
