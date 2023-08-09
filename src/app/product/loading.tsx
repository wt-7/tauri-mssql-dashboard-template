"use client";

import { currentProductAtom } from "@/src/atoms/products";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useAtom } from "jotai";

export default function ProductSkeleton() {
  const [product] = useAtom(currentProductAtom);
  // The skeleton page is dependent on whether the landing page or the product page should be loaded.

  if (!product) {
    return (
      <div>
        <Skeleton className="h-[65px] mx-12 mt-6 rounded-md" />
      </div>
    );
  }

  return (
    <div>
      <div className="mx-12 mt-6">
        <div className="flex justify-between items-center mt-6">
          <div className="flex-col space-y-2">
            <Skeleton className="w-[125px] h-[40px] rounded-full" />
            <Skeleton className="w-[150px] h-[20px] rounded-full" />
          </div>
          <Skeleton className="w-[200px] h-[20px] rounded-full" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-[125px] rounded-3xl" />
          <Skeleton className="h-[125px] rounded-3xl" />
          <Skeleton className="h-[125px] rounded-3xl" />
          <Skeleton className="h-[125px] rounded-3xl" />
        </div>
        <div className="mt-16 grid grid-cols-8 gap-2">
          <Skeleton className="col-span-1 h-[40px] rounded-full" />
          <Skeleton className="col-span-7 h-[40px] rounded-full" />
        </div>
        <Skeleton className="mt-2 h-[580px] rounded-3xl" />
      </div>
    </div>
  );
}
