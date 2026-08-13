import type {SearchResult} from "@/types/search";
import SearchResultItem from "./SearchResultItem";

type SearchResultsProps = {
  results: SearchResult[];
};
const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div>
      {results.map((result) => (
        <SearchResultItem key={result.id} result={result} />
      ))}
    </div>
  );
};

export default SearchResults;
