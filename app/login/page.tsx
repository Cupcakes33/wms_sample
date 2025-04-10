"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@/components/ui/mui";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import LoginForm from "@/components/login-form";
import { Toaster } from "@/components/ui/toaster";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <Toaster />
    </>
  );
}
