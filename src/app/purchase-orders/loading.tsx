import { Skeleton } from "@/src/components/ui/skeleton";

export default function PurchaseOrderSkeleton() {
  return (
    <div className="mx-12 my-6 flex-col space-y-2">
      <Skeleton className="w-[125px] h-[40px] rounded-full" />
      <Skeleton className="w-[400px] h-[20px] rounded-full" />
      <Skeleton className="w-full h-[30px] rounded-full" />
      <Skeleton className="w-full h-[600px] rounded-3xl" />
    </div>
  );
}
