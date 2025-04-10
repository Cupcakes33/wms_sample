"use client";

import { Suspense } from "react";
import LoginForm from "@/components/login-form";
import { Toaster } from "@/components/ui/toaster";

// 로딩 UI
function LoginPageLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>
  );
}

// 페이지 컨텐츠 컴포넌트
function LoginPageContent() {
  return (
    <>
      <LoginForm />
      <Toaster />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageLoading />}>
      <LoginPageContent />
    </Suspense>
  );
}
