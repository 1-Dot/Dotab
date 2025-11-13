<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="props.isOpen" class="modal-backdrop" @click.self="emit('close')">
        <div class="modal-content" role="dialog" aria-modal="true">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

// 按 Esc 键关闭模态框
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style lang="scss" scoped>
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--modal-backdrop-color);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: var(--modal-action-bg-color);
  border-radius: 40px;
  corner-shape: superellipse(1.5);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1), 0 16px 36px rgb(0, 0, 0, 0.12);
  width: 100%;
  max-width: 435px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.17, 0.84, 0.44, 1);
}

.modal-fade-leave-active {
  transition: all 0.1s cubic-bezier(0.9, 0.03, 0.69, 0.22);
}

.modal-fade-enter-active .modal-content {
  transition:
    transform 0.3s cubic-bezier(0.17, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.17, 0.84, 0.44, 1);
}

.modal-fade-leave-active .modal-content {
  transition:
    transform 0.1s cubic-bezier(0.9, 0.03, 0.69, 0.22),
    opacity 0.1s cubic-bezier(0.9, 0.03, 0.69, 0.22);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  background-color: transparent;
  backdrop-filter: blur(0px);
}

.modal-fade-enter-from .modal-content {
  opacity: 0;
  transform: scale(1.2);
}

.modal-fade-leave-to .modal-content {
  opacity: 0.5;
  transform: scale(1.1);
}
</style>
