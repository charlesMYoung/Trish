import * as React from "react";
import Link from "next/link";
import clsx from "clsx";

type SidebarItemProps = {
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
};

export function SidebarItem({
  children,
  href,
  icon,
  isActive,
}: SidebarItemProps) {
  return (
    <Link href={href} className="text-default-900 active:bg-none max-w-full">
      <div
        className={clsx(
          isActive
            ? "bg-primary-100 [&_svg_path]:fill-primary-500"
            : "hover:bg-default-100",
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
      >
        {icon}
        <span className="text-default-900">{children}</span>
      </div>
    </Link>
  );
}
