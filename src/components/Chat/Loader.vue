<template>
    <div class="flex justify-center items-center w-full">
      <div class="flex space-x-2">
        <span
          v-for="n in 3"
          :key="n"
          class="w-4 h-4 bg-black rounded-full animate-bounce"
          :style="{ animationDelay: `${n * 0.2}s` }"
        ></span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Loader",
  };
  </script>
  
  <style scoped>
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .animate-bounce {
    animation: bounce 1s infinite ease-in-out;
  }
  </style>
  