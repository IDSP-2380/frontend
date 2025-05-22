import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mantine/core';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import StoryCard from '@/components/Cards/StoryCard';
import { HeaderMenu } from '@/components/Header/HeaderMenu';
import StoryFilters from '@/components/StoryFilters/StoryFilters';
import HomeTabs from '@/components/Tabs/Tabs';
import useHome from '@/hooks/useHome';
import StoryCardStyles from '../components/Cards/StoryCard.module.css';
import StoryFilterStyles from '../components/StoryFilters/StoryFilters.module.css';
import HomeStyles from '../styles/home.module.css';

export function HomePage() {
  const { activeTab, stories } = useHome();
  const navigate = useNavigate();

  return (
    <>
      <HeaderMenu />
      <Box className={HomeStyles.Wrapper}>
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
          {/* <input type="hidden" name="activeTab" value={activeTab ? activeTab : ''} /> */}
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
              if (story.isPublished) {
                return (
                  <StoryCard
                    key={story._id}
                    title={story.title}
                    collaborators={story.contributors.length}
                    chains={story.chains.length}
                    longestChain={Math.max(
                      ...story?.chains?.map((chain) => chain?.links?.length || 0)
                    )}
                    chainLength={story.numberOfLinks}
                    status={story.status}
                    preview={story.chains[0]?.links[0]?.content || 'No preview available'}
                    updated={new Date(story.updatedAt).toLocaleDateString(undefined, options)}
                    primaryPath={`/story/${story._id}`}
                    primaryButtonLabel="View story"
                  />
                );
              }
            })}
          </Box>
          <Box className={HomeStyles.Buttons}>
            <SignedIn>
              <ButtonBase
                buttonType="primaryWhite"
                leftSection={<img src="/icons/Pencil.svg" />}
                onClick={() => navigate('/stories-and-drafts')}
                style={{ width: 'fit-content', padding: '12px 24px' }}
              >
                Stories & Drafts
              </ButtonBase>
              <ButtonBase
                buttonType="primary"
                leftSection={<img src="/icons/Plus.svg" />}
                onClick={() => navigate('/create/story')}
                style={{ width: 'fit-content', padding: '12px 24px' }}
              >
                Create new story
              </ButtonBase>
            </SignedIn>
            <SignedOut>
              <ButtonBase
                buttonType="primary"
                onClick={() => navigate('/sign-in')}
                style={{ width: 'fit-content', padding: '12px 24px' }}
              >
                Log in to start writing!
              </ButtonBase>
            </SignedOut>
          </Box>
        </main>
      </Box>
    </>
  );
}
