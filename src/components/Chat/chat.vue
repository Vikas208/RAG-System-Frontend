<template>
  <div class="min-h-screen text-black px-4 py-2 bg-yellow-50">
    <div class="mx-auto bg-yellow-50 border-4 border-black">
      <!-- Chat Header -->
      <div
        class="bg-yellow-300 text-black p-4 flex justify-between items-center border-black"
      >
        <h2 class="text-xl font-bold">RAG Chat</h2>
        <div class="flex items-center space-x-2">
          <button
            class="bg-black text-yellow-400 p-2 rounded-full border-2 border-black"
            @click="logOut"
          >
            <log-out-icon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Messages Container -->
      <div
        ref="chatContainer"
        class="h-[calc(100vh-190px)] overflow-y-auto p-4 space-y-3 border-t-4 border-black"
      >
        <MessageBubble
          v-for="(message, index) in messages"
          :key="index"
          :content="message.content"
          :is-user="message.isUser"
          :timestamp="message.timestamp"
        />
        <!-- Loader -->
        <div v-if="isLoading" class="loader">
          <div class="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div
        class="bg-yellow-300 p-4 border-t-4 border-black flex items-center space-x-2"
      >
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
          class="flex-1 p-3 bg-white text-black border-2 border-black rounded-lg focus:outline-none placeholder-black"
        />

        <button
          @click="startRecording"
          class="bg-black text-yellow-400 p-3 rounded-full border-2 border-black hover:bg-yellow-300 hover:text-black transition"
        >
          <mic-icon class="w-6 h-6" />
        </button>

        <button
          @click="sendMessage"
          class="bg-black text-yellow-400 p-3 rounded-full border-2 border-black hover:bg-yellow-300 hover:text-black transition"
          :disabled="!userInput.trim()"
        >
          <send-icon class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from "vue";
import { SendIcon, MicIcon, InfoIcon, LogOutIcon } from "lucide-vue-next";
import MessageBubble from "./ChatMessage.vue";
import Cookies from "js-cookie";
import { COOKIES_STORAGE_KEYS } from "@/config/constant";

export default {
  components: {
    SendIcon,
    MicIcon,
    InfoIcon,
    MessageBubble,
    LogOutIcon,
  },

  setup() {
    // Reactive references
    const messages = ref([]);
    const userInput = ref("");
    const chatContainer = ref(null);
    const isLoading = ref(false);

    // WebSocket reference
    const socket = ref(
      new WebSocket(
        `${import.meta.env.VITE_WEBSOCKET_URL}/${
          import.meta.env.VITE_WEBSOCKET_SUBPATH
        }/chat/${Cookies.get(COOKIES_STORAGE_KEYS.session_token)}`
      )
    );

    // Methods
    const setupWebsocketConnection = () => {
      socket.value.onmessage = (event) => {
        const data = JSON.parse(event.data);
        messages.value.push({
          content: data.message,
          isUser: false,
          timestamp: new Date(),
        });
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
        isLoading.value = false;
      };

      socket.value.onclose = () => {
        console.log("WebSocket connection closed");
      };

      socket.value.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    };

    const startRecording = () => {
      console.log("Recording started");
      // Implement actual voice recording logic here
    };

    const sendMessage = async () => {
      if (!userInput.value.trim() || !socket.value) return;

      isLoading.value = true;
      // Add user message to chat
      messages.value.push({
        content: userInput.value,
        isUser: true,
        timestamp: new Date(),
      });

      // Send message via WebSocket
      socket.value.send(
        JSON.stringify({
          type: "question",
          data: userInput.value,
        })
      );

      // Clear input and scroll chat
      userInput.value = "";
    };

    const logOut = () => {
      Cookies.remove(COOKIES_STORAGE_KEYS.session_token);
      window.location.href = "/";
    };

    // Initialize WebSocket connection
    setupWebsocketConnection();

    return {
      socket,
      messages,
      sendMessage,
      userInput,
      chatContainer,
      startRecording,
      logOut,
      isLoading
    };
  },
};
</script>

<style scoped>
/* New Brutalism Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #ffffff;
}
::-webkit-scrollbar-thumb {
  background: #000000;
  border-radius: 4px;
  border: 2px solid #ffffff;
}

/* Hover Effects */
button:hover {
  transform: scale(1.05);
}

/* Transitions */
button {
  transition: transform 0.2s ease-in-out;
}


.loader {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.loader .dots {
  display: flex;
  gap: 5px;
  margin-left: 10px;
}

.loader .dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #000;
  animation: blink 1.4s infinite;
}

.loader .dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loader .dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%, 20% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
