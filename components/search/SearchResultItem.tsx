import type { SearchResult } from "@/types/search";

type SearchResultItemProps = {
  result: SearchResult;
};

const SearchResultItem = ({ result }: SearchResultItemProps) => {
  const { type, title, updatedAt, icon: Icon } = result;
  return (
    <div className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
      <Icon className="w-5 h-5 text-gray-500" />
      <div className="flex flex-col">
        <span className="font-medium">{title}</span>
        <span className="text-sm text-gray-500">{type}</span>
        <span className="text-sm text-gray-400">{updatedAt}</span>
      </div>
    </div>
  );
};

export default SearchResultItem;