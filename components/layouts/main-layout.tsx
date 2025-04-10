import { Header } from "@/components/ui/header";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  activePage?: "지시" | "작업" | "기타" | "인사";
  userName?: string;
  pageTitle?: string;
}

export function MainLayout({
  children,
  activePage,
  userName,
  pageTitle,
}: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header activePage={activePage} userName={userName} />

      {pageTitle && (
        <div className="bg-gray-100 p-2 text-center font-semibold border-b">
          {pageTitle}
        </div>
      )}

      <main className="flex-1 p-4">{children}</main>

      <footer className="py-2 px-4 text-center text-xs text-gray-500 border-t">
        © 2023 주안건설 WMS 시스템
      </footer>
    </div>
  );
}
