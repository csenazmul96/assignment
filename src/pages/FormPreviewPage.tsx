import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { todoStorage } from '../hooks/todoStorage'
import common from '../assets/styles/common.module.css'
import styles from './FormPreviewPage.module.css'

function renderField(field, value, onChange) {
    const { id, type, placeholder, options, label } = field

    if (type === 'textarea') {
        return (
            <textarea
                id={id}
                className={common.textarea}
                placeholder={placeholder}
                value={value ?? ''}
                onChange={e => onChange(id, e.target.value)}
            />
        )
    }

    if (type === 'select') {
        const opts = (options ?? '').split(',').map(o => o.trim()).filter(Boolean)
        return (
            <select
                id={id}
                className={common.select}
                value={value ?? ''}
                onChange={e => onChange(id, e.target.value)}
            >
                <option value="">Select {label}...</option>
                {opts.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        )
    }

    if (type === 'checkbox') {
        return (
            <div className={styles.checkboxRow}>
                <input
                    type="checkbox"
                    id={id}
                    className={styles.checkbox}
                    checked={value ?? false}
                    onChange={e => onChange(id, e.target.checked)}
                />
                <label htmlFor={id} className={styles.checkboxLabel}>{label}</label>
            </div>
        )
    }

    return (
        <input
            type={type}
            id={id}
            className={common.input}
            placeholder={placeholder}
            value={value ?? ''}
            onChange={e => onChange(id, e.target.value)}
        />
    )
}

export default function FormPreviewPage() {
    const [fields] = todoStorage('form-schema', [])
    const [values, setValues] = useState({})
    const navigate = useNavigate()

    const handleChange = (id, value) => {
        setValues(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = () => {
        const missing = fields.filter(f => {
            const val = values[f.id]
            if (f.type === 'checkbox') return !val
            return !val || String(val).trim() === ''
        })

        // Use field labels as keys in the output
        const output = fields.reduce((acc, field) => {
            acc[field.label] = values[field.id] ?? (field.type === 'checkbox' ? false : '')
            return acc
        }, {})

        console.log("Form Data", output)

        setValues({})
    }

    const handleReset = () => {
        setValues({})
    }

    if (fields.length === 0) {
        return (
            <div>
                <h1 className={styles.pageTitle}>Form Preview</h1>
                <div className={`${common.card} ${common.emptyState}`}>
                    No form schema found.
                    <br />
                    <button
                        className={`${common.btn} ${common.btnPrimary}`}
                        style={{ marginTop: '16px' }}
                        onClick={() => navigate('/form-builder')}
                    >
                        Go to Form Builder
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Form Preview</h1>
                </div>
                <button
                    className={`${common.btn} ${common.btnOutline}`}
                    onClick={() => navigate('/form-builder')}
                >
                    back To Form
                </button>
            </div>

            <div className={styles.formCard}>
                <div className={styles.formFields}>
                    {fields.map(field => (
                        <div key={field.id} className={styles.fieldGroup}>
                            {field.type !== 'checkbox' && (
                                <label htmlFor={field.id} className={common.label}>
                                    {field.label}
                                </label>
                            )}
                            {renderField(field, values[field.id], handleChange)}
                        </div>
                    ))}
                </div>

                <div className={styles.formActions}>
                    <button
                        className={`${common.btn} ${common.btnOutline}`}
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        className={`${common.btn} ${common.btnPrimary}`}
                        onClick={handleSubmit}
                    >
                        Submit Form
                    </button>
                </div>
            </div>
        </div>
    )
}