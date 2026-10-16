import { useEffect } from 'react'

const Modal = ({
    children,
    onClose,
    maxWidthClassName = 'max-w-md',
    ariaLabel = 'Confirmation dialog'
}) => {
    useEffect(() => {
        if (!onClose) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4'
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose?.();
            }}
        >
            <div
                role='dialog'
                aria-modal='true'                aria-label={ariaLabel}
                className={`w-full min-w-0 ${maxWidthClassName} max-h-[90dvh] overflow-y-auto rounded-lg bg-white p-4 shadow-xl sm:p-6`}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal
