<template>
  <button class="shortcut-item-wrapper add-shortcut-button" @click="$emit('click')">
    <div class="shortcut-icon-container add-icon-bg">
      <div class="add-icon-symbol font-icon"></div>
    </div>
    <span class="shortcut-name add-text">Add</span>
  </button>
</template>

<script setup lang="ts">
defineEmits(['click'])
</script>

<style lang="scss" scoped>
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.shortcut-item-wrapper.add-shortcut-button {
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: $shortcut-wrapper-width;
  padding: 14px 0;
  border: none;
  background-color: transparent;
  color: var(--text-primary-color);
  border-radius: 0;
  user-select: none;
  transition:
    transform 0.15s ease,
    filter 0.15s ease;

  &:hover {
    transform: scale(1.03);
    filter: brightness(1.05);

    .shortcut-icon-container.add-icon-bg {
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12),
        0px 6px 20px rgba(38.9, 49.2, 73.56, 0.15);
    }
  }

  &:active {
    transform: scale(0.97);
    filter: brightness(0.95);
    transition-duration: 0.05s;
  }
}

.shortcut-icon-container.add-icon-bg {
  @include flex-center;
  width: $shortcut-icon-container-size; // 设计稿尺寸
  height: $shortcut-icon-container-size; // 设计稿尺寸
  background: var(--shortcut-icon-bg-color); // 使用 CSS 变量
  box-shadow:
    0px 1px 4px 0px rgba(0, 0, 0, 0.12),
    0px 4px 16px 0px rgba(39, 49, 74, 0.1);
  border-radius: 25px; // 设计稿圆角
  corner-shape: superellipse(1.5);
  border: 0.5px var(--search-border-color) solid; // 使用 CSS 变量
  transition:
    transform 0.15s ease-out,
    box-shadow 0.15s ease-out,
    background-color 0.3s ease; // 添加 background-color 过渡
  flex-shrink: 0;
}

.add-icon-symbol {
  font-size: 26px;
  color: var(--text-primary-color);
  font-weight: 400;
  line-height: 1;
  transform: translate(1.1px, 0.5px);
}

.shortcut-name.add-text {
  text-align: center;
  color: var(--shortcut-name-text-color);
  font-size: 12.5px;
  font-weight: 500;
  word-wrap: break-word;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
