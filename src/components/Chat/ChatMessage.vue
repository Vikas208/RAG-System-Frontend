<!-- MessageBubble.vue -->
<template name="MessageBubble">
    <div 
      class="flex w-full"
      :class="isUser ? 'justify-end' : 'justify-start'"
    >
      <div 
        class="max-w-[80%] p-3 rounded-lg text-black relative min-w-[20%]"
        :class="isUser 
          ? 'bg-yellow-400 border-2 border-black' 
          : 'bg-gray-100 border-2 border-black'"
      >
        <p>{{ content }}</p>
        <div 
          v-if="timestamp" 
          class="text-xs text-gray-600 mt-1 text-right"
        >
          {{ formattedTimestamp }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      content: {
        type: String,
        required: true
      },
      isUser: {
        type: Boolean,
        default: false
      },
      timestamp: {
        type: Date,
        default: null
      }
    },
    computed: {
      formattedTimestamp() {
        return this.timestamp 
          ? this.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          : ''
      }
    }
  }
  </script>