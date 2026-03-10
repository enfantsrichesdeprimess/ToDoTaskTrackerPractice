<template>
  <div class="column">
    <div class="column-header">
      <h2>Колонка {{ columnId }}</h2>
      <span class="card-count">{{ cards.length }} / {{ maxCards }}</span>
    </div>

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
import Card from './Card.vue'

const props = defineProps({
  columnId: {
    type: Number,
    required: true
  }
})

const store = useNotesStore()

const column = computed(() => {
  return store.columns.find(col => col.id === props.columnId)
})

const cards = computed(() => column.value?.cards || [])
const maxCards = computed(() => {
  const limit = column.value?.maxCards
  return limit === Infinity ? '∞' : limit
})
</script>

<style scoped>
.column {
  flex: 1;
  min-width: 300px;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
}

.column-header h2 {
  margin: 0;
  color: #495057;
  font-size: 1.2rem;
}

.card-count {
  background: #dee2e6;
  color: #495057;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.cards-container {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-message {
  text-align: center;
  color: #adb5bd;
  font-style: italic;
  padding: 40px 20px;
  background: white;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
}
</style>