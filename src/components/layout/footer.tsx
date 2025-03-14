import { ShortcutsDialog } from "../shortcuts-dialog";
import { TextMono } from "../ui/text";

export default function Footer() {
  return (
    <footer className="flex justify-between px-2 py-4">
      <TextMono size="xs" className="text-muted-foreground/60">
        &copy; {new Date().getFullYear()} Built by{" "}
        <a
          href="https://oliverpan.vercel.app"
          className="text-foreground/40 hover:text-foreground underline underline-offset-2"
          rel="noopener noreferrer"
          target="_blank"
        >
          Oliver
        </a>
      </TextMono>
      <ShortcutsDialog />
    </footer>
  );
}
