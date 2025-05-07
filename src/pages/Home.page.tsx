import { useState } from 'react';
import StoryCard from '@/components/Cards/StoryCard';
import StoryFilterHeader from '@/components/StoryFilterHeader/StoryFilterHeader';
import StoryCardStyles from '../components/Cards/StoryCard.module.css';
import StoryFilterStyles from '../components/StoryFilterHeader/StoryFilterHeader.module.css';
import HomeStyles from '../styles/home.module.css';

export function HomePage() {
  return (
    <main className={HomeStyles.Main}>
      <div className={StoryFilterStyles.StoryFilterHeader}>
        <StoryFilterHeader />
      </div>
      <div className={StoryCardStyles.FilteredStories}>
        <StoryCard
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
        />
        <StoryCard
          title="The key in the Vines"
          chainLength={7}
          currentTurn={5}
          totalTurns={15}
          status="Private"
          statusIcon="/icons/Lock.svg"
          preview="Mira stumbled on the key by accident, buried in the thick vines behind her grandmother’s cottage. It was silver, cool to the touch, and shaped like a crescent moon. Her grandmother had always warned her to stay out of the old garden—said it was “too hungry.” But the key pulsed in her palm like a heartbeat. Something wanted to be found. Mira brushed dirt from the key’s teeth. A soft wind stirred the leaves, and somewhere in the brush, something clicked."
          primaryPath="/story"
          primaryButtonLabel="Go to project page"
        />
        <StoryCard
          title="The key in the Vines"
          chainLength={7}
          draftingLink={4}
          status="Public"
          statusIcon="/icons/Globe.svg"
          preview="Mira stumbled on the key by accident, buried in the thick vines behind her grandmother’s cottage. It was silver, cool to the touch, and shaped like a crescent moon. Her grandmother had always warned her to stay out of the old garden—said it was “too hungry.” But the key pulsed in her palm like a heartbeat. Something wanted to be found. Mira brushed dirt from the key’s teeth. A soft wind stirred the leaves, and somewhere in the brush, something clicked."
          primaryPath="/story"
          primaryButtonLabel="Go to editor"
          secondaryPath="/story"
          secondaryButtonLabel="View story"
        />

        {/* 
  status,
  statusIcon,
  updated,
  primaryPath,
  primaryButtonLabel,
  secondaryPath,
  secondaryButtonLabel, */}
      </div>
    </main>
  );
}
