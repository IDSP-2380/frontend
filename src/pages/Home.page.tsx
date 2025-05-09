import { useEffect } from 'react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Box } from '@mantine/core';
import { api } from '@/api/axios';
import StoryCard from '@/components/Cards/StoryCard';
import StoryFilters from '@/components/StoryFilters/StoryFilters';
import HomeTabs from '@/components/Tabs/Tabs';
import useHome from '@/hooks/useHome';
import { useHomeStore } from '@/stores/homeStore';
import { IStory } from '@/stores/storyStore';
import StoryCardStyles from '../components/Cards/StoryCard.module.css';
import StoryFilterStyles from '../components/StoryFilters/StoryFilters.module.css';
import HomeStyles from '../styles/home.module.css';

export function HomePage() {
  const { activeTab, stories } = useHome();

  return (
    <>
      <div className={HomeStyles.TabsWrapper}>
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
        />
        <input type="hidden" name="activeTab" value={activeTab ? activeTab : ''} />
        <div className={StoryFilterStyles.StoryFilterHeader}>
          <StoryFilters />
        </div>
      </div>
      <main className={HomeStyles.Main}>
        <Box className={StoryCardStyles.FilteredStories}>
          {stories.map((story) => {
            const options: Intl.DateTimeFormatOptions = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
            return (
              <StoryCard
                title={story.title}
                collaborators={story.contributors.length}
                chains={story.chains.length}
                longestChain={Math.max(...story.chains.map((chain) => chain.links.length))}
                chainLength={story.numberOfLinks}
                status={story.status}
                preview={story.chains[0].links[0].content}
                updated={new Date(story.updatedAt).toLocaleDateString(undefined, options)}
                primaryPath="/story"
                primaryButtonLabel="View story"
              />
            );
          })}
          {/* <StoryCard
            title="The key in the Vines"
            collaborators={4}
            chains={4}
            longestChain={4}
            chainLength={7}
            status="Ongoing"
            preview="Mira stumbled on the key by accident, buried in the thick vines behind her grandmother’s cottage. It was silver, cool to the touch, and shaped like a crescent moon. Her grandmother had always warned her to stay out of the old garden—said it was “too hungry.” But the key pulsed in her palm like a heartbeat. Something wanted to be found. Mira brushed dirt from the key’s teeth. A soft wind stirred the leaves, and somewhere in the brush, something clicked."
            updated="April 20, 2025"
            primaryPath="/story"
            primaryButtonLabel="View story"
          /> */}
        </Box>
      </main>
    </>
  );
}
