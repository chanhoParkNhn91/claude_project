import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#FF6B6B]">KoNomad</span>
        </Link>

        <div className="hidden md:flex md:flex-1 md:justify-center md:px-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="도시 검색..."
              className="h-9 pl-9 pr-4"
            />
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            로그인
          </Button>
          <Button
            size="sm"
            className="bg-[#FF6B6B] text-white hover:bg-[#FF5252]"
          >
            회원가입
          </Button>
        </nav>
      </div>
    </header>
  );
}
