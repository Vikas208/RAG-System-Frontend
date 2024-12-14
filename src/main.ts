import "./assets/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Cookies from "js-cookie";
import ProgressBar from "./components/Loaders/ProgressBar.vue";

const app = createApp(App);

app.component("progress-bar", ProgressBar);

app.use(createPinia());
app.use(router);

// Add your condition before mounting
router.isReady().then(() => {
  // Example condition
  let shouldRedirectToUpload: boolean = true;

  // TODO: Check previous session exists or not in cookies

  if (Cookies.get("session_id")) {
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
