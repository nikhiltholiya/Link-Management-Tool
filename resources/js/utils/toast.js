import toast from "react-hot-toast";

export const success = (message) => {
   toast.success(message, {
      style: { background: "#EBFEF9" },
      iconTheme: { primary: "#06D7A1" },
   });
};

export const warning = (message) => {
   toast(message, {
      icon: "⚠️",
      style: { background: "#FFF8E6" },
      iconTheme: { primary: "#FEBF06" },
   });
};

export const error = (message) => {
   toast.error(message, {
      style: { background: "#FEF1F4" },
      iconTheme: { primary: "#EF4770" },
   });
};
