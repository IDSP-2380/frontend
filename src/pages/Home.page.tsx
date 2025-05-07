import { useState } from 'react';
import StoryCard from '@/components/Cards/StoryCard';
import SearchBar from '@/components/Search/SearchBar';
import SelectDropdown from '@/components/SelectDropdown/SelectDropdown';
import HomeTabs from '@/components/Tabs/HomeTabs';
import StoryCardStyles from '../components/Cards/StoryCard.module.css';

export function HomePage() {
  return (
    <>
      <HomeTabs />
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
      <div className={StoryCardStyles.FilteredStories}>
        <StoryCard
          title="The key in the Vines"
          contributors={4}
          chains={4}
          longestChain={4}
          chainLength={7}
          status="ongoing"
          preview="Mira stumbled on the key by accident, buried in the thick vines behind her grandmother’s cottage. It was silver, cool to the touch, and shaped like a crescent moon. Her grandmother had always warned her to stay out of the old garden—said it was “too hungry.” But the key pulsed in her palm like a heartbeat. Something wanted to be found. Mira brushed dirt from the key’s teeth. A soft wind stirred the leaves, and somewhere in the brush, something clicked."
          updated="April 20, 2025"
        />
      </div>
    </>
  );
}
