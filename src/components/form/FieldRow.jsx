import common from '../../assets/styles/common.module.css'
import styles from './FieldRow.module.css'

const fieldTypes = {
    text: 'Text',
    email: 'Email',
    number: 'Number',
    textarea: 'Textarea',
    select: 'Dropdown',
    checkbox: 'Checkbox',
}

export default function FieldRow({ field, index, onRemove}) {
    return (
        <div className={styles.row}>
            <span>{index + 1}</span>

            <div className={styles.info}>
                <span className={styles.fieldLabel}>{field.label}</span>
                {field.type === 'select' && field.options && (
                    <span className={styles.optionsPreview}>
                    {field.options.split(',').map(o => o.trim()).filter(Boolean).join(' · ')} </span>
                )}
            </div>

            <span className={styles.typePill}>{fieldTypes[field.type]}</span>

            <div className={styles.actions}>
                <button
                    className={`${common.btn} ${common.btnGhost} ${common.btnSm}`}
                    onClick={onRemove}
                >✕</button>
            </div>
        </div>
    )
}