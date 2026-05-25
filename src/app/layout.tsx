import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI 漫剧工作台",
    template: "%s · AI 漫剧工作台",
  },
  description: "AI 漫剧创作者的全链路生产工具——从写剧本到赚钱，一个工具全搞定",
  keywords: ["AI漫剧", "AI漫画", "短剧", "漫剧制作", "AI短剧", "分镜prompt", "角色一致性"],
  authors: [{ name: "AI 漫剧工作台" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
