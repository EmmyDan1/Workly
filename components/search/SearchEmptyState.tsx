import Image from "next/image";
import { Search } from "lucide-react";

const SearchEmptyState = () => {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden -translate-y-12">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center ">
        <Image
          src="/images/search-bg.webp"
          alt=""
          width={200}
          height={200}
          className="opacity-50 select-none rounded-4xl"
        />
        <div className="absolute ">
          <Search
            size={48}
            strokeWidth={1.8}
            className="text-accent animate-bounce"
          />
        </div>
      </div>
      <div className="z-10 flex flex-col items-center text-center mt-60 ">
        <h2 className="text-md font-semibold text-foreground-subtle">
          Find issues, projects, initiatives and documents
        </h2>
      </div>
    </div>
  );
};

export default SearchEmptyState 
