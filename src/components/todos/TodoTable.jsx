import common from '../../assets/styles/common.module.css'
import styles from './TodoTable.module.css'

export default function TodoTable({ todos }) {
    if (todos.length === 0) {
        return (
            <div className={`${common.card}`}>
                No todos match your filters.
            </div>
        )
    }

    return (
        <div className={styles.tableWrap}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.th}>Title</th>
                    <th className={styles.th}>User</th>
                    <th className={styles.th}>Status</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(todo => (
                    <tr key={todo.id} className={styles.row}>
                        <td className={styles.td}>{todo.title}</td>
                        <td className={`${styles.td}`}>{todo.userName}</td>
                        <td className={styles.td}>
                <span className={`${common.badge} ${
                    todo.completed ? common.badgeSuccess : common.badgeWarning
                }`}>
                  {todo.completed ? 'Completed' : 'Pending'}
                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}