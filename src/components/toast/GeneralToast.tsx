// import { useEffect, useState } from "react";
// import { useToastStore } from "../../stores/toastStore";
// import "./style.css";

// export default function GeneralToast() {
//   const { toastList, removeToast } = useToastStore();

//   const [toastArray, setToastArray] = useState<string[]>([]);

//   return (
//     <div className="toast toast-top toast-end">
//       {toastList.map((toast) => (
//         <div key={toast.id} className={`alert alert-${toast.type} transition-in-toast transition-out-toast`}>
//           <span>{toast.message}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "../../stores/toastStore";

export default function GeneralToast() {
  const { toastList, removeToast } = useToastStore();

  const [toastArray, setToastArray] = useState<string[]>([]);

  useEffect(() => {
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
    <div className="toast toast-top toast-end">
      <AnimatePresence mode="popLayout">
        {toastList.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -100, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 1 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className={`alert alert-${toast.type} border-0 border-l-4 border-solid border-white`}
          >
            <span className="text-black text-sm font-medium">
              {toast.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
