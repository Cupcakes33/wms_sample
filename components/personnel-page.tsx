"use client";

import { useState, Suspense } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

// 직원 데이터 타입 정의
interface Employee {
  id: string;
  position: string;
  name: string;
  contact: string;
  status: "재직중" | "퇴사";
  note: string;
}

// 샘플 직원 데이터
const sampleEmployees: Employee[] = [
  {
    id: "emp001",
    position: "팀장",
    name: "홍길동",
    contact: "010-1234-1234",
    status: "재직중",
    note: "급여일 휴무",
  },
  {
    id: "emp002",
    position: "사원",
    name: "김철수",
    contact: "010-2345-2345",
    status: "재직중",
    note: "",
  },
  {
    id: "emp003",
    position: "사원",
    name: "이영희",
    contact: "010-3456-3456",
    status: "재직중",
    note: "주간 근무",
  },
  {
    id: "emp004",
    position: "책임자",
    name: "박민수",
    contact: "010-4567-4567",
    status: "재직중",
    note: "",
  },
  {
    id: "emp005",
    position: "사원",
    name: "정주원",
    contact: "010-5678-5678",
    status: "퇴사",
    note: "2023년 5월 퇴사",
  },
  {
    id: "emp006",
    position: "팀장",
    name: "강지현",
    contact: "010-6789-6789",
    status: "재직중",
    note: "",
  },
  {
    id: "emp007",
    position: "사원",
    name: "조현우",
    contact: "010-7890-7890",
    status: "재직중",
    note: "야간 근무",
  },
  {
    id: "emp008",
    position: "사원",
    name: "윤서연",
    contact: "010-8901-8901",
    status: "퇴사",
    note: "2023년 8월 퇴사",
  },
];

// PersonnelContent 컴포넌트 분리
function PersonnelContent() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 필터링된 직원 목록
  const filteredEmployees = sampleEmployees.filter((employee) => {
    const matchesSearch =
      employee.name.includes(searchTerm) ||
      employee.position.includes(searchTerm) ||
      employee.contact.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" ? true : employee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 직원 등록 페이지로 이동
  const handleRegisterEmployee = () => {
    router.push("/employee-form");
  };

  // 직원 상세 페이지로 이동
  const handleViewEmployee = (employeeId: string) => {
    router.push(`/employee-form?id=${employeeId}`);
  };

  return (
    <MainLayout activePage="인사" userName="홍길동" pageTitle="인사 관리">
      <div className="rounded-md border bg-white shadow-sm">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-64">
                <Input
                  placeholder="이름, 직급, 연락처 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="재직중">재직중</SelectItem>
                  <SelectItem value="퇴사">퇴사</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleRegisterEmployee}
              className="bg-[#3366cc] hover:bg-blue-700 text-white"
            >
              직원 등록
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-semibold">직급</TableHead>
                  <TableHead className="font-semibold">이름</TableHead>
                  <TableHead className="font-semibold">연락처</TableHead>
                  <TableHead className="font-semibold">상태</TableHead>
                  <TableHead className="font-semibold">비고</TableHead>
                  <TableHead className="w-24 text-right font-semibold">
                    관리
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEmployees.length > 0 ? (
                  paginatedEmployees.map((employee) => (
                    <TableRow
                      key={employee.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewEmployee(employee.id)}
                    >
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.contact}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            employee.status === "재직중"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{employee.note}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewEmployee(employee.id);
                          }}
                        >
                          상세
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-6 text-gray-500"
                    >
                      검색 결과가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

// 로딩 중 UI
function PersonnelLoading() {
  return (
    <MainLayout activePage="인사" userName="홍길동" pageTitle="인사 관리">
      <div className="rounded-md border bg-white shadow-sm p-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      </div>
    </MainLayout>
  );
}

// 메인 컴포넌트
export default function PersonnelPage() {
  return (
    <Suspense fallback={<PersonnelLoading />}>
      <PersonnelContent />
    </Suspense>
  );
}
