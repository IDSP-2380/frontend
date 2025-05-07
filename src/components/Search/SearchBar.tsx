import { Autocomplete } from '@mantine/core';

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

export default function SearchBar() {
  return (
    <Autocomplete
      placeholder="Search by title or username..."
      limit={5}
      data={largeData}
      rightSection={<img src="/icons/Search.svg" alt="active dropdown icon" />}
      // styles={}
    />
  );
}
