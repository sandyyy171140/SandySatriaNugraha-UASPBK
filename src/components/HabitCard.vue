<template>
  <div class="card">
    <h3>{{ habit.title }}</h3>
    <p><strong>Kategori:</strong> {{ habit.category }}</p>
    <button @click="$emit('edit', habit)">Edit</button>
    <button @click="$emit('delete', habit.id)">Hapus</button>
  </div>
</template>

<script setup>
defineProps(['habit'])
defineEmits(['edit', 'delete'])
</script>

<style scoped>
.card {
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
