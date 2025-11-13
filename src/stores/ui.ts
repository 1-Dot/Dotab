import { defineStore } from 'pinia'
import type { Shortcut } from './shortcuts'

interface UiState {
  isAddShortcutModalOpen: boolean
  isSettingsModalOpen: boolean
  editingShortcut: Shortcut | null // 用于编辑模式
  activeShortcutId: string | null // 新增：用于追踪活动的快捷方式
}

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    isAddShortcutModalOpen: false,
    isSettingsModalOpen: false,
    editingShortcut: null,
    activeShortcutId: null, // 初始化
  }),
  actions: {
    openAddShortcutModal() {
      this.isAddShortcutModalOpen = true
      this.editingShortcut = null // 确保不是编辑模式
    },
    closeAddShortcutModal() {
      this.isAddShortcutModalOpen = false
      this.editingShortcut = null
    },
    openEditShortcutModal(shortcut: Shortcut) {
      this.editingShortcut = shortcut
      this.isAddShortcutModalOpen = true // 复用同一个模态框
    },
    openSettingsModal() {
      this.isSettingsModalOpen = true
    },
    closeSettingsModal() {
      this.isSettingsModalOpen = false
    },
    setActiveShortcut(shortcutId: string | null) { // 新增 action
      this.activeShortcutId = shortcutId
    },
  },
})
