<template>
  <div class="card">
    <h3 class="card-title">{{ cardTitle }}</h3>
      <ul>
        <li v-for="point in points">{{ point.title }}</li>
      </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  id: Number,
  title: String,
  points: Array,
  cardTitle: String,
})
</script>
