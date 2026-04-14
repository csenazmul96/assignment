import { useState } from 'react'
import common from '../../assets/styles/common.module.css'
import styles from './AddFieldForm.module.css'

const FIELD_TYPES = [
    { value: 'text',     label: 'Text input' },
    { value: 'email',    label: 'Email input' },
    { value: 'number',   label: 'Number input' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select',   label: 'Dropdown (select)' },
    { value: 'checkbox', label: 'Checkbox' },
]

const EMPTY = { label: '', type: 'text', placeholder: '', options: '' }

export default function AddFieldForm({ onAdd }) {
    const [form, setForm] = useState(EMPTY)

    const set = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const handleAdd = () => {
        onAdd({ ...form, label: form.label.trim() })
    }

    return (
        <div className={styles.form}>
            <div className={styles.field}>
                <label className={common.label}>Field Label *</label>
                <input
                    type="text"
                    className={common.input}
                    placeholder="e.g. Full Name"
                    value={form.label}
                    onChange={e => set('label', e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <label className={common.label}>Input Type *</label>
                <select
                    className={common.select}
                    value={form.type}
                    onChange={e => set('type', e.target.value)}
                >
                    {FIELD_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                </select>
            </div>

            {form.type !== 'checkbox' && form.type !== 'select' && (
                <div className={styles.field}>
                    <label className={common.label}>Placeholder</label>
                    <input
                        type="text"
                        className={common.input}
                        placeholder="e.g. Enter your name"
                        value={form.placeholder}
                        onChange={e => set('placeholder', e.target.value)}
                    />
                </div>
            )}

            {form.type === 'select' && (
                <div className={styles.field}>
                    <label className={common.label}>Options (comma separated) *</label>
                    <input
                        type="text"
                        className={common.input}
                        placeholder="e.g. Active, Inactive, Pending"
                        value={form.options}
                        onChange={e => set('options', e.target.value)}
                    />
                    <span className={styles.hint}>Separate options with commas</span>
                </div>
            )}

            <button
                className={`${common.btn} ${common.btnPrimary}`}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleAdd}
            >
                + Add Field
            </button>
        </div>
    )
}