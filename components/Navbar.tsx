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
            className=" flex z-40 font-semibold text-purple-500"
          >
            Indian Sign Language Detection
          </Link>

          <div className=" h-full flex items-center space-x-4">
            <Link
              href="/"
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={buttonVariants({
                size: "sm",
                className: "hidden sm:flex items-center gap-1",
              })}
            >
              About
              <ArrowRight className=" ml-1.5 h-5 w-5" />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
