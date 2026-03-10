<!-- src/components/Column.vue -->
<template>
  <div class="column">
    <h2>Колонка {{ columnId }}</h2>
    <div class="cards-container">
      <Card
          v-for="card in cards"
          :key="card.id"
          :id="card.id"
          :card-title="card.cardTitle"
          :points="card.points"
      />
      <div v-if="!cards.length" class="empty-message">
        Нет карточек
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import Card from '@/components/Card.vue'

const props = defineProps({
  columnId: {
    type: Number,
    required: true
  }
})

const store = useNotesStore()

const cards = computed(() => {
  const column = store.columns.find(col => col.id === props.columnId)
  return column ? column.cards : []
})
</script>

<style scoped>
.column {
  flex: 1;
  min-height: 400px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.column h2 {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
  font-size: 1.2rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.cards-container {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-message {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 30px 20px;
  background: #fafafa;
  border-radius: 6px;
  border: 2px dashed #ddd;
}
</style>