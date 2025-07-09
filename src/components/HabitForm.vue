<template>
  <form @submit.prevent="submitForm">
    <input v-model="localHabit.title" placeholder="Nama kebiasaan" required />
    <input v-model="localHabit.category" placeholder="Kategori" required />
    <button type="submit">{{ isEdit ? 'Update' : 'Tambah' }}</button>
    <button type="button" @click="$emit('cancel')">Batal</button>
  </form>
</template>

<script setup>
import { reactive, watch, toRefs } from 'vue'
const props = defineProps({
  habit: Object,
  isEdit: Boolean
})
const emit = defineEmits(['submit', 'cancel'])

const localHabit = reactive({ title: '', category: '' })

watch(() => props.habit, (newVal) => {
  if (newVal) Object.assign(localHabit, newVal)
}, { immediate: true })

const submitForm = () => {
  emit('submit', { ...localHabit })
  localHabit.title = ''
  localHabit.category = ''
}
</script>
