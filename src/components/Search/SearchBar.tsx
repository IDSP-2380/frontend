import { Input } from '@mantine/core';
import { useHomeStore } from '@/stores/homeStore';
import SearchStyles from './Search.module.css';

export default function SearchBar() {
  const { search, setSearch } = useHomeStore();
  return (
    <Input
      placeholder="Search by title or username..."
      rightSection={<img src="/icons/Search.svg" alt="active dropdown icon" />}
      className={SearchStyles.SearchBar}
      classNames={{ input: SearchStyles.SearchInput }}
      name="search"
      onChange={(event) => setSearch(event.currentTarget.value)}
    />
  );
}
