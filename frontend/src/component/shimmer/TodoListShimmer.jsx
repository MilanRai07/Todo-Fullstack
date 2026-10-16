
const TodoListShimmer = ({ count = 3, col = false }) => {
    return (
        <div className={`${col ? 'grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5' : 'space-y-5'} min-w-0`}>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="grid min-w-0 grid-cols-1 gap-3 rounded-sm border border-lightBorder p-3 animate-pulse sm:grid-cols-[minmax(0,1fr)_minmax(110px,25%)] sm:gap-4"
                >
                    {/* Todo content */}
                    <div className="flex min-w-0 items-start gap-3">
                        {/* Status circle */}
                        <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-gray-200" />

                        <div className="min-w-0 flex-1 space-y-3">
                            {/* Title */}
                            <div className="h-5 w-2/3 rounded bg-gray-200" />

                            {/* Description */}
                            <div className="space-y-2">
                                <div className="h-3 w-full rounded bg-gray-200" />
                                <div className="h-3 w-5/6 rounded bg-gray-200" />
                            </div>

                            {/* Priority and status */}
                            <div className="flex gap-4">
                                <div className="h-3 w-24 rounded bg-gray-200" />
                                <div className="h-3 w-20 rounded bg-gray-200" />
                            </div>
                        </div>
                    </div>

                    {/* Image placeholder */}
                    <div className="aspect-[16/7] min-w-0 rounded-md bg-gray-200 sm:aspect-4/3" />
                </div>
            ))}
        </div>
    );
};

export default TodoListShimmer;