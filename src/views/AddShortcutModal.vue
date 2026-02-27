<template>
  <div class="add-shortcut-modal">

    <form @submit.prevent="handleSubmit">
      <div class="modal-body">
        <h2>{{ isEditing ? '编辑快捷方式' : '添加快捷方式' }}</h2>

        <div class="form-group">
          <input type="url" id="shortcut-url" class="input-field" v-model="formData.url" placeholder="URL" required />
          <span class="input-icon font-icon"></span>
        </div>

        <div class="form-group">
          <div class="input-button-group">
            <input type="text" id="shortcut-name" class="input-field" v-model="formData.name" placeholder="标签"
              style="max-width: 274px;" required />
            <span class="input-icon font-icon"></span>
            <button type="button" class="btn btn--secondary input-button" style="flex-grow: 1;" @click="autoFillLabel">
              <span class="font-icon"></span> 自动
            </button>
          </div>

        </div>

        <div class="form-group">
          <div class="input-button-group">
            <input type="text" class="input-field" v-model="formData.customFavicon" placeholder="图标 (auto)" />
            <span class="input-icon font-icon"></span>
            <button type="button" class="btn btn--secondary input-button circle-button" @click="pasteIconFromClipboard">
              <span class="font-icon"></span>
            </button>
            <label for="favicon-upload" class="btn btn--secondary input-button circle-button">
              <span class="font-icon"></span>
              <input type="file" id="favicon-upload" @change="handleFaviconUpload" accept="image/*"
                class="visually-hidden-input" />
            </label>
          </div>
          <p v-if="faviconFileName" class="favicon-file-name">Selected: {{ faviconFileName }}</p>
        </div>
      </div>

      <div class="modal-actions">
        <button type="button" class="btn btn--secondary" @click="$emit('close')">取消</button>
        <button type="submit" class="btn btn--primary"><span class="font-icon">{{ isEditing ? '' : ''
        }}</span>{{ isEditing ? '保存' : '添加'
            }}</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useShortcutsStore, type Shortcut } from '../stores/shortcuts'
import { useUiStore } from '../stores/ui'

const emit = defineEmits(['close'])

const shortcutsStore = useShortcutsStore()
const uiStore = useUiStore()

const isEditing = computed(() => !!uiStore.editingShortcut)

// ✨ [修复] 确保 faviconFile 类型为 File | undefined, 初始值为 undefined
const initialFormData = (): Omit<Shortcut, 'id'> & { faviconFile?: File | undefined } => ({
  name: '',
  url: '',
  customFavicon: '',
  faviconFile: undefined, // 从 null 改为 undefined
})

const formData = reactive(initialFormData())
const faviconFileName = ref('')

watch(
  () => uiStore.editingShortcut,
  (shortcutToEdit) => {
    if (shortcutToEdit) {
      formData.name = shortcutToEdit.name
      formData.url = shortcutToEdit.url
      formData.customFavicon = shortcutToEdit.customFavicon || ''
      formData.faviconFile = undefined // ✨ [修复] 从 null 改为 undefined
      faviconFileName.value = ''
    } else {
      Object.assign(formData, initialFormData()) // formData 会被重置为包含 faviconFile: undefined
      faviconFileName.value = ''
    }
  },
  { immediate: true },
)

const handleFaviconUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    formData.faviconFile = file
    faviconFileName.value = file.name
    formData.customFavicon = ''
  }
}

import { NAME_CORRECTIONS } from '../data/nameCorrections'

const autoFillLabel = () => {
  if (!formData.url) return
  try {
    const urlStr = formData.url.startsWith('http') ? formData.url : 'https://' + formData.url
    const url = new URL(urlStr)
    // 提取域名并清理: www.google.com -> Google
    const hostname = url.hostname.replace(/^www\./, '')
    const parts = hostname.split('.')
    const key = parts[0].toLowerCase()
    // 优先使用更正表，否则首字母大写
    formData.name = NAME_CORRECTIONS[key] ?? (key.charAt(0).toUpperCase() + key.slice(1))
  } catch {
    // URL 无效，不做处理
  }
}

const pasteIconFromClipboard = async () => {
  try {
    const items = await navigator.clipboard.read()
    for (const item of items) {
      // 优先查找图片类型
      const imageType = item.types.find((type) => type.startsWith('image/'))
      if (imageType) {
        const blob = await item.getType(imageType)
        const reader = new FileReader()
        reader.onload = (e) => {
          formData.customFavicon = e.target?.result as string
          faviconFileName.value = '(clipboard image)'
        }
        reader.readAsDataURL(blob)
        return
      }
    }
    // 没有图片，尝试读取文本作为 URL
    const text = await navigator.clipboard.readText()
    if (text && (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:'))) {
      formData.customFavicon = text.trim()
      faviconFileName.value = '(clipboard url)'
    }
  } catch {
    // 剪贴板 API 可能被拒绝，尝试 readText 降级
    try {
      const text = await navigator.clipboard.readText()
      if (text && (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:'))) {
        formData.customFavicon = text.trim()
        faviconFileName.value = '(clipboard url)'
      }
    } catch {
      // 剪贴板访问被拒绝
    }
  }
}

const handleSubmit = async () => {
  let finalFaviconUrl = formData.customFavicon

  if (formData.faviconFile) {
    finalFaviconUrl = await new Promise<string>((resolve, reject) => {
      // Added reject for safety
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = () => reject(new Error('File reading failed')) // Added error handling
      reader.readAsDataURL(formData.faviconFile!)
    })
  }

  const shortcutData = {
    name: formData.name,
    url: formData.url,
    customFavicon: finalFaviconUrl,
  }

  if (isEditing.value && uiStore.editingShortcut) {
    shortcutsStore.updateShortcut({ ...uiStore.editingShortcut, ...shortcutData })
  } else {
    shortcutsStore.addShortcut(shortcutData)
  }
  emit('close')
}
</script>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.add-shortcut-modal {
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

  .form-group {
    margin-bottom: 20px;
    position: relative;
    height: 43px;

    label {
      display: block;
      font-size: 13px;
      font-weight: 500;
    }

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

  .input-button-group {
    display: flex;
    align-items: center;
    gap: 9px;

    .input-field {
      flex-grow: 1;
      margin-right: 3px;
    }

    .input-button {
      white-space: nowrap;
      // For SF Symbol "square.and.arrow.up" (􀈽), ensure $font-sf-symbols is correctly applied
      // or embed the symbol directly if your editor/font supports it well.
    }

    .circle-button {
      display: inline-block;
      min-width: 43px;
      padding: 0;
      border-radius: 50%;
      corner-shape: superellipse(1) !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .favicon-file-name {
    font-size: 12px;
    color: var(--text-secondary-color);
    margin-top: 8px;
  }

  .modal-actions {
    display: flex;
    //水平居中
    justify-content: center;
    gap: 12px;
    margin-top: 30px;

    .btn {
      min-width: 192px;
    }
  }
}
</style>
