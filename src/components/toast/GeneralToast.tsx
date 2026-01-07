import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "../../stores/toastStore";

export default function GeneralToast() {
  const { toastList, removeToast } = useToastStore();

  const [toastArray, setToastArray] = useState<string[]>([]);

  useEffect(() => {
    console.log(toastList);
    toastList.forEach((toast) => {
      const activedCoolDown = toastArray.includes(toast.id);
      if (activedCoolDown) return;
      setToastArray((prev) => [...prev, toast.id]);
      setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);
    });
  }, [toastList]);

  return (
    <div className="toast toast-top toast-end z-9999">
      <AnimatePresence mode="popLayout">
        {toastList.map((toast) => {
          const bgColor =
            toast.type === "error"
              ? "bg-red-500 text-white"
              : toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "warning"
              ? "bg-yellow-500 text-black"
              : "bg-blue-500 text-white";
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -100, scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -100, scale: 1 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className={`alert ${bgColor}`}
            >
              <span className="text-md font-medium">{toast.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
