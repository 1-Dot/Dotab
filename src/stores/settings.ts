import { defineStore } from 'pinia'

export interface BackgroundSetting {
    type: 'default' | 'color' | 'image'
    value: string
}

interface SettingsState {
    greetingMessage: string
    avatarUrl: string
    backgroundLight: BackgroundSetting
    backgroundDark: BackgroundSetting
}

const STORAGE_KEY = 'dotab-settings'

const defaultBackgroundLight: BackgroundSetting = { type: 'default', value: '' }
const defaultBackgroundDark: BackgroundSetting = { type: 'default', value: '' }

const parseBackground = (raw: unknown): BackgroundSetting | undefined => {
    if (
        raw &&
        typeof raw === 'object' &&
        'type' in raw &&
        'value' in raw &&
        typeof (raw as BackgroundSetting).value === 'string'
    ) {
        const t = (raw as BackgroundSetting).type
        if (t === 'default' || t === 'color' || t === 'image') {
            return raw as BackgroundSetting
        }
    }
    return undefined
}

const loadSettings = (): SettingsState => {
    const stored = localStorage.getItem(STORAGE_KEY)
    try {
        if (stored) {
            const parsed = JSON.parse(stored)
            return {
                greetingMessage: parsed.greetingMessage ?? 'Hello, User',
                avatarUrl: parsed.avatarUrl ?? '/images/avatar.png',
                backgroundLight: parseBackground(parsed.backgroundLight) ?? { ...defaultBackgroundLight },
                backgroundDark: parseBackground(parsed.backgroundDark) ?? { ...defaultBackgroundDark },
            }
        }
    } catch (e) {
        console.error('Failed to parse settings from localStorage', e)
    }
    return {
        greetingMessage: 'Hello, User',
        avatarUrl: '/images/avatar.png',
        backgroundLight: { ...defaultBackgroundLight },
        backgroundDark: { ...defaultBackgroundDark },
    }
}

const saveSettings = (state: SettingsState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const useSettingsStore = defineStore('settings', {
    state: (): SettingsState => loadSettings(),
    actions: {
        updateGreetingMessage(message: string) {
            this.greetingMessage = message
            saveSettings(this.$state)
        },
        updateAvatarUrl(url: string) {
            this.avatarUrl = url
            saveSettings(this.$state)
        },
        updateBackgroundLight(bg: BackgroundSetting) {
            this.backgroundLight = bg
            saveSettings(this.$state)
        },
        updateBackgroundDark(bg: BackgroundSetting) {
            this.backgroundDark = bg
            saveSettings(this.$state)
        },
        resetBackgroundLight() {
            this.backgroundLight = { ...defaultBackgroundLight }
            saveSettings(this.$state)
        },
        resetBackgroundDark() {
            this.backgroundDark = { ...defaultBackgroundDark }
            saveSettings(this.$state)
        },
    },
})
