"use client";

import { currentProductAtom, searchHistoryAtom } from "@/src/atoms/products";
import { TopSearch, TopSearchFormInput } from "@/src/components/top-search";
import { useAtom } from "jotai";
import { SubmitHandler } from "react-hook-form";

interface ProductLayoutProps {
  children: React.ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  const [, setProduct] = useAtom(currentProductAtom);

  const onSubmit: SubmitHandler<TopSearchFormInput> = (data) => {
    setProduct(data.input);
  };

  return (
    <>
      <TopSearch onSubmit={onSubmit} historyAtom={searchHistoryAtom} />
      {children}
    </>
  );
}
