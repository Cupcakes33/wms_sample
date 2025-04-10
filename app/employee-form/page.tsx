"use client";

import { Suspense } from "react";
import EmployeeForm from "@/components/employee-form";
import { Toaster } from "@/components/ui/toaster";

// 로딩 UI
function EmployeeFormPageLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>
  );
}

// 페이지 컨텐츠 컴포넌트
function EmployeeFormPageContent() {
  return (
    <>
      <EmployeeForm />
      <Toaster />
    </>
  );
}

export default function EmployeeFormPage() {
  return (
    <Suspense fallback={<EmployeeFormPageLoading />}>
      <EmployeeFormPageContent />
    </Suspense>
  );
}
