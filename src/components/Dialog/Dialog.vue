<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
  >
    <div
      :class="['w-96 p-8 rounded-xl shadow-xl', dialogClass]"
      class="transition-transform transform scale-100"
    >
      <div class="flex justify-between items-center relative">
        <h3 class="text-2xl font-bold text-white">{{ title }}</h3>
      </div>
      <p class="text-white">{{ message }}</p>
      <button
        @click="closeDialog"
        class="text-white bg-yellow-600 hover:bg-yellow-700 rounded-full p-2 w-8 h-8 flex items-center justify-center absolute -top-2 -right-3"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ["success", "error"].includes(value);
      },
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    dialogClass() {
      return this.type === "success" ? "bg-yellow-500" : "bg-black";
    },
  },
  methods: {
    closeDialog() {
      this.$emit("update:isVisible", false);
    },
  },
};
</script>
