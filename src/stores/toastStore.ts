import { create } from "zustand";

interface ToastProps {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  duration?: number;
}

interface ToastStoreProps {
  toastList: ToastProps[];
  setToastList: (toastList: ToastProps[]) => void;
  addToast: (toast: Omit<ToastProps, "id">) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStoreProps>((set) => ({
  toastList: [],
  setToastList: (toastList: ToastProps[]) => set({ toastList }),
  addToast: (toast: Omit<ToastProps, "id">) =>
    set((state) => ({
      toastList: [...state.toastList, { ...toast, id: generateToastId() }],
    })),
  removeToast: (id: string) =>
    set((state) => ({
      toastList: state.toastList.filter((toast) => toast.id !== id),
    })),
}));

function generateToastId() {
  return `${Math.random().toString(36).substring(2, 15)}_${Date.now().toString(
    36
  )}`;
}
