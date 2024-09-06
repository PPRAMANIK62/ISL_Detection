import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <nav className=" sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-purple-500 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className=" flex h-14 items-center justify-between border-b border-purple-500">
          <Link
            href="/"
            className={buttonVariants({
              size: 'lg',
              variant: "ghost",
            })}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={buttonVariants({
              size: "lg",
              className: "sm:flex items-center gap-1",
            })}
          >
            About
            <ArrowRight className=" ml-1.5 h-5 w-5" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
