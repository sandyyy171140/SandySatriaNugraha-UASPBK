<template>
  <div class="custom-select" ref="selectContainer">
    <div class="select-trigger" @click="toggleDropdown">
      <div class="trigger-content">
        <Shapes class="input-icon" />
        <span v-if="modelValue">{{ modelValue }}</span>
        <span v-else class="placeholder">{{ placeholder }}</span>
      </div>
      <ChevronDown class="chevron-icon" :class="{ 'is-rotated': isOpen }" />
    </div>

    <transition name="fade">
      <ul v-if="isOpen" class="options-panel">
        <li
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="option-item"
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Shapes, ChevronDown } from 'lucide-vue-next';

// Props untuk menerima data dari parent
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: { // Untuk v-model
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Pilih salah satu',
  },
});

// Emits untuk mengirim data kembali ke parent
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectContainer = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit('update:modelValue', option); // Kirim value baru
  isOpen.value = false; // Tutup dropdown
};

// Fungsi untuk menutup dropdown saat klik di luar komponen
const handleClickOutside = (event) => {
  if (selectContainer.value && !selectContainer.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
}
.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  background-color: var(--card);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.select-trigger:hover, .select-trigger.is-open {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}
.trigger-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.input-icon {
  color: var(--muted-foreground);
  width: 20px;
  height: 20px;
}
.placeholder {
  color: var(--muted-foreground);
}
.chevron-icon {
  color: var(--muted-foreground);
  transition: transform 0.3s ease;
}
.chevron-icon.is-rotated {
  transform: rotate(180deg);
}

.options-panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  list-style: none;
  padding: 0.5rem;
  margin: 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}
.option-item {
  padding: 0.75rem 1rem;
  border-radius: calc(var(--radius) - 4px);
  cursor: pointer;
  transition: background-color 0.2s;
}
.option-item:hover {
  background-color: var(--muted);
}

/* Transisi untuk dropdown */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>