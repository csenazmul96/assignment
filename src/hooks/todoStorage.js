import { useState } from 'react'

export function todoStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key)
            return stored !== null ? JSON.parse(stored) : defaultValue
        } catch {
            return defaultValue
        }
    })

    const setStoredValue = (newValue) => {
        const resolved = typeof newValue === 'function'
            ? newValue(value)
            : newValue
        setValue(resolved)
        try {
            localStorage.setItem(key, JSON.stringify(resolved))
        } catch {

        }
    }

    return [value, setStoredValue]
}