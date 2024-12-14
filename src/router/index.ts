import { createRouter, createWebHistory } from "vue-router";
import Upload from "@/components/Upload/Upload.vue";
import Chat from "@/components/Chat/chat.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/upload",
      component: Upload,
    },
    {
      path: "/chat",
      component: Chat,
    },
  ],
});

export default router;
