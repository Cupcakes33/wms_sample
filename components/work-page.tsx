"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 작업 데이터 타입 정의
interface WorkItem {
  id: string;
  location: string;
  type: string;
  size: string;
  materialCost: string;
  laborCost: string;
  expenseCost: string;
  status: "진행중" | "완료" | "대기중";
}

// 샘플 작업 데이터
const sampleWorkItems: WorkItem[] = [
  {
    id: "간석NC1",
    location: "용이역1 지하철 공사",
    type: "배관",
    size: "M2",
    materialCost: "18,350,000",
    laborCost: "8,563,000",
    expenseCost: "2,450,000",
    status: "진행중",
  },
  {
    id: "간석NO1",
    location: "신도시 아파트 단지",
    type: "배관",
    size: "M2",
    materialCost: "12,450,000",
    laborCost: "6,230,000",
    expenseCost: "1,850,000",
    status: "대기중",
  },
  {
    id: "구월B2",
    location: "상업시설 리모델링",
    type: "설비",
    size: "L1",
    materialCost: "24,750,000",
    laborCost: "9,820,000",
    expenseCost: "3,150,000",
    status: "완료",
  },
  {
    id: "도화T5",
    location: "공공기관 시설보수",
    type: "전기",
    size: "S3",
    materialCost: "8,620,000",
    laborCost: "4,350,000",
    expenseCost: "1,230,000",
    status: "진행중",
  },
  {
    id: "송림C3",
    location: "물류센터 설비공사",
    type: "냉난방",
    size: "XL2",
    materialCost: "32,450,000",
    laborCost: "15,230,000",
    expenseCost: "4,850,000",
    status: "대기중",
  },
];

export default function WorkPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");

  // 필터링된 작업 목록
  const filteredWorkItems = sampleWorkItems.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" ? true : item.type === typeFilter;

    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "in-progress"
        ? item.status === "진행중"
        : activeTab === "waiting"
        ? item.status === "대기중"
        : item.status === "완료";

    return matchesSearch && matchesType && matchesTab;
  });

  // 타입별 통계 계산
  const typeStats = sampleWorkItems.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = { count: 0, total: 0 };
    }

    acc[item.type].count += 1;
    acc[item.type].total +=
      parseInt(item.materialCost.replace(/,/g, "")) +
      parseInt(item.laborCost.replace(/,/g, "")) +
      parseInt(item.expenseCost.replace(/,/g, ""));

    return acc;
  }, {} as Record<string, { count: number; total: number }>);

  // 상태별 작업 수량 계산
  const statusCounts = sampleWorkItems.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 콤마 추가 함수 (숫자 포맷팅)
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <MainLayout activePage="작업" userName="홍길동" pageTitle="작업 관리">
      <div className="grid gap-4 md:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">전체 작업</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleWorkItems.length}건</div>
            <p className="text-xs text-muted-foreground">
              총 예산:{" "}
              {formatNumber(
                sampleWorkItems.reduce(
                  (acc, item) =>
                    acc +
                    parseInt(item.materialCost.replace(/,/g, "")) +
                    parseInt(item.laborCost.replace(/,/g, "")) +
                    parseInt(item.expenseCost.replace(/,/g, "")),
                  0
                )
              )}
              원
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              진행 중인 작업
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statusCounts["진행중"] || 0}건
            </div>
            <p className="text-xs text-muted-foreground">
              전체의{" "}
              {Math.round(
                ((statusCounts["진행중"] || 0) / sampleWorkItems.length) * 100
              )}
              %
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">완료된 작업</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statusCounts["완료"] || 0}건
            </div>
            <p className="text-xs text-muted-foreground">
              전체의{" "}
              {Math.round(
                ((statusCounts["완료"] || 0) / sampleWorkItems.length) * 100
              )}
              %
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <div className="p-4">
          <Tabs
            defaultValue="all"
            className="mb-4"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="in-progress">진행 중</TabsTrigger>
              <TabsTrigger value="waiting">대기 중</TabsTrigger>
              <TabsTrigger value="completed">완료</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Input
                placeholder="호표 또는 공종명 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="공종 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 공종</SelectItem>
                  <SelectItem value="배관">배관</SelectItem>
                  <SelectItem value="설비">설비</SelectItem>
                  <SelectItem value="전기">전기</SelectItem>
                  <SelectItem value="냉난방">냉난방</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-[#3366cc] hover:bg-blue-700 text-white">
              신규 작업 등록
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-semibold">호표</TableHead>
                  <TableHead className="font-semibold">공종명</TableHead>
                  <TableHead className="font-semibold">공종</TableHead>
                  <TableHead className="font-semibold">규격</TableHead>
                  <TableHead className="font-semibold">재료비</TableHead>
                  <TableHead className="font-semibold">노무비</TableHead>
                  <TableHead className="font-semibold">경비</TableHead>
                  <TableHead className="font-semibold">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkItems.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.materialCost}</TableCell>
                    <TableCell>{item.laborCost}</TableCell>
                    <TableCell>{item.expenseCost}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs
                        ${
                          item.status === "진행중"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "완료"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredWorkItems.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-6 text-gray-500"
                    >
                      검색 결과가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
