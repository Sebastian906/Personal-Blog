import React from 'react'
import { Link } from 'react-router-dom'
import { MdChevronRight } from 'react-icons/md'
import { IoHomeOutline } from 'react-icons/io5'
import { RouteIndex } from '@/helpers/RouteName'

/**
 * Breadcrumb component
 *
 * @param {Object[]} items  - Array de crumbs: [{ label, href }]
 *                            El último item se muestra como activo (sin enlace).
 * @param {boolean}  withHome - Si true, antepone el crumb "Inicio" automáticamente.
 */
const Breadcrumb = ({ items = [], withHome = true }) => {
    const crumbs = withHome
        ? [{ label: 'Inicio', href: RouteIndex, icon: true }, ...items]
        : items

    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm">
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1

                    return (
                        <li key={index} className="flex items-center gap-1">
                            {index > 0 && (
                                <MdChevronRight
                                    size={16}
                                    className="text-slate-400 dark:text-slate-500 shrink-0"
                                    aria-hidden="true"
                                />
                            )}

                            {isLast ? (
                                <span
                                    aria-current="page"
                                    className="text-slate-500 dark:text-slate-400 line-clamp-1 max-w-55"
                                    title={crumb.label}
                                >
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link
                                    to={crumb.href}
                                    className="flex items-center gap-1 text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 hover:underline underline-offset-2 transition-colors shrink-0"
                                >
                                    {crumb.icon && (
                                        <IoHomeOutline size={14} aria-hidden="true" />
                                    )}
                                    {crumb.label}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumb