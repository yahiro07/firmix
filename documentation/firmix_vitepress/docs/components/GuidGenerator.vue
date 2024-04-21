<script setup lang="ts">
import { ref } from "vue";
const guid = ref("");

function generateNext() {
  guid.value = crypto.randomUUID();
}
</script>

<template>
  <div class="base">
    <input type="text" readonly :value="guid" />
    <button class="button" @click="generateNext()">生成</button>
  </div>
</template>

<style scoped>
.base {
  display: flex;
  gap: 8px;
}

input {
  padding: 4px 8px;
  border-radius: 4px;
  border-width: 1px;
  border-color: var(--vp-button-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
  width: 300px;
}

.button {
  padding: 4px 8px;
  border-radius: 4px;
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.button:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}
</style>
