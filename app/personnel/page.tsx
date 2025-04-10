"use client";

import { Suspense } from "react";
import PersonnelPage from "@/components/personnel-page";
import { Toaster } from "@/components/ui/toaster";

// 로딩 UI
function PersonnelPageLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>
  );
}

// 페이지 컨텐츠 컴포넌트
function PersonnelPageContent() {
  return (
    <>
      <PersonnelPage />
      <Toaster />
    </>
  );
}

export default function Personnel() {
  return (
    <Suspense fallback={<PersonnelPageLoading />}>
      <PersonnelPageContent />
    </Suspense>
  );
}
