"use client";

import { Icon, IconifyIcon } from "@iconify/react";

type IconifyProps = {
  icon: string | IconifyIcon;
  className?: string;
  width?: number | string;
  height?: number | string;
  [key: string]: unknown;
};

export default function Iconify({ icon, className = "", width, height, ...props }: IconifyProps) {
  return <Icon icon={icon} className={className} width={width} height={height} {...props} />;
}
