\<!-- src/components/Card.vue -->
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
        <span class="point-marker">•</span>
        {{ point.title }}
        <span v-if="point.isReady" class="check-mark">✓</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  cardTitle: String,
  points: Array,
  id: Number
})
</script>

<style scoped>
.card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 0;
  border: 1px solid #e0e0e0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card-title {
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.points-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.point-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  color: #555;
  font-size: 0.95rem;
  border-bottom: 1px dashed #f0f0f0;
}

.point-item:last-child {
  border-bottom: none;
}

.point-item.completed {
  color: #999;
  text-decoration: line-through;
}

.point-marker {
  color: #007bff;
  font-size: 1.2rem;
  line-height: 1;
}

.check-mark {
  margin-left: auto;
  color: #28a745;
  font-weight: bold;
}
</style>