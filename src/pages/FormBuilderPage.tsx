import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { todoStorage } from '../hooks/todoStorage'
import FieldRow from '../components/form/FieldRow'
import AddFieldForm from '../components/form/AddFieldForm'
import common from '../assets/styles/common.module.css'
import styles from './FormBuilderPage.module.css'

export default function FormBuilderPage() {
    const [savedFields, setSavedFields] = todoStorage('form-schema', [])
    const [fields, setFields] = useState(savedFields)
    const [saved, setSaved] = useState(false)
    const navigate = useNavigate()

    const addField = (field) => {
        setFields(prev => [...prev, { ...field, id: Date.now().toString() }])
        setSaved(false)
    }

    const removeField = (id) => {
        setFields(prev => prev.filter(f => f.id !== id))
        setSaved(false)
    }

    const handleSave = () => {
        setSaved(true)
        setSavedFields(fields)
        setTimeout(() => setSaved(false), 2000)
    }

    useEffect(() => { //this is for auto save
        setSaved(false)

        const timer = setTimeout(() => {
            setSavedFields(fields)
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        }, 500)

        return () => clearTimeout(timer)
    }, [fields])

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Form Builder</h1>
                </div>
                <div className={styles.headerActions}>
                    {saved && <span className={styles.savedMsg}>Saved</span>}
                    <button
                        className={`${common.btn} ${common.btnOutline}`}
                        onClick={handleSave}
                        disabled={fields.length === 0}
                    >
                        Save Form
                    </button>
                    <button
                        className={`${common.btn} ${common.btnPrimary}`}
                        onClick={() => navigate('/form-preview')}
                        disabled={fields.length === 0}
                    >
                        Preview
                    </button>
                </div>
            </div>

            <div className={styles.layout}>
                <div className={styles.fieldsSection}>
                    <div className={styles.fieldList}>
                        {fields.map((field, index) => (
                            <FieldRow
                                key={field.id}
                                field={field}
                                index={index}
                                onRemove={() => removeField(field.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.addSection}>
                    <h2 className={styles.sectionTitle}>Add Field</h2>
                    <AddFieldForm onAdd={addField} />
                </div>
            </div>
        </div>
    )
}