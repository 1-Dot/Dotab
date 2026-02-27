<template>
  <div class="settings-content">
    <div class="modal-body">
      <h2>设置</h2>

      <div class="settings-section">
        <div class="avatar-section">
          <img :src="avatarPreview" alt="Avatar" class="avatar-preview" />
          <div class="avatar-actions">
            <label class="btn btn--secondary avatar-upload-btn">
              <span class="font-icon"></span> 更换头像
              <input type="file" accept="image/*" @change="handleAvatarUpload" class="visually-hidden-input" />
            </label>
            <button v-if="avatarPreview !== '/images/avatar.png'" type="button" class="btn btn--secondary"
              @click="resetAvatar">
              重置
            </button>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <div class="form-group">
          <input type="text" class="input-field" v-model="greetingMessageInput" placeholder="欢迎消息" />
          <span class="input-icon font-icon"></span>
        </div>
      </div>
      <!-- 自定义背景 -->
      <div class="settings-section">
        <span class="section-label">自定义背景</span>
        <div class="bg-type-switcher">
          <button type="button" class="bg-type-option" :class="{ active: bgType === 'default' }"
            @click="bgType = 'default'">默认</button>
          <button type="button" class="bg-type-option" :class="{ active: bgType === 'color' }"
            @click="bgType = 'color'">纯色</button>
          <button type="button" class="bg-type-option" :class="{ active: bgType === 'image' }"
            @click="bgType = 'image'">图片</button>
        </div>

        <!-- 纯色：强制分别设置亮色和暗色 -->
        <div v-if="bgType === 'color'" class="bg-color-dual">
          <div class="bg-color-item">
            <span class="bg-color-label">亮色背景</span>
            <div class="bg-color-row">
              <input type="color" v-model="bgLight.value" class="color-input" />
              <span class="color-hex">{{ bgLight.value || '#f9fafb' }}</span>
            </div>
          </div>
          <div class="bg-color-item">
            <span class="bg-color-label">暗色背景</span>
            <div class="bg-color-row">
              <input type="color" v-model="bgDark.value" class="color-input" />
              <span class="color-hex">{{ bgDark.value || '#202124' }}</span>
            </div>
          </div>
        </div>

        <!-- 图片：可选分别设置 -->
        <div v-if="bgType === 'image'" class="bg-image-section">
          <label class="bg-separate-toggle">
            <input type="checkbox" v-model="bgImageSeparate" />
            <span>分别设置亮色和暗色背景图</span>
          </label>

          <div v-if="!bgImageSeparate" class="bg-image-single">
            <div class="bg-image-card">
              <label class="btn btn--secondary bg-upload-btn">
                <span class="font-icon"></span> 选择图片
                <input type="file" accept="image/*" @change="(e) => handleBgImageUpload(e, 'both')"
                  class="visually-hidden-input" />
              </label>
              <div v-if="bgLight.value" class="bg-image-preview">
                <img :src="bgLight.value" alt="背景预览" />
              </div>
            </div>
          </div>

          <div v-else class="bg-image-dual">
            <div class="bg-image-card">
              <span class="bg-color-label">亮色背景图</span>
              <label class="btn btn--secondary bg-upload-btn">
                <span class="font-icon"></span> 选择图片
                <input type="file" accept="image/*" @change="(e) => handleBgImageUpload(e, 'light')"
                  class="visually-hidden-input" />
              </label>
              <div v-if="bgLight.value" class="bg-image-preview">
                <img :src="bgLight.value" alt="亮色背景" />
              </div>
            </div>
            <div class="bg-image-card">
              <span class="bg-color-label">暗色背景图</span>
              <label class="btn btn--secondary bg-upload-btn">
                <span class="font-icon"></span> 选择图片
                <input type="file" accept="image/*" @change="(e) => handleBgImageUpload(e, 'dark')"
                  class="visually-hidden-input" />
              </label>
              <div v-if="bgDark.value" class="bg-image-preview">
                <img :src="bgDark.value" alt="暗色背景" />
              </div>
            </div>
          </div>
        </div>

        <button v-if="bgType !== 'default'" type="button" class="btn btn--secondary bg-reset-btn" @click="resetBg">
          <span class="font-icon"></span> 重置背景
        </button>
      </div>
    </div>

    <div class="modal-actions">
      <button type="button" class="btn btn--secondary" @click="uiStore.closeSettingsModal()">取消</button>
      <button type="button" class="btn btn--primary" @click="handleSave">
        <span class="font-icon"></span>保存
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useUiStore } from '../stores/ui'
import { useSettingsStore, type BackgroundSetting } from '../stores/settings'

const uiStore = useUiStore()
const settingsStore = useSettingsStore()

const greetingMessageInput = ref(settingsStore.greetingMessage)
const avatarPreview = ref(settingsStore.avatarUrl)

// 背景设置
const inferBgType = (): BackgroundSetting['type'] => {
  if (settingsStore.backgroundLight.type !== 'default') return settingsStore.backgroundLight.type
  if (settingsStore.backgroundDark.type !== 'default') return settingsStore.backgroundDark.type
  return 'default'
}

const bgType = ref<BackgroundSetting['type']>(inferBgType())
const bgLight = reactive<BackgroundSetting>({ ...settingsStore.backgroundLight })
const bgDark = reactive<BackgroundSetting>({ ...settingsStore.backgroundDark })

// 图片模式：是否分别设置亮暗色
const bgImageSeparate = ref(
  settingsStore.backgroundLight.type === 'image' &&
  settingsStore.backgroundDark.type === 'image' &&
  settingsStore.backgroundLight.value !== settingsStore.backgroundDark.value
)

// 切换背景类型时，同步 bgLight/bgDark 的 type
watch(bgType, (newType) => {
  bgLight.type = newType
  bgDark.type = newType
  if (newType === 'default') {
    bgLight.value = ''
    bgDark.value = ''
  }
  if (newType === 'color') {
    // 如果之前不是纯色，给一个默认初始值
    if (!bgLight.value || bgLight.value.startsWith('data:')) bgLight.value = '#f9fafb'
    if (!bgDark.value || bgDark.value.startsWith('data:')) bgDark.value = '#202124'
  }
  if (newType === 'image') {
    // 如果之前不是图片，清空值
    if (bgLight.value && !bgLight.value.startsWith('data:') && !bgLight.value.startsWith('http')) bgLight.value = ''
    if (bgDark.value && !bgDark.value.startsWith('data:') && !bgDark.value.startsWith('http')) bgDark.value = ''
  }
})

const handleAvatarUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(target.files[0])
  }
}

const resetAvatar = () => {
  avatarPreview.value = '/images/avatar.png'
}

const handleBgImageUpload = (event: Event, target: 'light' | 'dark' | 'both') => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (target === 'both' || target === 'light') bgLight.value = result
      if (target === 'both' || target === 'dark') bgDark.value = result
    }
    reader.readAsDataURL(input.files[0])
  }
}

const resetBg = () => {
  bgType.value = 'default'
  bgLight.type = 'default'
  bgLight.value = ''
  bgDark.type = 'default'
  bgDark.value = ''
}

const handleSave = () => {
  settingsStore.updateGreetingMessage(greetingMessageInput.value.trim() || 'Hello, User')
  settingsStore.updateAvatarUrl(avatarPreview.value)
  settingsStore.updateBackgroundLight({ ...bgLight })
  settingsStore.updateBackgroundDark({ ...bgDark })
  uiStore.closeSettingsModal()
}
</script>

<style lang="scss" scoped>
.settings-content {
  padding: 18px;

  .modal-body {
    margin: -18px;
    padding: 27px;
    padding-bottom: 14px;
    margin-bottom: -14px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    outline: 1px solid var(--modal-body-border-color);
    corner-shape: superellipse(1.5);
    background-color: var(--modal-bg-color);
    max-height: 70vh;
    overflow-y: auto;
  }

  h2 {
    font-size: 22px;
    font-weight: 600;
    color: var(--text-primary-color);
    margin-top: 0;
    margin-bottom: 24px;
  }

  .settings-section {
    margin-bottom: 20px;
  }

  .section-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary-color);
    margin-bottom: 10px;
  }

  .avatar-section {
    display: flex;
    align-items: center;
    gap: 18px;

    .avatar-preview {
      width: 62px;
      height: 62px;
      border-radius: 25px;
      corner-shape: superellipse(1.5);
      object-fit: cover;
    }

    .avatar-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .avatar-upload-btn {
      cursor: pointer;
    }
  }

  .form-group {
    position: relative;
    height: 43px;

    .input-icon {
      position: absolute;
      pointer-events: none;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
    }

    .input-field {
      padding-left: 42px;
    }
  }

  .modal-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 30px;

    .btn {
      min-width: 192px;
    }
  }

  // 背景类型切换器 (Fluent segmented control)
  .bg-type-switcher {
    display: flex;
    gap: 0;
    background: var(--input-bg-color);
    border-radius: 18px;
    corner-shape: superellipse(1.5);
    outline: 1px solid var(--input-border-color);
    outline-offset: -1px;
    padding: 3px;
    margin-bottom: 16px;
  }

  .bg-type-option {
    flex: 1;
    padding: 6px 0;
    border: none;
    border-radius: 15px;
    corner-shape: superellipse(1.5);
    background: transparent;
    color: var(--text-secondary-color);
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      box-shadow 0.2s ease;

    &.active {
      background: var(--modal-bg-color);
      color: var(--text-primary-color);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }
  }

  // 纯色：双色选择器
  .bg-color-dual {
    display: flex;
    gap: 12px;
  }

  .bg-color-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .bg-color-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary-color);
  }

  .bg-color-row {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--input-bg-color);
    outline: 1px solid var(--input-border-color);
    outline-offset: -1px;
    border-radius: 12px;
    corner-shape: superellipse(1.5);
    padding: 6px 10px;
  }

  .color-input {
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 8px;
    corner-shape: superellipse(1.5);
    padding: 0;
    cursor: pointer;
    background: transparent;
    flex-shrink: 0;

    &::-webkit-color-swatch-wrapper {
      padding: 2px;
    }

    &::-webkit-color-swatch {
      border: none;
      border-radius: 6px;
    }
  }

  .color-hex {
    font-size: 12px;
    font-family: monospace;
    color: var(--text-secondary-color);
  }

  // 图片背景
  .bg-image-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .bg-separate-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--text-primary-color);
    cursor: pointer;

    input[type="checkbox"] {
      accent-color: var(--accent-color);
      width: 16px;
      height: 16px;
    }
  }

  .bg-image-single,
  .bg-image-dual {
    display: flex;
    gap: 12px;
  }

  .bg-image-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .bg-upload-btn {
    cursor: pointer;
  }

  .bg-image-preview {
    img {
      width: 100%;
      max-height: 100px;
      border-radius: 10px;
      corner-shape: superellipse(1.5);
      object-fit: cover;
    }
  }

  .bg-reset-btn {
    margin-top: 4px;
    font-size: 12px;
    height: 34px;
    padding: 6px 14px;
  }
}
</style>
