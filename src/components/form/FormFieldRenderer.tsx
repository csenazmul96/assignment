import common from '../../assets/styles/common.module.css'
import styles from './FormFieldRenderer.module.css'

function TextField({ field, value, onChange }) {
    const { id, type, placeholder, required } = field
    return (
        <input
            type={type}
            id={id}
            className={common.input}
            placeholder={placeholder}
            required={required}
            value={value ?? ''}
            onChange={e => onChange(id, e.target.value)}
        />
    )
}

function TextareaField({ field, value, onChange }) {
    const { id, placeholder, required } = field
    return (
        <textarea
            id={id}
            className={common.textarea}
            placeholder={placeholder}
            required={required}
            value={value ?? ''}
            onChange={e => onChange(id, e.target.value)}
        />
    )
}

function SelectField({ field, value, onChange }) {
    const { id, label, required, options } = field
    const opts = (options ?? '').split(',').map(o => o.trim()).filter(Boolean)
    return (
        <select
            id={id}
            className={common.select}
            required={required}
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

function CheckboxField({ field, value, onChange }) {
    const { id, label } = field
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

// Field type -> component map
const AllFieldComponents = {
    text:     TextField,
    email:    TextField,
    number:   TextField,
    textarea: TextareaField,
    select:   SelectField,
    checkbox: CheckboxField,
}


export default function FormFieldRenderer({ field, value, onChange }) {
    const Component = AllFieldComponents[field.type] ?? TextField
    return <Component field={field} value={value} onChange={onChange} />
}