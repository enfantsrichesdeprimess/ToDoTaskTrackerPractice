<template>
  <div class="column">
    <h2>Колонка {{ columnId }}</h2>

  </div>
</template>

<script setup>
import Card from "@/components/Card.vue";
defineProps({
  columnId: Number,
  cardID: Number,
})
</script>