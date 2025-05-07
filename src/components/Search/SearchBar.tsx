import { Autocomplete } from '@mantine/core';
import { useFilterStore } from '@/stores/filterStore';
import SearchStyles from './Search.module.css';

const { stories, setStories } = useFilterStore();

export default function SearchBar() {
  return (
    <Autocomplete
      placeholder="Search by title or username..."
      limit={5}
      data={stories.map((story) => story.title)}
      rightSection={<img src="/icons/Search.svg" alt="active dropdown icon" />}
      className={SearchStyles.SearchBar}
      classNames={{ input: SearchStyles.SearchInput }}
    />
  );
}
