import SearchBar from '../Search/SearchBar';
import SelectDropdown from '../SelectDropdown/SelectDropdown';
import HomeTabs from '../Tabs/Tabs';
import StoryFilterStyles from './StoryFilterHeader.module.css';

export default function StoryFilterHeader() {
  return (
    <>
      <HomeTabs
        icon1Active="/icons/ListNumbers_active.svg"
        icon2Active="/icons/BookOpenText_active.svg"
        icon3Active="/icons/Book_active.svg"
        icon1Inactive="/icons/ListNumbers_inactive.svg"
        icon2Inactive="/icons/BookOpenText_inactive.svg"
        icon3Inactive="/icons/Book_inactive.svg"
        label1="All"
        label2="Ongoing"
        label3="Completed"
        panel1="All"
        panel2="Ongoing"
        panel3="Completed"
      />
      <div className={StoryFilterStyles.Filters}>
        <SearchBar />
        <SelectDropdown
          label={'Sort by:'}
          options={[
            'Recently Updated',
            'Oldest Story',
            'Most Liked',
            'Longest Chain',
            'Shortest Chain',
          ]}
        />
      </div>
    </>
  );
}

//  icon1Active: string;
//   icon2Active: string;
//   icon3Active: string;
//   icon1Inactive: string;
//   icon2Inactive: string;
//   icon3Inactive: string;
//   label1: string;
//   label2: string;
//   label3: string;
//   panel1: string;
//   panel2: string;
//   panel3: string;
