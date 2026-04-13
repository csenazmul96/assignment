import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import TodoListPage from './pages/TodoListPage'
import FormBuilderPage from './pages/FormBuilderPage'
import FormPreviewPage from './pages/FormPreviewPage'
import styles from './App.module.css'

export default function App() {
  return (
      <div className={styles.app}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <nav className={styles.nav}>
              <NavLink to="/todos" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink } >
                Todo List
              </NavLink>
              <NavLink to="/form-builder" className={({ isActive }) => isActive? `${styles.navLink} ${styles.navLinkActive}`: styles.navLink}>
                Form Builder
              </NavLink>
              <NavLink to="/form-preview" className={({ isActive }) =>isActive? `${styles.navLink} ${styles.navLinkActive}`: styles.navLink}>
                Form Preview
              </NavLink>
            </nav>
          </div>
        </header>

        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Navigate to="/todos" replace />} />
            <Route path="/todos" element={<TodoListPage />} />
            <Route path="/form-builder" element={<FormBuilderPage />} />
            <Route path="/form-preview" element={<FormPreviewPage />} />
          </Routes>
        </main>
      </div>
  )
}