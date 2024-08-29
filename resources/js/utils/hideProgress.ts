import NProgress from "nprogress";
import { router } from "@inertiajs/react";

const hideProgress = () => {
   router.on("start", () => NProgress.remove());
   router.on("finish", () => NProgress.remove());
};

export default hideProgress;
