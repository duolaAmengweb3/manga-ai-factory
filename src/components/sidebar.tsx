"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  FolderOpen,
  FileText,
  LayoutGrid,
  Users,
  Mic,
  Palette,
  Film,
  Wrench,
  BarChart3,
  Settings,
  Key,
  BookOpen,
  PenTool,
  Frame,
  Video,
  Headphones,
  Scissors,
  Upload,
  TrendingUp,
  Send,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
  ai?: boolean;
  comingSoon?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "项目",
    items: [
      {
        href: "/projects",
        icon: FolderOpen,
        label: "漫剧工作站",
      },
    ],
  },
  {
    title: "工具",
    items: [
      {
        href: "/tools/script",
        icon: FileText,
        label: "剧本生成器",
        ai: true,
      },
      {
        href: "/tools/storyboard",
        icon: LayoutGrid,
        label: "分镜 Prompt 生成",
        ai: true,
      },
      {
        href: "/tools/characters",
        icon: Users,
        label: "角色管理器",
      },
      {
        href: "/tools/tts",
        icon: Mic,
        label: "配音工具",
      },
      {
        href: "/tools/image-gen",
        icon: Palette,
        label: "图片/视频生成",
        ai: true,
      },
      {
        href: "/tools/composer",
        icon: Film,
        label: "视频合成",
      },
      {
        href: "/tools/prompt-builder",
        icon: Wrench,
        label: "Prompt 组装器",
      },
      {
        href: "/tools/platforms",
        icon: BarChart3,
        label: "平台规则",
      },
      {
        href: "/tools/parameters",
        icon: Settings,
        label: "参数速查",
      },
    ],
  },
  {
    title: "知识库",
    items: [
      { href: "/learn", icon: BookOpen, label: "AI 漫剧入门" },
      { href: "/learn/script", icon: PenTool, label: "剧本创作" },
      { href: "/learn/characters", icon: Users, label: "角色与一致性" },
      { href: "/learn/storyboard", icon: Frame, label: "分镜与 Prompt" },
      { href: "/learn/video", icon: Video, label: "视频生成" },
      { href: "/learn/audio", icon: Headphones, label: "配音与音效" },
      { href: "/learn/editing", icon: Scissors, label: "剪辑合成" },
      { href: "/learn/publishing", icon: Upload, label: "发布与备案" },
      { href: "/learn/monetization", icon: TrendingUp, label: "变现与运营" },
    ],
  },
  {
    title: "设置",
    items: [
      {
        href: "/settings",
        icon: Key,
        label: "AI 设置",
      },
    ],
  },
];

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-7 w-auto" />
          <span className="text-base font-semibold text-foreground tracking-tight">AI 漫剧工作台</span>
        </Link>
      </div>

      <Separator />

      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="px-3 py-4 space-y-4">
          {navSections.map((section, sectionIdx) => (
            <div key={section.title}>
              {sectionIdx > 0 && <Separator className="mb-3" />}
              <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>
              <nav className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" &&
                      pathname.startsWith(item.href + "/"));

                  if (item.comingSoon) {
                    return (
                      <span
                        key={item.href}
                        className="group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm cursor-not-allowed opacity-50 text-muted-foreground"
                      >
                        <item.icon className="size-4 shrink-0" />
                        <span className="truncate flex-1">
                          {item.label}
                        </span>
                        <span className="flex items-center gap-1">
                          {item.ai && (
                            <Badge
                              variant="outline"
                              className="h-4 px-1 text-[10px] border-primary/40 text-primary"
                            >
                              AI
                            </Badge>
                          )}
                          <Badge
                            variant="secondary"
                            className="h-4 px-1 text-[10px]"
                          >
                            {"即将上线"}
                          </Badge>
                        </span>
                      </span>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className={cn(
                        "size-4 shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className="truncate flex-1">{item.label}</span>
                      {item.ai && (
                        <Badge
                          variant="outline"
                          className="h-4 px-1 text-[10px] border-primary/40 text-primary"
                        >
                          AI
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Social links */}
      <div className="px-3 py-3 border-t border-border">
        <a href="https://t.me/+iJbFVuAwd70yNmFl" target="_blank" rel="noopener noreferrer" className="block rounded-lg border border-primary/20 bg-primary/5 p-3 hover:bg-primary/10 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Users className="size-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">AI 漫剧交流群</span>
          </div>
          <p className="text-xs text-muted-foreground">加入 Telegram 群，交流创作经验</p>
        </a>
        <div className="flex items-center gap-3 mt-2 px-1">
          <a href="https://x.com/hunterweb303" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" title="X (Twitter)">
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://t.me/dsa885" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" title="联系客服">
            <Send className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 md:left-0 md:z-30 md:border-r md:border-border md:bg-sidebar">
      <SidebarContent />
    </aside>
  );
}
