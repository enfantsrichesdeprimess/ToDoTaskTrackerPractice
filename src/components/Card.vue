<template>
  <div class="card">
    <h3 class="card-title">{{ cardTitle }}</h3>
    <ul class="points-list">
      <li
          v-for="point in points"
          :key="point.id"
          class="point-item"
          :class="{ completed: point.isReady }"
      >
        <input
            type="checkbox"
            :checked="point.isReady"
            @change="togglePoint(point.id)"
            class="point-checkbox"
        />
        <span class="point-text">{{ point.title }}</span>
      </li>
    </ul>

    <div class="progress-bar">
      <div
          class="progress-fill"
          :style="{ width: `${completionPercent}%` }"
      ></div>
      <span class="progress-text">{{ completionPercent }}%</span>
    </div>

    <div v-if="completedAt" class="completion-date">
      Завершена: {{ formatDate(completedAt) }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notesStore'

const props = defineProps({
  cardTitle: String,
  points: Array,
  id: Number,
  completedAt: [String, null]
})

const store = useNotesStore()

const completionPercent = computed(() => {
  if (!props.points.length) return 0
  const completed = props.points.filter(p => p.isReady).length
  return Math.round((completed / props.points.length) * 100)
})

const togglePoint = (pointId) => {
  store.togglePoint(props.id, pointId)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.card-title {
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
}

.points-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
}

.point-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px dashed #f5f5f5;
  transition: opacity 0.2s;
}

.point-item:last-child {
  border-bottom: none;
}

.point-item.completed .point-text {
  color: #999;
  text-decoration: line-through;
}

.point-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #4caf50;
}

.point-text {
  flex: 1;
  color: #444;
  font-size: 0.95rem;
}

.progress-bar {
  height: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin: 8px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  transition: width 0.3s ease;
  border-radius: 10px;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  font-size: 0.7rem;
  font-weight: 600;
  text-shadow: 0 0 2px white;
}

.completion-date {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid #e0e0e0;
  color: #28a745;
  font-size: 0.8rem;
  text-align: right;
  font-style: italic;
}
</style>