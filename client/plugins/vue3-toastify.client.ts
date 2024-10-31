import Vue3Toastify, { toast, type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
    transition: toast.TRANSITIONS.FLIP,
  } as ToastContainerOptions);

  return {
    provide: { toast },
  };
});
