"use client";

import Skeleton from "@/components/ui/Skeleton";

const ProjectTableSkeleton = () => {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden lg:block">
        {/* Header */}
        <div className="grid grid-cols-[minmax(220px,1.5fr)_120px_100px_140px_120px_70px_100px_40px] items-center gap-4 border-b border-border px-4 py-2.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-4" />
        </div>

        {/* Rows */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[minmax(220px,1.5fr)_120px_100px_140px_120px_70px_100px_40px] items-center gap-4 border-b border-border px-4 py-3"
          >
            {/* Project */}
            <div className="flex min-w-0 items-center gap-3">
              <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />

              <div className="min-w-0 space-y-1.5">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-2.5 w-40" />
              </div>
            </div>

            {/* Health */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>

            {/* Priority */}
            <Skeleton className="h-5 w-16 rounded-md" />

            {/* Lead */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>

            {/* Date */}
            <Skeleton className="h-3 w-20" />

            {/* Issues */}
            <Skeleton className="h-3 w-6" />

            {/* Status */}
            <Skeleton className="h-5 w-16 rounded-md" />

            {/* Actions */}
            <Skeleton className="h-6 w-6 rounded-md" />
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b border-border px-4 py-3.5"
          >
            <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-3.5 w-32" />

              <div className="flex gap-2">
                <Skeleton className="h-2.5 w-12" />
                <Skeleton className="h-2.5 w-10" />
                <Skeleton className="h-2.5 w-14" />
              </div>
            </div>

            <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTableSkeleton;