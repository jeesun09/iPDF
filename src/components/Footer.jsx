import Link from "next/link";
import { memo } from "react";

const Footer = () => {
  return (
    <footer className="p-5 text-center border-t text-sm space-y-1 text-gray-500 w-full">
      <div className="flex justify-center divide-x">
        <Link href="/" className="px-3">
          Home
        </Link>
        <Link href="/about" className="px-3">
          About
        </Link>
      </div>
      <div>&copy; {new Date().getFullYear()} iPDF.</div>
    </footer>
  );
};

export default memo(Footer);
