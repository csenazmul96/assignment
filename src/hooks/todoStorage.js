import { useState } from 'react'

export function todoStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = todoStorage.getItem(key)
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
            todoStorage.setItem(key, JSON.stringify(resolved))
        } catch {
            //catch errorshow
        }
    }

    return [value, setStoredValue]
}