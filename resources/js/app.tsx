import "./bootstrap";
import "../css/app.css";
import "nprogress/nprogress.css";
import "simplebar-react/dist/simplebar.min.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "./context/AppContext";
import { router } from "@inertiajs/react";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });
router.on("start", () => NProgress.start());
router.on("finish", () => NProgress.done());

createInertiaApp({
   title: (title) => `${title}`,
   resolve: (name) =>
      resolvePageComponent(
         `./Pages/${name}.tsx`,
         import.meta.glob("./Pages/**/*.tsx")
      ),
   setup({ el, App, props }) {
      const root = createRoot(el);

      root.render(
         <ThemeProvider>
            <AppContextProvider>
               <App {...props} />
            </AppContextProvider>

            <Toaster
               position="top-right"
               containerClassName="mt-[90px] overflow-hidden"
               toastOptions={{
                  duration: 5000,
                  className: "mt-6 mr-2",
                  style: { padding: "12px 16px", fontWeight: 500 },
               }}
            />
         </ThemeProvider>
      );
   },
   progress: false,
   // progress: {
   //    color: "#4B5563",
   // },
});
