"use client";

import { cn } from "@/lib/utils";
import { Radio, RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted)
    return (
      <div className='border-border flex items-center'>
        <div className='p-2 text-muted-foreground'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='size-4'
          >
            <path d='M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z' />
          </svg>
        </div>
        <div className='p-2 text-muted-foreground'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='size-4'
          >
            <path d='M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586Z' />
          </svg>
        </div>
        <div className='p-2 text-muted-foreground'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='size-4'
          >
            <path
              fillRule='evenodd'
              d='M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v5.5A2.25 2.25 0 0 1 11.75 12h-1.312c.1.128.21.248.328.36a.75.75 0 0 1 .234.545v.345a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-.345a.75.75 0 0 1 .234-.545c.118-.111.228-.232.328-.36H4.25A2.25 2.25 0 0 1 2 9.75v-5.5Zm2.25-.75a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-7.5Z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>
    );

  return (
    <RadioGroup
      className='border-border flex items-center'
      onChange={(value) => setTheme(value)}
      value={theme}
    >
      <Radio
        value='light'
        className={cn(
          "p-2",
          theme === "light"
            ? "text-foreground data-checked:bg-border/50"
            : "text-muted-foreground hover:bg-border/35"
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='size-4'
        >
          <path d='M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z' />
        </svg>

        <span className='sr-only'>Light Mode</span>
      </Radio>
      <Radio
        value='dark'
        className={cn(
          "p-2",
          theme === "dark"
            ? "text-foreground data-checked:bg-border/50"
            : "text-muted-foreground hover:bg-border/35"
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='size-4'
        >
          <path d='M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586Z' />
        </svg>

        <span className='sr-only'>Dark Mode</span>
      </Radio>
      <Radio
        value='system'
        className={cn(
          "p-2",
          theme === "system"
            ? "text-foreground data-checked:bg-border/50"
            : "text-muted-foreground hover:bg-border/35"
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='size-4'
        >
          <path
            fillRule='evenodd'
            d='M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v5.5A2.25 2.25 0 0 1 11.75 12h-1.312c.1.128.21.248.328.36a.75.75 0 0 1 .234.545v.345a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-.345a.75.75 0 0 1 .234-.545c.118-.111.228-.232.328-.36H4.25A2.25 2.25 0 0 1 2 9.75v-5.5Zm2.25-.75a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-7.5Z'
            clipRule='evenodd'
          />
        </svg>

        <span className='sr-only'>System</span>
      </Radio>
    </RadioGroup>
  );
}
