"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  TextField,
  MenuItem,
  Grid,
  AppBar,
  Toolbar,
  Avatar,
} from "@/components/ui/mui";
import { ArrowLeft, Save, Trash2, Edit } from "lucide-react";
import EmployeeForm from "@/components/employee-form";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

// 로딩 UI
function EmployeeFormPageLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>
  );
}

export default function EmployeeFormPage() {
  const router = useRouter();

  return (
    <>
      <EmployeeForm />
      <Toaster />
    </>
  );
}
