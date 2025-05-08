import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom';
import { Button, FloatingIndicator, NumberInput, Tabs, TextInput } from '@mantine/core';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import StoryCard from '@/components/Cards/StoryCard';
import { HeaderMenu } from '@/components/Header/HeaderMenu';
import StoryFilters from '@/components/StoryFilters/StoryFilters';
import HomeTabs from '@/components/Tabs/Tabs';
import TextEditor from '@/components/TextEditor/TextEditor';
import { usePublicStoryStore } from '@/stores/publicStoryStore';
import { useStoryConfigStore } from '@/stores/storyStore';
import StoryCardStyles from '../components/Cards/StoryCard.module.css';
import StoryFilterStyles from '../components/StoryFilters/StoryFilters.module.css';
import FormClasses from '../components/StoryForm/Form.module.css';
import HomeStyles from '../styles/home.module.css';

export function StoriesAndDrafts() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  interface ILink {
    content: string;
    author: string;
    stage: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface IChain {
    isComplete: boolean
    links: ILink[]
}

  interface IStory {
    title: string;
    isPublic: boolean;
    contributors: string[];
    status: 'ongoing' | 'completed' | 'drafting';
    createdAt: Date;
    updatedAt: Date;
    chains: IChain[];
    maxWordCount: number;
    numberOfLinks: number;
    startDate?: Date;
    endDate?: Date;
    writingOrder?: string[];
    timePerTurn?: string;
  }

  const [storyData, setStoryData] = useState<IStory[]>([]);

  useEffect(() => {
    const getStories = async () => {
      try {
        const stories = await axios.get('http://localhost:3000/api/stories/stories-and-drafts');
        setStoryData(stories.data);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
      }
    };

    getStories();
  }, []);



  

  return (
    <>
      <HeaderMenu />
      <div className={HomeStyles.TabsWrapper}>
        <HomeTabs
          icon1Active="/icons/ListNumbers_active.svg"
          icon2Active="/icons/Globe.svg"
          icon3Active="/icons/Lock.svg"
          icon1Inactive="/icons/ListNumbers_inactive.svg"
          icon2Inactive="/icons/Globe-gray.svg"
          icon3Inactive="/icons/Lock-gray.svg"
          label1="All"
          label2="Public"
          label3="Private"
          panel1="All"
          panel2="Public"
          panel3="Private"
        />
      </div>
      <main className={HomeStyles.Main}>
        <div className={StoryFilterStyles.StoryFilterHeader}>
          <StoryFilters />
        </div>
        <h2>In progress</h2>
        <div className={StoryCardStyles.FilteredStories}>
        {storyData.map((story) => (
            <StoryCard
            title={story.title}
            chainLength={story.chains.length}
            draftingLink={4}
            status={story.isPublic ? "Public" : "Private"}
            statusIcon="/icons/Globe.svg"
            preview={story.chains[0]?.links[0]?.content}
            primaryPath="/story"
            primaryButtonLabel="Go to editor"
            secondaryPath="/story"
            secondaryButtonLabel="View story"
            />
        ))}
        </div>

        <h2>Completed</h2>
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
        </div>
      </main>
    </>
  );
}
