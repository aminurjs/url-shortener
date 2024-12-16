import { Skeleton } from "@/components/ui/skeleton";

export function UserSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-grow">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}
