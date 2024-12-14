<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div class="relative w-2/3 max-w-lg bg-yellow-200 border-4 border-black p-4 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <div
          class="h-6 bg-green-700 transition-all duration-500 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
        <span
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-black"
        >
          {{ Math.floor(progress) }}%
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProgressBar",
    props: {
      progress: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom animations or refinements if necessary */
  </style>
  