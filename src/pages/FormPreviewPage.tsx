import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { todoStorage } from '../hooks/todoStorage'
import common from '../assets/styles/common.module.css'
import styles from './FormPreviewPage.module.css'
import FormFieldRenderer from '../components/form/FormFieldRenderer'

export default function FormPreviewPage() {
    const [fields] = todoStorage('form-schema', [])
    const [values, setValues] = useState({})
    const navigate = useNavigate()

    const handleChange = (id, value) => {
        setValues(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = () => {

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
                <div className={`${common.card}`}>
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
        <div>
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
                            <FormFieldRenderer
                                field={field}
                                value={values[field.id]}
                                onChange={handleChange}
                            />
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