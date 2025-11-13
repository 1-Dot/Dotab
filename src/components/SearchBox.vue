<template>
  <div class="search-box-wrapper">
    <input type="text" class="search-input" :placeholder="'What are you looking for today?'" v-model="searchQuery"
      @keyup.enter="performSearch" />
    <div class="search-icons">
      <button class="btn btn--icon lens-action-icon" title="Search with Google Lens">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M21.3083 24.3027C22.8456 24.3027 24.0917 23.0565 24.0917 21.5193C24.0917 19.982 22.8456 18.7358 21.3083 18.7358C19.7711 18.7358 18.5249 19.982 18.5249 21.5193C18.5249 23.0565 19.7711 24.3027 21.3083 24.3027Z"
            fill="currentColor" />
          <path
            d="M12.9581 18.7358C15.2639 18.7358 17.1332 16.8665 17.1332 14.5606C17.1332 12.2548 15.2639 10.3855 12.9581 10.3855C10.6522 10.3855 8.78296 12.2548 8.78296 14.5606C8.78296 16.8665 10.6522 18.7358 12.9581 18.7358Z"
            fill="currentColor" />
          <path
            d="M0.42041 19.9883C0.42041 23.1388 2.97594 25.6943 6.12642 25.6943H12.9458V22.9109L5.96985 22.8935C4.43897 22.8935 3.20383 21.4687 3.20383 19.7795V16.6482H0.42041V19.9883Z"
            fill="currentColor" />
          <path
            d="M25.4712 9.13301C25.4712 5.98253 22.9156 3.427 19.7652 3.427H16.425L19.9043 6.21042C21.4352 6.21042 22.6877 7.65258 22.6877 9.34177V14.5607H25.4712V9.13301Z"
            fill="currentColor" />
          <path
            d="M15.7292 0.643799H10.1624L8.07481 3.42722H6.12642C2.97594 3.42722 0.42041 5.98275 0.42041 9.13323V12.4733H3.20383V9.34198C3.20383 7.6528 4.45637 6.21064 5.98725 6.21064H19.9043L15.7292 0.643799Z"
            fill="currentColor" />
        </svg>
      </button>
      <button class="btn btn--icon search-action-icon font-icon" @click="performSearch" title="Search">
        
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const performSearch = () => {
  if (searchQuery.value.trim() === '') return
  let url: string
  try {
    // Attempt to construct a URL, prepending http if not present for URL constructor
    const tempUrl = new URL(
      searchQuery.value.startsWith('http://') || searchQuery.value.startsWith('https://')
        ? searchQuery.value
        : 'http://' + searchQuery.value,
    )
    // Check if it looks like a valid domain or path after protocol (e.g. not just 'http://text')
    if (
      tempUrl.hostname &&
      (tempUrl.pathname !== '/' ||
        tempUrl.search ||
        tempUrl.hash ||
        searchQuery.value.includes('.'))
    ) {
      // If original query didn't have a protocol, and it's a valid-looking domain, prepend https
      if (!searchQuery.value.startsWith('http://') && !searchQuery.value.startsWith('https://')) {
        url = 'https://' + searchQuery.value.trim()
      } else {
        url = searchQuery.value.trim()
      }
    } else {
      throw new Error('Not a full URL, treating as search query')
    }
  } catch {
    // If URL construction fails or it's not a valid-looking URL, treat as search query
    url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery.value.trim())}`
  }
  window.location.href = url
}
</script>

<style lang="scss" scoped>
.search-box-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; // 设计稿宽度
  height: 55px; // 设计稿高度
  background-color: var(--search-bg-color); // 设计稿背景色
  border-radius: 25px; // 设计稿圆角
  corner-shape: superellipse(1.5);
  box-shadow:
    0px 1px 4px 0px rgba(0, 0, 0, 0.12),
    0px 4px 16px 0px rgba(39, 49, 74, 0.1);
  padding: 0;
  position: relative;
  border: 0.5px solid var(--search-border-color); // 设计稿边框
}

.search-input {
  border-radius: inherit;
  corner-shape: inherit;
  padding-left: 22px;
  padding-right: 115px;
  flex-grow: 1;
  height: 55px;
  border: none;
  outline: none;
  font-family: var(--font-primary);
  background-color: transparent;
  font-size: 17px; // 设计稿字体大小
  font-weight: 500; // 设计稿字重
  color: var(--text-primary-color);
  border: 2px solid transparent;
  transition: border 0.08s ease-out;

  &::placeholder {
    color: var(--search-placeholder-color);
    font-weight: 400;
  }

  &:focus {
    border: 2px solid var(--accent-color);

    &::placeholder {
      color: transparent;
    }
  }
}

.search-icons {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* 垂直居中 */
  right: 13px;
  display: flex;
  align-items: center;
  gap: 4px; // 图标间距
}

.lens-action-icon {
  color: var(--text-primary-color); // 使用 CSS 变量
  background: none;
  border: none;
  width: 46px; // 增大点击区域
  height: 46px;
  cursor: pointer;
  display: flex; // To center the SVG if needed
  align-items: center;
  justify-content: center;
  border-radius: 50%; // 添加圆角
  transition: background-color 0.15s ease-out; // 添加过渡效果

  svg {
    width: 22px; // Match search-action-icon font-size visually
    height: 22px;

    path {
      fill: var(--text-primary-color);
    }
  }

  &:hover {
    background-color: var(--search-suggestion-hover-bg-color); // 微妙的 hover 背景
  }

  &:active {
    background-color: var(--search-suggestion-active-bg-color); // 微妙的 active 背景
  }
}

.search-action-icon {
  color: var(--text-primary-color); // 使用 CSS 变量
  font-size: 23px; // 设计稿字体大小
  font-weight: 590; // 设计稿字重
  background: none;
  border: none;
  width: 46px; // 增大点击区域
  height: 46px;
  cursor: pointer;
  border-radius: 50%; // 添加圆角
  transition: background-color 0.15s ease-out; // 添加过渡效果

  &:hover {
    background-color: var(--search-suggestion-hover-bg-color); // 微妙的 hover 背景
  }

  &:active {
    background-color: var(--search-suggestion-active-bg-color); // 微妙的 active 背景
  }
}
</style>
