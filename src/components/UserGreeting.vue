<template>
  <div class="user-greeting">
    <img :src="settingsStore.avatarUrl" alt="User Avatar" class="avatar-img" />
    <h1>{{ settingsStore.greetingMessage }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '../stores/settings'

const settingsStore = useSettingsStore()
</script>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.user-greeting {
  display: flex;
  align-items: center;
  gap: 20px; // 设计稿间距
  margin-bottom: 34px; // 与搜索框的间距
  width: 100%; // 确保占满父容器宽度以实现左对齐

  .avatar-img {
    // 修改为 img 标签
    width: 62px; // 设计稿尺寸
    height: 62px; // 设计稿尺寸
    border-radius: 25px;
    corner-shape: superellipse(1.5);
  }

  h1 {
    padding-top: 2px;
    font-size: 36px; // 设计稿字体大小
    font-weight: 800; // 设计稿字重
    color: var(--text-primary-color); // Reverted to CSS variable
    margin: 0;
  }
}
</style>
