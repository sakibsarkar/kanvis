"use client";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const SearchTemplatet = () => {
  const router = useRouter();

  return (
    <form
      className="flex w-[350px] mb-6"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        router.push("/templates?q=" + form.search.value);
      }}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="h-5 text-muted-foreground w-auto" />
        </div>
        <Input
          type="search"
          name="search"
          onBlur={(e) => router.push("/templates?q=" + e.target.value)}
          placeholder="Search..."
          className="block w-full p-4 pl-10 text-sm text-foreground bg-background border border-input rounded-md shadow-sm focus:ring-primary focus:border-primary"
        />
      </div>
      <Button type="submit" variant="secondary" className="ml-[10px]">
        Search
      </Button>
    </form>
  );
};

export default SearchTemplatet;
