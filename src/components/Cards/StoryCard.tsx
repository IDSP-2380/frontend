import { useNavigate } from 'react-router-dom';
import { Box } from '@mantine/core';
import { Story } from '@/stores/homeStore';
import { ButtonBase } from '../Buttons/ButtonBase';
import StoryCardStyles from './StoryCard.module.css';

export default function StoryCard({
  title,
  preview,
  contributors,
  chains,
  longestChain,
  chainLength,
  status,
  updated,
}: Story) {
  const navigate = useNavigate();
  return (
    <Box className={StoryCardStyles.StoryCard}>
      <h2 className={StoryCardStyles.Title}>{title}</h2>
      <div className={StoryCardStyles.StoryInfo}>
        <span className={StoryCardStyles.MainInfo}>
          <span className={StoryCardStyles.Contributors}>
            <img src="/icons/Collaborators.svg" />
            {contributors}
          </span>
          <span className={StoryCardStyles.Chains}>
            <img src="/icons/GitFork.svg" />
            {chains}
          </span>
          <span className={StoryCardStyles.Links}>
            <img src="/icons/Link.svg" />
            {longestChain} / {chainLength} Links until completed
          </span>
        </span>
        <span className="Status">
          <span className={StoryCardStyles.StatusLabel}>Status: </span>
          {status}
        </span>
      </div>
      <p className={StoryCardStyles.Preview}>{preview}</p>
      <div className={StoryCardStyles.CardFooter}>
        <span className={StoryCardStyles.UpdatedAt}>Last updated {updated}</span>
        <ButtonBase
          onClick={() => navigate('/Story')}
          rightSection={<img src="/icons/CaretRightPrimary.svg" />}
          buttonType="secondaryDim"
          style={{ width: '163px' }}
        >
          View story
        </ButtonBase>
      </div>
    </Box>
  );
}
