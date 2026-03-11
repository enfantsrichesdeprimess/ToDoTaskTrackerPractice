<script setup>
import Column from "@/components/Column.vue";
import Statistics from "@/components/Statistics.vue";
import { useNotesStore } from '@/stores/notesStore'

const store = useNotesStore()
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Мои заметки</h1>
      <p class="header-subtitle">Управляй задачами с умом</p>
    </header>

    <Statistics />

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
  padding: 30px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #2c3e50;
  font-size: 3rem;
  font-weight: 300;
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.header-subtitle {
  color: #868e96;
  font-size: 1.1rem;
  margin: 0;
}

.columns {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: stretch;
  flex: 1;
  margin-top: 20px;
}

@media (max-width: 1000px) {
  .columns {
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 2.5rem;
  }
}
</style>