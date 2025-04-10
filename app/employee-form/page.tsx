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

export default function EmployeeFormPage() {
  const router = useRouter();

  return (
    <>
      <EmployeeForm />
      <Toaster />
    </>
  );
}
