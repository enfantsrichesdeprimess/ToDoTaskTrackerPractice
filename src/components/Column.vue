<template>
  <div class="column" :class="{ locked: isLocked }">
    <div class="column-header">
      <div class="column-title">
        <h2>Колонка {{ columnId }}</h2>
        <span v-if="isLocked" class="lock-badge" title="Колонка заблокирована"></span>
      </div>
      <div class="column-stats">
        <span class="card-count">{{ columnCards.length }}</span>
        <span class="card-limit">/{{ maxCards }}</span>
      </div>
    </div>

    <div class="cards-container">
      <draggable
          v-model="columnCards"
          :group="{ name: 'cards' }"
          :sort="true"
          :disabled="isLocked && columnId === 1"
          item-key="id"
          handle=".drag-handle"
          @end="onDragEnd"
          class="drag-area"
      >
        <template #item="{ element }">
          <div class="card-wrapper">
            <div v-if="!(isLocked && columnId === 1)" class="drag-handle">
              ⋮⋮
            </div>
            <Card
                :id="element.id"
                :card-title="element.cardTitle"
                :points="element.points"
                :completed-at="element.completedAt"
                :is-locked="isLocked && columnId === 1"
            />
          </div>
        </template>
      </draggable>

      <div v-if="!columnCards.length" class="empty-state">
        <div class="empty-icon">📝</div>
        <p class="empty-text">Нет карточек</p>
        <p class="empty-hint">Перетащите или создайте новую</p>
      </div>
    </div>

    <div v-if="isLocked && columnId === 1" class="lock-message">
      <span class="lock-message-text">
        Колонка заблокирована до освобождения места во 2 колонке
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import Card from './Card.vue'
import draggable from 'vuedraggable'

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

const columnCards = computed({
  get: () => column.value?.cards || [],
  set: (newCards) => {
    if (column.value) {
      column.value.cards = newCards
    }
  }
})

const maxCards = computed(() => {
  const limit = column.value?.maxCards
  return limit === Infinity ? '∞' : limit
})

const isLocked = computed(() => {
  return props.columnId === 1 && store.isColumn1Locked
})

const onDragEnd = () => {
}
</script>

<style scoped>
.column {
  flex: 1;
  min-width: 320px;
  background: #f8f9fa;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.column.locked {
  background: #f1f3f5;
  border: 2px solid #ff8787;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e9ecef;
}

.column-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.column-title h2 {
  margin: 0;
  color: #495057;
  font-size: 1.3rem;
  font-weight: 600;
}

.lock-badge {
  font-size: 1.1rem;
}

.column-stats {
  background: #e9ecef;
  padding: 6px 12px;
  border-radius: 30px;
  font-weight: 600;
}

.card-count {
  color: #2c3e50;
  font-size: 1.1rem;
}

.card-limit {
  color: #868e96;
  font-size: 0.9rem;
  margin-left: 2px;
}

.cards-container {
  flex: 1;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.drag-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100px;
}

.card-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  transition: transform 0.2s;
}

.card-wrapper:hover {
  transform: translateX(-4px);
}

.drag-handle {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #adb5bd;
  cursor: grab;
  user-select: none;
  margin-top: 20px;
  border-radius: 4px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.drag-handle:hover {
  background: #e9ecef;
  color: #495057;
}

.drag-handle:active {
  cursor: grabbing;
}

.empty-state {
  text-align: center;
  padding: 48px 24px;
  background: white;
  border-radius: 16px;
  border: 2px dashed #dee2e6;
  transition: all 0.2s;
}

.empty-state:hover {
  background: #f1f3f5;
  border-color: #adb5bd;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-text {
  color: #868e96;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.empty-hint {
  color: #adb5bd;
  font-size: 0.9rem;
}

.lock-message {
  margin-top: 20px;
  padding: 16px;
  background: #fff5f5;
  border: 1px solid #ffc9c9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.lock-message-text {
  color: #c92a2a;
  font-size: 0.9rem;
  line-height: 1.4;
  flex: 1;
}
</style>