import { IToast } from "./App";

// Toast UI component
const Toast = ({
  data,
  handleClose,
}: {
  data: IToast;
  handleClose: (id: number) => void;
}) => {
  return (
    <div
      className={`toast_item p-3 text-xs rounded-md text-white w-48 relative
        ${
          data.type === "Success"
            ? "bg-green-500"
            : data.type === "Danger"
            ? "bg-red-400"
            : "bg-blue-300"
        }`}
      role="alert"
      aria-live="assertive"
    >
      {data?.content}

      {/* Close button */}
      <button
        className="absolute top-1 right-1 p-1"
        onClick={() => handleClose(data?.id)}
        aria-label="Close Toast"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
