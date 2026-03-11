<template>
  <div class="statistics">
    <div class="stat-card warning">
      <div class="stat-content">
        <div class="stat-label">Просроченные карточки</div>
        <div class="stat-value">{{ overdueCount }}</div>
        <div class="stat-hint">(больше 3 дней)</div>
      </div>
    </div>

    <div class="stat-card success">
      <div class="stat-content">
        <div class="stat-label">Выполненные задачи</div>
        <div class="stat-value">{{ taskStats.completed }} / {{ taskStats.total }}</div>
        <div class="stat-hint">{{ taskStats.ratio }}% выполнено</div>
      </div>
    </div>

    <div class="stat-card info">
      <div class="stat-content">
        <div class="stat-label">Прогресс</div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${taskStats.ratio}%` }"></div>
        </div>
        <div class="stat-hint">{{ taskStats.ratio }}% задач выполнено</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notesStore'

const store = useNotesStore()

const overdueCount = computed(() => store.overdueCardsCount)
const taskStats = computed(() => store.taskStats)
</script>

<style scoped>
.statistics {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.stat-card {
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card.warning {
  background: #fff3f3;
  border: 1px solid #ffc9c9;
}

.stat-card.success {
  background: #ebfbee;
  border: 1px solid #b2f2bb;
}

.stat-card.info {
  background: #e7f5ff;
  border: 1px solid #a5d8ff;
}

.stat-content {
  flex: 1;
}

.stat-label {
  color: #495057;
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.stat-value {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.2;
}

.stat-hint {
  color: #868e96;
  font-size: 0.8rem;
  margin-top: 4px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin: 8px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #82c91e);
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .statistics {
    flex-direction: column;
  }

  .stat-card {
    min-width: auto;
  }
}
</style>