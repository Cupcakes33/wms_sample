"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-3xl w-full">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            WMS <span className="text-blue-600">관리 시스템</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-xl">
            업무 관리 및 인사 관리를 위한 통합 시스템에 오신 것을 환영합니다.
          </p>

          <div className="relative w-40 h-40 mb-8">
            <Image
              src="/placeholder.svg"
              alt="WMS 로고"
              layout="fill"
              objectFit="contain"
              className="rounded-full bg-blue-100 p-4"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-blue-100 shadow-md transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-blue-700">
                로그인
              </CardTitle>
              <CardDescription>계정으로 시스템에 접속하세요</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">
                등록된 계정 정보로 시스템에 로그인하여 모든 기능을 이용하세요.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/login")}
              >
                로그인 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-blue-100 shadow-md transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-blue-700">
                인사 관리
              </CardTitle>
              <CardDescription>직원 및 인사 정보를 관리하세요</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">
                직원 정보 조회, 등록, 수정 등 인사 관리 기능을 이용하세요.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/personnel")}
              >
                인사 페이지 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-blue-100 shadow-md transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-blue-700">
                작업 관리
              </CardTitle>
              <CardDescription>작업 및 업무 정보를 관리하세요</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">
                작업 정보 조회, 등록, 진행 상황 관리 등의 기능을 이용하세요.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/work")}
              >
                작업 페이지 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500">
          © 2023 주안건설 WMS 시스템. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
