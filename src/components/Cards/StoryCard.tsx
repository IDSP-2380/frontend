import { useNavigate } from 'react-router-dom';
import { Box } from '@mantine/core';
import { ButtonBase } from '../Buttons/ButtonBase';
import StoryCardStyles from './StoryCard.module.css';

interface IStoryCard {
  title: string;
  preview: string;
  collaborators?: number;
  chains?: number;
  longestChain?: number;
  chainLength?: number;
  draftingLink?: number;
  currentTurn?: number;
  totalTurns?: number;
  status: string;
  statusIcon?: string;
  updated?: string;
  primaryPath: string;
  primaryButtonLabel: string;
  secondaryPath?: string;
  secondaryButtonLabel?: string;
}

export default function StoryCard({
  title,
  preview,
  collaborators,
  chains,
  longestChain,
  chainLength,
  draftingLink,
  currentTurn,
  totalTurns,
  status,
  statusIcon,
  updated,
  primaryPath,
  primaryButtonLabel,
  secondaryPath,
  secondaryButtonLabel,
}: IStoryCard) {
  const navigate = useNavigate();
  return (
    <Box className={StoryCardStyles.StoryCard}>
      <h2 className={StoryCardStyles.Title}>{title}</h2>
      <div className={StoryCardStyles.StoryInfo}>
        <span className={StoryCardStyles.MainInfo}>
          {collaborators !== null && (
            <span className={StoryCardStyles.VerticalCenter}>
              <img src="/icons/Collaborators.svg" />
              {collaborators}
            </span>
          )}
          {chains && (
            <span className={StoryCardStyles.VerticalCenter}>
              <img src="/icons/GitFork.svg" />
              {chains}
            </span>
          )}
          {longestChain && (
            <span className={StoryCardStyles.VerticalCenter}>
              <img src="/icons/Link.svg" />
              {longestChain} / {chainLength} Links until completed
            </span>
          )}
          {draftingLink && (
            <span className={StoryCardStyles.VerticalCenter}>
              <img src="/icons/Link.svg" />
              Drafting Link {draftingLink} of {chainLength}
            </span>
          )}
          {currentTurn && (
            <span className={StoryCardStyles.VerticalCenter}>
              <img src="/icons/Link.svg" />
              Currently on Turn {currentTurn} of {totalTurns}
            </span>
          )}
        </span>
        <span className={StoryCardStyles.VerticalCenter}>
          {statusIcon && <img src={statusIcon} />}
          {(status === 'Ongoing' || status === 'Completed') && (
            <span className={StoryCardStyles.StatusLabel}>Status: </span>
          )}
          {status}
        </span>
      </div>
      <p className={StoryCardStyles.Preview}>{preview}</p>
      <div className={StoryCardStyles.CardFooter}>
        {(status === 'Ongoing' || status === 'Completed') && (
          <span className={StoryCardStyles.UpdatedAt}>Last updated {updated}</span>
        )}
        <span className={StoryCardStyles.Buttons}>
          {secondaryPath && (
            <ButtonBase
              onClick={() => navigate(secondaryPath)}
              buttonType="secondaryNeutral"
              style={{ width: 'fit-content' }}
            >
              {secondaryButtonLabel}
            </ButtonBase>
          )}
          <ButtonBase
            onClick={() => navigate(primaryPath)}
            rightSection={<img src="/icons/CaretRightPrimary.svg" />}
            buttonType="secondaryDim"
            style={{ width: 'fit-content' }}
          >
            {primaryButtonLabel}
          </ButtonBase>
        </span>
      </div>
    </Box>
  );
}
