<template>
    <div>
      <div v-if="isLatex" ref="latexContainer" class="latex-content"></div>
      <p v-else class="plain-text-content">{{ content }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      content: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isLatex: false,
      };
    },
    watch: {
      content: "renderContent",
    },
    mounted() {
      this.renderContent();
    },
    methods: {
      renderContent() {
        // Check if the content contains LaTeX syntax
        this.isLatex = this.containsLatex(this.content);
  
        if (this.isLatex) {
          const cleanedContent = this.content.replace(/\n/g, " ").trim();
          this.$refs.latexContainer.innerHTML = `$$${cleanedContent}$$`;
          if (window.MathJax) {
            window.MathJax.typesetPromise([this.$refs.latexContainer]);
          } else {
            console.error("MathJax is not loaded");
          }
        }
      },
      containsLatex(content) {
        // Simple check for LaTeX keywords or delimiters
        return /\\(begin|end|[a-z]+)\{/.test(content);
      },
    },
  };
  </script>
  
  <style scoped>
  .latex-content {
    font-size: 1.2rem;
    line-height: 1.5;
  }
  .plain-text-content {
    font-size: 1rem;
    color: #333;
  }
  </style>
  