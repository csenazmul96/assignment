import common from '../../assets/styles/common.module.css'
import styles from './TodoFilters.module.css'

export default function TodoFilters({
                                        users = [],  // ✅ default to empty array — safe while users are loading
                                        selectedUser,
                                        selectedStatus,
                                        search,
                                        onUserChange,
                                        onStatusChange,
                                        onSearchChange,
                                    }) {
    return (
        <div className={styles.filters}>
            <div className={styles.filterGroup}>
                <label className={common.label}>Search</label>
                <input
                    type="text"
                    className={common.input}
                    placeholder="Search by title..."
                    value={search}
                    onChange={e => onSearchChange(e.target.value)}
                />
            </div>

            <div className={styles.filterGroup}>
                <label className={common.label}>User</label>
                <select
                    className={common.select}
                    value={selectedUser}
                    onChange={e => onUserChange(e.target.value)}
                >
                    <option value="all">All Users</option>
                    {users.map(user => (
                        <option key={user.id} value={String(user.id)}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label className={common.label}>Status</label>
                <select
                    className={common.select}
                    value={selectedStatus}
                    onChange={e => onStatusChange(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
        </div>
    )
}