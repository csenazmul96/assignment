import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
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
    const [searchParams, setSearchParams] = useSearchParams()

    const selectedUser   = searchParams.get('user')   ?? 'all'
    const selectedStatus = searchParams.get('status') ?? 'all'
    const search         = searchParams.get('search') ?? ''
    const currentPage    = Number(searchParams.get('page') ?? 1)

    const setFilters = (updates) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev)
            Object.entries(updates).forEach(([key, value]) => {
                const isDefault =
                    value === 'all' ||
                    value === ''    ||
                    value === 1     ||
                    value === '1'
                if (isDefault) {
                    next.delete(key)
                } else {
                    next.set(key, String(value))
                }
            })
            return next
        })
    }

    const {
        data: todos = [],
        isLoading: todosLoading
    } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos, staleTime: Infinity })

    const {
        data: users = [],
        isLoading: usersLoading
    } = useQuery({ queryKey: ['users'], queryFn: fetchUsers, staleTime: Infinity })

    const enrichedTodos = useMemo(() => {
        const userMap = users.reduce((acc, user) => {
            acc[user.id] = user.name
            return acc
        }, {})
        return todos.map(todo => ({
            ...todo,
            userName: userMap[todo.userId] ?? `User ${todo.userId}`,
        }))
    }, [todos, users])

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
    const safePage   = Math.min(currentPage, totalPages)
    const paginated  = filtered.slice(
        (safePage - 1) * parPage,
        safePage * parPage
    )

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
                onUserChange={(val) => setFilters({ user: val, page: 1 })}
                onStatusChange={(val) => setFilters({ status: val, page: 1 })}
                onSearchChange={(val) => setFilters({ search: val, page: 1 })}
            />

            <TodoTable
                todos={paginated}
                isLoading={todosLoading || usersLoading}
            />

            <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
        </div>
    )
}