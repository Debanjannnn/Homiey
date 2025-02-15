"use client";
import React from "react";
import { FloatingNav } from "../components/ui/floating-navbar";
import { IconHome, IconBook, IconMessageCircle, IconUser } from "@tabler/icons-react";

export default function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "",
      id: "hero",
      icon: <IconHome className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Features",
      link: "",
      id: "features",
      icon: <IconBook className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contribute",
      link: "",
      id: "contribute",
      icon: <IconMessageCircle className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "FAQ",
      link: "",
      id: "faq",
      icon: <IconUser className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "",
      id: "footer",
      icon: <IconMessageCircle className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <div className="relative w-full pt-4">
      <FloatingNav navItems={navItems} />
       
    </div>
  );
}
