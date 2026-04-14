import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {todoStorage} from '../hooks/todoStorage'
import TodoFilters from '../components/todos/TodoFilters.jsx'
import TodoTable from '../components/todos/TodoTable.jsx'
import Pagination from '../components/todos/Pagination.jsx'
import styles from './TodoListPage.module.css'

const parPage = 10

async function fetchTodos() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    if (!res.ok) throw new Error('Failed to fetch todos')
    return res.json()
}

async function fetchUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error('Failed to fetch users')
    return res.json()
}

export default function TodoListPage() {
    const [selectedUser, setSelectedUser] = todoStorage('todo-filter-user', 'all')
    const [selectedStatus, setSelectedStatus] = todoStorage('todo-filter-status', 'all')
    const [currentPage, setCurrentPage] = todoStorage('todo-filter-page', 1)
    const [search, setSearch] = todoStorage('todo-filter-search', '')

    const {
        data: todos = [],
        isLoading: todosLoading,
        isError
    } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos })

    const {
        data: users = [],
        isLoading: usersLoading
    } = useQuery({ queryKey: ['users'], queryFn: fetchUsers })

    // Build a userId -> name lookup map
    const userMap = useMemo(() => {
        return users.reduce((acc, user) => {
            acc[user.id] = user.name
            return acc
        }, {})
    }, [users])


    const enrichedTodos = useMemo(() => {
        return todos.map(todo => ({
            ...todo,
            userName: userMap[todo.userId] ?? `User ${todo.userId}`,
        }))
    }, [todos, userMap])

    //Apply filters
    const filtered = useMemo(() => {
        return enrichedTodos.filter(todo => {
            const matchUser =
                selectedUser === 'all' || String(todo.userId) === selectedUser
            const matchStatus =
                selectedStatus === 'all' ||
                (selectedStatus === 'completed' && todo.completed) ||
                (selectedStatus === 'pending' && !todo.completed)
            const matchSearch =
                search.trim() === '' ||
                todo.title.toLowerCase().includes(search.trim().toLowerCase())
            return matchUser && matchStatus && matchSearch
        })
    }, [enrichedTodos, selectedUser, selectedStatus, search])

    const totalPages = Math.max(1, Math.ceil(filtered.length / parPage))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * parPage,
        safePage * parPage
    )


    const handleUserChange = (val) => {
        setSelectedUser(val);
        setCurrentPage(1)
    }

    const handleStatusChange = (val) => {
        setSelectedStatus(val);
        setCurrentPage(1)
    }

    const handleSearchChange = (val) => {
        setSearch(val);
        setCurrentPage(1)
    }

    return (
        <div>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Todo List</h1>
            </div>

            <TodoFilters
                users={users}
                selectedUser={selectedUser}
                selectedStatus={selectedStatus}
                search={search}
                onUserChange={handleUserChange}
                onStatusChange={handleStatusChange}
                onSearchChange={handleSearchChange}
            />

            {isError && (
                <div className={styles.error}>
                    Failed to load todos. Please refresh.
                </div>
            )}

            <TodoTable todos={paginated}  />

            <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}