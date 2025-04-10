"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const loginSchema = z.object({
  username: z
    .string()
    .min(4, { message: "아이디는 최소 4자 이상이어야 합니다." }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// LoginContent 컴포넌트 분리
function LoginContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      // TODO: 실제 로그인 API 연동
      console.log("로그인 시도:", data);

      // 임시 로그인 성공 처리
      setTimeout(() => {
        toast.success("로그인 성공");
        router.push("/personnel");
      }, 1000);
    } catch (error) {
      console.error("로그인 오류:", error);
      toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // 비밀번호 찾기 기능 구현
    toast.info("비밀번호 찾기 기능은 준비 중입니다.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-[#3366cc] text-white p-6 flex items-center justify-center text-2xl font-bold mb-4 rounded-t-lg shadow-md">
          WMS 관리 시스템
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-b-lg"
        >
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">아이디</Label>
              <div className="flex items-center relative">
                <Input
                  id="username"
                  type="text"
                  className="w-full px-3 py-2 rounded border"
                  placeholder="아이디를 입력해주세요"
                  {...register("username")}
                  disabled={isLoading}
                  aria-invalid={errors.username ? "true" : "false"}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <div className="flex items-center relative">
                <Input
                  id="password"
                  type="password"
                  className="w-full px-3 py-2 rounded border"
                  placeholder="비밀번호를 입력해주세요"
                  {...register("password")}
                  disabled={isLoading}
                  aria-invalid={errors.password ? "true" : "false"}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#3366cc] hover:bg-blue-700 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-600 text-sm hover:underline"
                disabled={isLoading}
              >
                비밀번호 찾기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// 로딩 중 UI
function LoginLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-[#3366cc] text-white p-6 flex items-center justify-center text-2xl font-bold mb-4 rounded-t-lg shadow-md">
          WMS 관리 시스템
        </div>
        <div className="bg-white shadow-md rounded-b-lg p-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 메인 컴포넌트
export default function LoginForm() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}
