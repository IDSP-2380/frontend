import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import StoryCard from '@/components/Cards/StoryCard';
import { HeaderMenu } from '@/components/Header/HeaderMenu';
import StoryFilters from '@/components/StoryFilters/StoryFilters';
import HomeTabs from '@/components/Tabs/Tabs';
import useHome from '@/hooks/useHome';
import StoryCardStyles from '../components/Cards/StoryCard.module.css';
import StoryFilterStyles from '../components/StoryFilters/StoryFilters.module.css';
import HomeStyles from '../styles/home.module.css';

export function StoriesAndDrafts() {
  const { activeTab, stories } = useHome();
  const navigate = useNavigate();

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
        />
      </div>
      <main className={HomeStyles.Main}>
        <div className={StoryFilterStyles.StoryFilterHeader}>
          <StoryFilters />
        </div>
        <h2>In progress</h2>
        <div className={StoryCardStyles.FilteredStories}>
          {stories.map((story) => {
            if (story.isPublic) {
              return (
                <StoryCard
                  title={story.title}
                  chainLength={story.chains.length}
                  draftingLink={story.chains[0]?.links?.length}
                  status="Public"
                  statusIcon="/icons/Globe.svg"
                  preview={story.chains[0]?.links[0]?.content}
                  primaryPath={`/edit/${story._id}`}
                  primaryButtonLabel="Go to editor"
                  secondaryPath={`/story/${story._id}`}
                  secondaryButtonLabel="View story"
                />
              );
            } else {
              return (
                <StoryCard
                  title={story.title}
                  currentTurn={(story.chains[0]?.links?.length + 1) | 1}
                  totalTurns={story.numberOfLinks}
                  status="Private"
                  statusIcon="/icons/Lock.svg"
                  preview={story.chains[0]?.links[0]?.content}
                  primaryPath={`/newStoryCreation/${story._id}`}
                  primaryButtonLabel="Go to project page"
                />
              );
            }
          })}
        </div>

        <h2>Completed</h2>
        <div className={StoryCardStyles.FilteredStories}>
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
        </div>
        <ButtonBase
          buttonType="primary"
          leftSection={<img src="/icons/Plus.svg" />}
          onClick={() => navigate('/create/story')}
          style={{ width: 'fit-content', padding: '12px 24px' }}
        >
          Create new story
        </ButtonBase>
      </main>
    </>
  );
}
