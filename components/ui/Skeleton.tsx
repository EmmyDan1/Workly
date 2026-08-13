"use client";

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-surface ${className}`}
    />
  );
};

export default Skeleton;