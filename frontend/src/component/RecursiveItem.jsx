
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const RecursiveItem = ({ item, level = 0 }) => {
    const [open, setOpen] = useState(false);

    const hasChildren = item.children && item.children.length > 0;
    const itemContent = (
        <>
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span className="truncate">{item.title}</span>
            {hasChildren ? (
                <ChevronRight
                    size={24}
                    className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
                />
            ) : (
                <span className="w-4 shrink-0" />
            )}
        </>
    );
    const itemClassName = (isActive = false) => `
        flex w-full items-center gap-3 rounded-lg
        px-3 py-2.5 text-left text-sm font-semibold text-white
        transition-all duration-200 hover:bg-zinc-100 hover:text-primary
        ${open || isActive ? 'bg-zinc-100 text-zinc-900' : ''}
    `;

    return (
        <div className="w-full">
            {hasChildren ? (
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className={itemClassName()}
                    style={{ paddingLeft: `${level * 16 + 12}px` }}
                    aria-expanded={open}
                >
                    {itemContent}
                </button>
            ) : (
                <NavLink
                    to={item.href}
                    className={({ isActive }) => itemClassName(isActive)}
                    style={{ paddingLeft: `${level * 16 + 12}px` }}
                >
                    {itemContent}
                </NavLink>
            )}

            {/* Children */}
            {open && hasChildren && (
                <div className="mt-2 space-y-3">
                    {item.children.map((child, index) => (
                        <RecursiveItem
                            key={index}
                            item={child}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecursiveItem;