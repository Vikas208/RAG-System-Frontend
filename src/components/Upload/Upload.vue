<template>
  <div class="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
    <div
      class="w-full max-w-md mx-auto p-6 bg-yellow-300 border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-500 transform hover:scale-105 hover:shadow-[16px_16px_0px_rgba(0,0,0,1)]"
    >
      <form
        @dragenter.prevent="handleDragEnter"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
        class="relative"
      >
        <input
          ref="fileInput"
          type="file"
          @change="handleFileChange"
          class="hidden"
          accept=".pdf,.doc,.docx"
        />

        <div
          @click="openFileExplorer"
          @mousedown="isPressed = true"
          @mouseup="isPressed = false"
          @mouseleave="isPressed = false"
          class="w-full h-64 border-4 border-dashed border-black flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative hover:bg-yellow-400"
          :class="{
            'bg-yellow-600 scale-110 rotate-2': isDragActive,
            'bg-yellow-300': !isDragActive,
            'top-[4px] left-[4px] shadow-none': isPressed,
            'shadow-[6px_6px_0px_rgba(0,0,0,1)]': !isPressed,
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="2"
            class="mb-4 transition-transform duration-700 animate-bounce-slow"
            :class="{
              'scale-125 rotate-12': isDragActive,
              'scale-90': isPressed,
            }"
          >
            <path d="M21.2 15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
            <path d="M14 2v4a2 2 0 0 1-2 2h-4" />
            <path d="M12 2v10" />
            <path d="m9 9 3 3 3-3" />
          </svg>

          <p class="text-black text-center font-bold text-xl">
            {{
              isDragActive ? "Drop Files Now!" : "Drag, Drop or Click to Upload"
            }}
          </p>
          <p class="text-black text-sm mt-2 opacity-70">Supports:.pdf, .doc</p>
        </div>
      </form>

      <!-- Animated File List with Neo Brutalist Buttons -->
      <transition-group name="file-list" tag="ul" class="mt-4 space-y-2">
        <li
          class="flex justify-between items-center bg-black bg-opacity-10 p-3 border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] transform transition-all duration-500 hover:scale-105"
        >
          <div class="flex items-center truncate">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              class="mr-3"
            >
              <path
                d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
              />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span class="text-black truncate">{{
              file ? file.name : "No File Selected"
            }}</span>
          </div>
          <div class="space-x-2 flex">
            <button
              v-if="file"
              @click="handleUploadFile()"
              @mousedown="uploadButtonPressed = index"
              @mouseup="uploadButtonPressed = null"
              @mouseleave="uploadButtonPressed = null"
              class="relative bg-green-700 text-white px-3 py-1 border-2 border-green-900 font-bold transition-all duration-200 transform hover:bg-green-800"
              :class="{
                'top-[2px] left-[2px] shadow-[4px_4px_0px_rgba(0,0,0,1)]':
                  uploadButtonPressed !== index,
                'top-[6px] left-[6px] shadow-none':
                  uploadButtonPressed === index,
              }"
            >
              Upload
            </button>
            <button
              v-if="file"
              @click="removeFile()"
              @mousedown="removeButtonPressed = index"
              @mouseup="removeButtonPressed = null"
              @mouseleave="removeButtonPressed = null"
              class="relative bg-red-700 text-white px-3 py-1 border-2 border-red-900 font-bold transition-all duration-200 transform hover:bg-red-800"
              :class="{
                'top-[2px] left-[2px] shadow-[4px_4px_0px_rgba(0,0,0,1)]':
                  removeButtonPressed !== index,
                'top-[6px] left-[6px] shadow-none':
                  removeButtonPressed === index,
              }"
            >
              Remove
            </button>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
  <progress-bar v-if="uploading" :progress="uploadProgress" />
</template>

<script>
import ProgressBar from "@/components/Loaders/ProgressBar.vue";
export default {
  components: { ProgressBar },
  data() {
    return {
      isDragActive: false,
      file: null,
      isPressed: false,
      uploading: false,
      uploadProgress: 0,
    };
  },
  methods: {
    handleDragEnter() {
      this.isDragActive = true;
    },
    handleDragOver() {
      this.isDragActive = true;
    },
    handleDragLeave() {
      this.isDragActive = false;
    },
    handleDrop(event) {
      this.isDragActive = false;
      this.isPressed = false;
      const droppedFiles = Array.from(event.dataTransfer.files);

      if (droppedFiles.length) {
        this.file = droppedFiles[0];
      }
    },
    handleFileChange(event) {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.length) {
        this.file = selectedFiles[0];
      }

      console.log(this.file);
    },
    openFileExplorer() {
      this.$refs.fileInput.click();
    },
    removeFile() {
      this.file = null;
    },
    async handleUploadFile() {
      if (!this.file) return;

      this.uploading = true;
      this.uploadProgress = 0;

      // Simulate file upload progress
      for (let i = 0; i <= 100; i++) {
        await this.simulateProgress(i);
      }

      this.uploading = false;
      alert("File uploaded successfully!");
    },
    simulateProgress(value) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.uploadProgress = value;
          resolve();
        }, 50); // Simulate upload speed
      });
    },
  },
};
</script>

<style scoped>
.file-list-enter-active,
.file-list-leave-active {
  transition: all 0.5s ease;
}
.file-list-enter-from,
.file-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.file-list-move {
  transition: transform 0.5s ease;
}
</style>
