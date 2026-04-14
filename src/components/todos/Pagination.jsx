import common from '../../assets/styles/common.module.css'
import styles from './Pagination.module.css'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null

    // Build page number list with ellipsis
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 2 && i <= currentPage + 2)
        ) {
            pages.push(i)
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            pages.push('...')
        }
    }

    return (
        <div className={styles.pagination}>
            <button
                className={`${common.btn} ${common.btnOutline} ${common.btnSm}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                previous
            </button>

            <div className={styles.pages}>
                {pages.map((page, i) =>
                    page === '...' ? (
                        <span key={`dots-${i}`} className={styles.dots}>…</span>
                    ) : (
                        <button
                            key={page}
                            className={`${styles.pageBtn} ${
                                page === currentPage ? styles.pageBtnActive : ''
                            }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                className={`${common.btn} ${common.btnOutline} ${common.btnSm}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    )
}