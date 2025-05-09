import SearchBar from '../Search/SearchBar';
import SelectDropdown from '../SelectDropdown/SelectDropdown';
import HomeTabs from '../Tabs/Tabs';
import StoryFilterStyles from './StoryFilters.module.css';

export default function StoryFilters() {
  return (
    <div className={StoryFilterStyles.Filters}>
      <SearchBar />
      <SelectDropdown
        label={'Sort by:'}
        options={[
          'Recently Updated',
          'Oldest Story',
          // 'Most Liked',
          // 'Longest Chain',
          // 'Shortest Chain',
        ]}
      />
    </div>
  );
}
