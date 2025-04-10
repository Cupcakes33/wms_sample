"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainLayout } from "@/components/layouts/main-layout";
import { toast } from "sonner";

// 직원 데이터 타입 정의
interface Employee {
  id: string;
  position: string;
  name: string;
  birthdate: string;
  contact: string;
  department: string;
  status: "재직중" | "퇴사";
  note: string;
}

// 샘플 직원 데이터
const sampleEmployees: Employee[] = [
  {
    id: "emp001",
    position: "팀장",
    name: "홍길동",
    birthdate: "1980-05-15",
    contact: "010-1234-1234",
    department: "설비",
    status: "재직중",
    note: "급여일 휴무",
  },
  {
    id: "emp002",
    position: "사원",
    name: "김철수",
    birthdate: "1990-03-22",
    contact: "010-2345-2345",
    department: "전기",
    status: "재직중",
    note: "",
  },
];

const employeeSchema = z.object({
  name: z.string().min(2, { message: "이름은 최소 2자 이상이어야 합니다." }),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "YYYY-MM-DD 형식으로 입력해주세요.",
    }),
  contact: z
    .string()
    .regex(/^\d{3}-\d{4}-\d{4}$/, {
      message: "000-0000-0000 형식으로 입력해주세요.",
    }),
  position: z.string().min(1, { message: "직급을 선택해주세요." }),
  department: z.string().min(1, { message: "부서를 선택해주세요." }),
  status: z.enum(["재직중", "퇴사"], {
    required_error: "상태를 선택해주세요.",
  }),
  note: z.string().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

export default function EmployeeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");
  const isEditMode = !!employeeId;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      birthdate: "",
      contact: "",
      position: "",
      department: "",
      status: "재직중",
      note: "",
    },
  });

  // 직원 조회 (수정 모드인 경우)
  useEffect(() => {
    if (employeeId) {
      const employee = sampleEmployees.find((emp) => emp.id === employeeId);
      if (employee) {
        reset({
          name: employee.name,
          birthdate: employee.birthdate,
          contact: employee.contact,
          position: employee.position,
          department: employee.department,
          status: employee.status,
          note: employee.note,
        });
      }
    }
  }, [employeeId, reset]);

  const onSubmit = async (data: EmployeeFormValues) => {
    setIsLoading(true);

    try {
      // 실제 API 연동 대신 임시로 setTimeout 사용
      setTimeout(() => {
        if (isEditMode) {
          toast.success("직원 정보가 수정되었습니다.");
        } else {
          toast.success("직원이 등록되었습니다.");
        }
        router.push("/personnel");
      }, 1000);
    } catch (error) {
      console.error("직원 정보 저장 오류:", error);
      toast.error("저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (confirm("정말로 이 직원을 삭제하시겠습니까?")) {
      setIsLoading(true);

      // 실제 API 연동 대신 임시로 setTimeout 사용
      setTimeout(() => {
        toast.success("직원이 삭제되었습니다.");
        router.push("/personnel");
      }, 1000);
    }
  };

  return (
    <MainLayout
      activePage="인사"
      userName="홍길동"
      pageTitle={isEditMode ? "직원 정보 수정" : "직원 등록"}
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{isEditMode ? "직원 정보 수정" : "직원 등록"}</CardTitle>
            <CardDescription>
              {isEditMode
                ? "직원 정보를 수정하고 저장 버튼을 클릭하세요."
                : "새로운 직원 정보를 입력하고 등록 버튼을 클릭하세요."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    이름 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    disabled={isLoading}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthdate">
                    생년월일 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="birthdate"
                    placeholder="YYYY-MM-DD"
                    {...register("birthdate")}
                    disabled={isLoading}
                    aria-invalid={errors.birthdate ? "true" : "false"}
                  />
                  {errors.birthdate && (
                    <p className="text-xs text-red-500">
                      {errors.birthdate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">
                    전화번호 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contact"
                    placeholder="000-0000-0000"
                    {...register("contact")}
                    disabled={isLoading}
                    aria-invalid={errors.contact ? "true" : "false"}
                  />
                  {errors.contact && (
                    <p className="text-xs text-red-500">
                      {errors.contact.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">
                    직급 <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    disabled={isLoading}
                    onValueChange={(value) => setValue("position", value)}
                    defaultValue={
                      isEditMode
                        ? sampleEmployees.find((emp) => emp.id === employeeId)
                            ?.position
                        : ""
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="직급 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="사원">사원</SelectItem>
                      <SelectItem value="팀장">팀장</SelectItem>
                      <SelectItem value="책임자">책임자</SelectItem>
                      <SelectItem value="관리자">관리자</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.position && (
                    <p className="text-xs text-red-500">
                      {errors.position.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">
                    부서 <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    disabled={isLoading}
                    onValueChange={(value) => setValue("department", value)}
                    defaultValue={
                      isEditMode
                        ? sampleEmployees.find((emp) => emp.id === employeeId)
                            ?.department
                        : ""
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="부서 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="설비">설비</SelectItem>
                      <SelectItem value="전기">전기</SelectItem>
                      <SelectItem value="배관">배관</SelectItem>
                      <SelectItem value="냉난방">냉난방</SelectItem>
                      <SelectItem value="행정">행정</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-xs text-red-500">
                      {errors.department.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    상태 <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    defaultValue={
                      isEditMode
                        ? sampleEmployees.find((emp) => emp.id === employeeId)
                            ?.status
                        : "재직중"
                    }
                    onValueChange={(value) =>
                      setValue("status", value as "재직중" | "퇴사")
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="재직중" id="status-active" />
                      <Label htmlFor="status-active">재직중</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="퇴사" id="status-inactive" />
                      <Label htmlFor="status-inactive">퇴사</Label>
                    </div>
                  </RadioGroup>
                  {errors.status && (
                    <p className="text-xs text-red-500">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">비고</Label>
                <Textarea
                  id="note"
                  rows={3}
                  {...register("note")}
                  disabled={isLoading}
                  placeholder="추가 정보가 있으면 입력해주세요."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  onClick={() => router.push("/personnel")}
                >
                  취소
                </Button>

                <div className="flex flex-col sm:flex-row gap-2">
                  {isEditMode && (
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={isLoading}
                      onClick={handleDelete}
                    >
                      삭제
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="bg-[#3366cc] hover:bg-blue-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "처리 중..." : isEditMode ? "저장" : "등록"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
