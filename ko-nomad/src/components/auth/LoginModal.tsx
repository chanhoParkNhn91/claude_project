"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState<string>("login");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로그인 폼 상태
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // 회원가입 폼 상태
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const resetForm = () => {
    setLoginEmail("");
    setLoginPassword("");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setError("");
    setIsSubmitting(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(loginEmail, loginPassword);
      resetForm();
      onOpenChange(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "로그인에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signup(signupEmail, signupPassword, signupName);
      resetForm();
      onOpenChange(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "회원가입에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            KoNomad에 오신 걸 환영합니다
          </DialogTitle>
          <DialogDescription className="text-center">
            디지털 노마드를 위한 대한민국 도시 가이드
          </DialogDescription>
        </DialogHeader>

        {/* 소셜 로그인 버튼 */}
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            className="h-11 w-full font-medium"
            style={{ backgroundColor: "#FEE500", color: "#191919" }}
            onClick={() => alert("카카오 로그인은 준비 중입니다")}
          >
            <svg
              className="mr-2 size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3C6.48 3 2 6.36 2 10.44c0 2.62 1.74 4.93 4.36 6.24l-1.1 4.07c-.1.35.3.64.6.44l4.83-3.2c.43.04.87.07 1.31.07 5.52 0 10-3.36 10-7.62C22 6.36 17.52 3 12 3z" />
            </svg>
            카카오로 시작하기
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full font-medium"
            onClick={() => alert("구글 로그인은 준비 중입니다")}
          >
            <svg className="mr-2 size-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            구글로 시작하기
          </Button>
        </div>

        {/* 구분선 */}
        <div className="relative flex items-center py-2">
          <Separator className="flex-1" />
          <span className="px-3 text-xs text-muted-foreground">또는</span>
          <Separator className="flex-1" />
        </div>

        {/* 탭: 로그인 / 회원가입 */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full">
            <TabsTrigger value="login" className="flex-1">
              로그인
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex-1">
              회원가입
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="flex flex-col gap-3 pt-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-email"
                  className="text-sm font-medium"
                >
                  이메일
                </label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium"
                >
                  비밀번호
                </label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              {error && tab === "login" && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button
                type="submit"
                className="h-10 w-full bg-[#FF6B6B] text-white hover:bg-[#FF5252]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "로그인 중..." : "로그인"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="flex flex-col gap-3 pt-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="signup-name"
                  className="text-sm font-medium"
                >
                  이름
                </label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="signup-email"
                  className="text-sm font-medium"
                >
                  이메일
                </label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="signup-password"
                  className="text-sm font-medium"
                >
                  비밀번호
                </label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="비밀번호를 입력하세요 (6자 이상)"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              {error && tab === "signup" && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button
                type="submit"
                className="h-10 w-full bg-[#FF6B6B] text-white hover:bg-[#FF5252]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "가입 중..." : "회원가입"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* 테스트 계정 안내 */}
        <p className="text-center text-xs text-muted-foreground">
          테스트용: test@konomad.com / password123
        </p>
      </DialogContent>
    </Dialog>
  );
}
