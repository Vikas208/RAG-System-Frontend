import "./assets/base.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Cookies from "js-cookie";
import { COOKIES_STORAGE_KEYS } from "./config/constant";


const app = createApp(App);

app.use(router);

// Add your condition before mounting
router.isReady().then(() => {
  // Example condition
  let shouldRedirectToUpload: boolean = true;

  // TODO: Check previous session exists or not in cookies

  if (Cookies.get(COOKIES_STORAGE_KEYS.session_token)) {
    shouldRedirectToUpload = false;
  }

  if (shouldRedirectToUpload) {
    router.push("/upload"); // Redirect to /upload
  } else {
    router.push("/chat"); // Redirect to /chat
  }

  // Mount the app after the routing decision
  app.mount("#app");
});
