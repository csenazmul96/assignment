import { Routes, Route,  Navigate } from 'react-router-dom'
import TodoListPage from './pages/TodoListPage.jsx'
import FormBuilderPage from './pages/FormBuilderPage.jsx'
import FormPreviewPage from './pages/FormPreviewPage.jsx'
import styles from './App.module.css'
import Header from "./components/common-ui/Header.jsx";

export default function App() {
  return (
      <div className={styles.app}>
        <Header />
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