import { twMerge } from "tailwind-merge";

export function SidebarTop() {
  return (
    <div
      className={twMerge(
        "flex z-40 w-full h-auto items-center justify-center",
        "h-20 mb-10"
      )}
    >
      LOGO
    </div>
  );
}
