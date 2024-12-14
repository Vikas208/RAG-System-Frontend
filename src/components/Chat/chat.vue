<template>
  <div class="bg-white min-h-screen text-black px-4 py-2 bg-yellow-50">
    <div class="mx-auto bg-yellow-50 border-4 border-black">
      <!-- Chat Header -->
      <div
        class="bg-yellow-300 text-black p-4 flex justify-between items-center border-black"
      >
        <h2 class="text-xl font-bold">RAG Chat</h2>
        <div class="flex items-center space-x-2">
          <button
            class="bg-black text-yellow-400 p-2 rounded-full border-2 border-black"
          >
            <info-icon class="w-5 h-5" />
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
import { SendIcon, MicIcon, InfoIcon } from "lucide-vue-next";
import MessageBubble from "./ChatMessage.vue";

export default {
  components: {
    SendIcon,
    MicIcon,
    InfoIcon,
    MessageBubble,
  },
  setup() {
    const messages = ref([
      {
        content: "Welcome! I'm ready to help you with your documents.",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    const userInput = ref("");
    const chatContainer = ref(null);

    const sendMessage = async () => {
      if (!userInput.value.trim()) return;

      // Add user message
      messages.value.push({
        content: userInput.value,
        isUser: true,
        timestamp: new Date(),
      });

      // Simulate AI response
      await new Promise((resolve) => setTimeout(resolve, 1000));
      messages.value.push({
        content: "I'm processing your query...",
        isUser: false,
        timestamp: new Date(),
      });

      // Clear input and scroll
      userInput.value = "";
      await nextTick();
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    };

    const startRecording = () => {
      // Placeholder for voice recording functionality
      console.log("Recording started");
      // Implement actual voice recording logic here
    };

    return {
      messages,
      userInput,
      chatContainer,
      sendMessage,
      startRecording,
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
</style>
