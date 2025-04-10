import { useRouter } from "next/navigation";

interface HeaderProps {
  activePage?: "지시" | "작업" | "기타" | "인사";
  userName?: string;
}

export function Header({ activePage, userName }: HeaderProps) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <div className="p-2 text-center font-semibold">WMS 관리 시스템</div>

      <div className="flex items-center px-2 py-1 border-b">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 flex items-center justify-center mr-2 rounded-full shadow-sm">
            <span className="text-xs font-bold text-blue-700">주</span>
          </div>
          <span className="font-semibold">주안건설</span>
        </div>

        <div className="ml-auto flex items-center space-x-2">
          {userName && (
            <div className="bg-gray-100 px-3 py-1 text-xs rounded shadow-sm flex items-center">
              <span className="mr-1 text-blue-700 font-semibold">my</span>
              <span>{userName} 님</span>
            </div>
          )}
          <button
            onClick={() => handleNavigation("/login")}
            className="bg-gray-100 hover:bg-gray-200 px-3 py-1 text-xs rounded shadow-sm transition duration-200"
            aria-label="로그아웃"
            tabIndex={0}
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="flex bg-[#3366cc] text-white">
        <button
          onClick={() => handleNavigation("/work/direction")}
          className={`flex-1 py-2 px-4 text-center transition-colors duration-200 ${
            activePage === "지시" ? "bg-[#1e40af]" : "hover:bg-blue-700"
          }`}
          aria-label="지시 페이지로 이동"
          tabIndex={0}
        >
          지시
        </button>
        <button
          onClick={() => handleNavigation("/work")}
          className={`flex-1 py-2 px-4 text-center transition-colors duration-200 ${
            activePage === "작업" ? "bg-[#1e40af]" : "hover:bg-blue-700"
          }`}
          aria-label="작업 페이지로 이동"
          tabIndex={0}
        >
          작업
        </button>
        <button
          onClick={() => handleNavigation("/other")}
          className={`flex-1 py-2 px-4 text-center transition-colors duration-200 ${
            activePage === "기타" ? "bg-[#1e40af]" : "hover:bg-blue-700"
          }`}
          aria-label="기타 페이지로 이동"
          tabIndex={0}
        >
          기타
        </button>
        <button
          onClick={() => handleNavigation("/personnel")}
          className={`flex-1 py-2 px-4 text-center transition-colors duration-200 ${
            activePage === "인사" ? "bg-[#1e40af]" : "hover:bg-blue-700"
          }`}
          aria-label="인사 페이지로 이동"
          tabIndex={0}
        >
          인사
        </button>
      </div>
    </>
  );
}
