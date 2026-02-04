import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Main Pagination container
function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex justify-center items-center w-full", className)}
      {...props}
    />
  );
}

// UL container
function PaginationContent({ className, ...props }) {
  return <ul className={cn("flex items-center gap-2", className)} {...props} />;
}

// LI container
function PaginationItem({ ...props }) {
  return <li {...props} />;
}

// Page link button
function PaginationLink({ className, isActive, size = "icon", ...props }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "ghost",
          size: "icon",
          className:
            "rounded-full w-9 h-9 flex items-center justify-center p-0",
        }),
        className,
        isActive && "bg-blue-500 text-white hover:bg-blue-600",
      )}
      {...props}
    />
  );
}

// Previous button
function PaginationPrevious({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      {...props}
      className={cn(
        "rounded-full w-9 h-9 flex items-center justify-center",
        className,
      )}
    >
      <ChevronLeftIcon className="w-4 h-4" />
    </PaginationLink>
  );
}

// Next button
function PaginationNext({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      {...props}
      className={cn(
        "rounded-full w-9 h-9 flex items-center justify-center",
        className,
      )}
    >
      <ChevronRightIcon className="w-4 h-4" />
    </PaginationLink>
  );
}

// Ellipsis
function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center w-9 h-9 text-gray-500",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon className="w-4 h-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
