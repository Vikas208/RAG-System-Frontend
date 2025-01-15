<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div class="relative w-2/3 max-w-lg bg-yellow-200 border-4 border-black p-4 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <!-- Loading Text with Animated Ellipsis -->
        <span class="font-bold text-black text-4xl uppercase tracking-widest transform scale-110 loading-text">
          Loading
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoadingIndicator",
  };
  </script>
  
  <style scoped>
  /* Neo-Brutalism inspired text styling */
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
  
  * {
    font-family: 'Anton', sans-serif;
  }
  
  /* Animation for Loading text */
  .loading-text {
    position: relative;
  }
  
  .loading-text::after {
    content: '.';
    position: absolute;
    top: 0;
    animation: blink 1.5s infinite steps(1);
  }
  
  @keyframes blink {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
    100% {
      content: '.';
    }
  }
  </style>
  