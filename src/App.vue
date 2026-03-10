<script setup>
import { onMounted } from 'vue'
import Column from "@/components/Column.vue";
import { useNotesStore } from '@/stores/notesStore'

const store = useNotesStore()

onMounted(() => {
  store.logStore()
})
</script>

<template>
  <div class="app">
    <h1>Мои заметки</h1>
    <div class="columns">
      <Column :column-id="1" />
      <Column :column-id="2" />
      <Column :column-id="3" />
    </div>
  </div>
</template>

<style scoped>
.app {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 1px;
}

.columns {
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: flex-start;
}
</style>