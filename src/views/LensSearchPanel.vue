<template>
    <div class="lens-panel">
        <div class="lens-header">
            <div class="lens-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none"
                    class="lens-logo">
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
                <span>使用 Google 智能镜头搜索</span>
            </div>
            <button class="btn btn--icon lens-close-btn font-icon" @click="emit('close')" title="关闭">&#xE711;</button>
        </div>

        <div class="lens-body" :class="{ 'drag-active': isDragOver }" @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">

            <!-- 拖放/上传区域 -->
            <div v-if="!previewUrl" class="lens-drop-zone">
                <div class="drop-zone-content">
                    <div class="drop-icon">
                        <!-- 图片图标 -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </div>
                    <div class="drop-text">
                        将图片拖放到此处或<button class="upload-link" @click="triggerFileUpload">上传文件</button>
                    </div>
                </div>

                <div class="lens-separator">
                    <span class="separator-line"></span>
                    <span class="separator-text">或</span>
                    <span class="separator-line"></span>
                </div>

                <div class="lens-url-input-wrapper">
                    <input ref="urlInputRef" type="text" class="lens-url-input" v-model="imageUrl"
                        placeholder="请粘贴图片的链接" @keyup.enter="searchByUrl" />
                    <button class="lens-url-search-btn" @click="searchByUrl" :disabled="!imageUrl.trim()">搜索</button>
                </div>
            </div>

            <!-- 图片预览 -->
            <div v-else class="lens-preview">
                <img :src="previewUrl" alt="Preview" class="preview-image" />
                <div class="preview-actions">
                    <button class="lens-url-search-btn" @click="performLensSearch">使用 Google 智能镜头搜索</button>
                    <button class="preview-cancel-btn" @click="clearPreview">取消</button>
                </div>
            </div>

            <input ref="fileInputRef" type="file" accept="image/*" style="display: none" @change="onFileSelected" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const GOOGLE_LENS_UPLOAD_URL = 'https://lens.google.com/uploadbyurl?url='
const GOOGLE_LENS_SEARCH_URL = 'https://lens.google.com/v3/upload'

const emit = defineEmits(['close'])

const urlInputRef = ref<HTMLInputElement | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const imageUrl = ref('')
const isDragOver = ref(false)
const previewUrl = ref<string | null>(null)
const previewFile = ref<File | null>(null)

onMounted(() => {
    // 自动聚焦到URL输入框
    setTimeout(() => urlInputRef.value?.focus(), 100)
    window.addEventListener('paste', onGlobalPaste)
})

onUnmounted(() => {
    window.removeEventListener('paste', onGlobalPaste)
    // 清理 Object URL
    if (previewUrl.value && previewUrl.value.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl.value)
    }
})

// --- 全局粘贴处理 (Ctrl+V) ---
const onGlobalPaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (const item of items) {
        if (item.type.startsWith('image/')) {
            e.preventDefault()
            const file = item.getAsFile()
            if (file) {
                handleImageFile(file)
            }
            return
        }
    }
}

// --- 拖放处理 ---
const onDragOver = () => {
    isDragOver.value = true
}

const onDragLeave = () => {
    isDragOver.value = false
}

const onDrop = (e: DragEvent) => {
    isDragOver.value = false
    const files = e.dataTransfer?.files
    if (files && files.length > 0) {
        const file = files[0]
        if (file.type.startsWith('image/')) {
            handleImageFile(file)
            return
        }
    }
    // 尝试从拖放的URL获取
    const url = e.dataTransfer?.getData('text/uri-list') || e.dataTransfer?.getData('text/plain')
    if (url && isImageUrl(url)) {
        imageUrl.value = url
        searchByUrl()
    }
}

// --- 文件选择处理 ---
const triggerFileUpload = () => {
    fileInputRef.value?.click()
}

const onFileSelected = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file && file.type.startsWith('image/')) {
        handleImageFile(file)
    }
    // 重置input以便重复选择同一文件
    target.value = ''
}

// --- 图片处理 ---
const handleImageFile = (file: File) => {
    previewFile.value = file
    // 清理之前的URL
    if (previewUrl.value && previewUrl.value.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl.value)
    }
    previewUrl.value = URL.createObjectURL(file)

    // 立即自动搜索，不需要确认
    setTimeout(() => {
        performLensSearch()
    }, 100)
}

const clearPreview = () => {
    if (previewUrl.value && previewUrl.value.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl.value)
    }
    previewUrl.value = null
    previewFile.value = null
}

// --- 搜索 ---
const searchByUrl = () => {
    const url = imageUrl.value.trim()
    if (!url) return
    window.location.href = GOOGLE_LENS_UPLOAD_URL + encodeURIComponent(url)
}

const performLensSearch = () => {
    if (previewFile.value) {
        // 通过表单提交文件到 Google Lens
        const form = document.createElement('form')
        form.method = 'POST'
        form.enctype = 'multipart/form-data'
        form.action = GOOGLE_LENS_SEARCH_URL
        form.target = '_self'
        form.style.display = 'none'

        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.name = 'encoded_image'

        // 使用 DataTransfer 设置 File
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(previewFile.value)
        fileInput.files = dataTransfer.files

        form.appendChild(fileInput)
        document.body.appendChild(form)
        form.submit()
        document.body.removeChild(form)

        emit('close')
    }
}

const isImageUrl = (url: string): boolean => {
    try {
        const parsed = new URL(url)
        return /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(parsed.pathname)
            || parsed.hostname.includes('image')
    } catch {
        return false
    }
}
</script>

<style lang="scss" scoped>
.lens-panel {
    padding: 20px 24px 24px;
}

.lens-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.lens-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary-color);

    .lens-logo {
        width: 24px;
        height: 24px;
        color: var(--text-primary-color);

        path {
            fill: var(--text-primary-color);
        }
    }
}

.lens-close-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary-color);
    font-size: 14px;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: var(--search-suggestion-hover-bg-color);
    }
}

.lens-body {
    border: 2px dashed var(--search-border-color, #dadce0);
    border-radius: 20px;
    padding: 24px 20px;
    transition: border-color 0.2s ease, background-color 0.2s ease;

    &.drag-active {
        border-color: var(--accent-color);
        background-color: rgba(var(--accent-color-rgb, 66, 133, 244), 0.05);
    }
}

.lens-drop-zone {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.drop-zone-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 16px 0;
}

.drop-icon {
    color: var(--text-secondary-color);
    opacity: 0.6;
}

.drop-text {
    font-size: 14px;
    color: var(--text-secondary-color);
    text-align: center;

    .upload-link {
        background: none;
        border: none;
        color: var(--accent-color);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        padding: 0;
        text-decoration: underline;
        text-underline-offset: 2px;

        &:hover {
            opacity: 0.8;
        }
    }
}

.lens-separator {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 0;
}

.separator-line {
    flex: 1;
    height: 1px;
    background-color: var(--search-border-color, #dadce0);
}

.separator-text {
    font-size: 13px;
    color: var(--text-secondary-color);
    white-space: nowrap;
}

.lens-url-input-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
}

.lens-url-input {
    flex: 1;
    height: 40px;
    border: 1.5px solid var(--search-border-color, #dadce0);
    border-radius: 20px;
    padding: 0 16px;
    font-size: 13px;
    font-family: var(--font-primary);
    color: var(--text-primary-color);
    background-color: transparent;
    outline: none;
    transition: border-color 0.15s ease;

    &::placeholder {
        color: var(--search-placeholder-color);
    }

    &:focus {
        border-color: var(--accent-color);
    }
}

.lens-url-search-btn {
    height: 40px;
    padding: 0 20px;
    border: none;
    border-radius: 20px;
    background-color: var(--accent-color);
    color: var(--button-primary-text-color);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font-primary);
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.15s ease;

    &:hover:not(:disabled) {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
}

.lens-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.preview-image {
    max-width: 100%;
    max-height: 200px;
    border-radius: 12px;
    object-fit: contain;
}

.preview-actions {
    display: flex;
    gap: 10px;
    align-items: center;
}

.preview-cancel-btn {
    height: 40px;
    padding: 0 20px;
    border: 1.5px solid var(--search-border-color, #dadce0);
    border-radius: 20px;
    background-color: transparent;
    color: var(--text-primary-color);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font-primary);
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: var(--search-suggestion-hover-bg-color);
    }
}
</style>
