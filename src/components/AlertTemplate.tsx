import { AlertTemplateProps } from "react-alert";
import {
  FaCircleInfo,
  FaCircleCheck,
  FaCircleExclamation,
  FaXmark,
} from "react-icons/fa6";

const typeToIconMap = {
  info: <FaCircleInfo />,
  success: <FaCircleCheck />,
  error: <FaCircleExclamation />,
};

const typeToClassMap = {
  info: { bg: "bg-blue-100", text: "text-blue-800" },
  success: { bg: "bg-green-100", text: "text-green-800" },
  error: { bg: "bg-red-100", text: "text-red-800" },
};

function AlertTemplate({ style, options, message, close }: AlertTemplateProps) {
  const { type = "info" } = options;
  const icon = typeToIconMap[type];
  const { bg, text } = typeToClassMap[type];

  return (
    <div
      className={`flex items-center justify-center gap-x-4 rounded-md p-4 ${bg}`}
      style={style}
    >
      <div className={text}>{icon}</div>
      <p className={`break-all text-center ${text}`}>{message}</p>
      <button className="text-base text-black" onClick={close}>
        <FaXmark />
      </button>
    </div>
  );
}

export default AlertTemplate;
