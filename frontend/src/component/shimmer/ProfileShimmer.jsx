const ProfileShimmer = () => {
    return (
        <div className="mt-10 w-full rounded-[10px] bg-linear-to-r from-secondary to-primary p-10 flex flex-col items-center gap-6 max-sm:gap-4">

            {/* Profile image */}
            <div className="w-24 h-24 max-md:w-16 max-md:h-16 max-sm:w-14 max-sm:h-14 rounded-full border-3 border-white/50 bg-white/20 animate-pulse" />

            {/* Name */}
            <div className="h-6 w-32 max-sm:h-5 max-sm:w-28 rounded-md bg-white/30 animate-pulse" />

            {/* Email section */}
            <div className="flex flex-col items-center gap-2">
                {/* Email Address */}
                <div className="h-3 w-24 rounded bg-white/30 animate-pulse" />

                {/* Email */}
                <div className="h-4 w-44 max-sm:w-36 rounded bg-white/30 animate-pulse" />
            </div>

        </div>
    );
};
export default ProfileShimmer;