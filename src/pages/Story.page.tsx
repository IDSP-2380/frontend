import { useNavigate, useParams } from 'react-router-dom';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import { HeaderMenu } from '@/components/Header/HeaderMenu';
import { useStory } from '@/hooks/useStory';
import { ILink } from '@/stores/storyStore';
import StoryClasses from '../styles/storyPage.module.css';

export function Story() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { story } = useStory(id!);

  return (
    <>
      <HeaderMenu />

      <div className={StoryClasses.storyPageDiv}>
        <div className={StoryClasses.titleAndButtons}>
          <ButtonBase
            buttonType="secondaryNeutral"
            style={{ border: '1px solid #B4B1AD', backgroundColor: '#FDF9F4', color: '#1B1B1B' }}
            leftSection={<img src="/icons/ArrowLeft.svg" alt="icon" />}
            onClick={() => navigate('create/story')}
          >
            Back
          </ButtonBase>

          <h1>{story?.title}</h1>

          <ButtonBase
            buttonType="secondaryNeutral"
            style={{ border: '1px solid #B4B1AD', backgroundColor: '#FDF9F4', color: '#1B1B1B' }}
            leftSection={<img src="/icons/Share.svg" alt="icon" />}
            onClick={() => navigate('/create/story', { relative: 'route' })}
          >
            Share
          </ButtonBase>
        </div>

        <div className={StoryClasses.linkInfo}>
          <div className={StoryClasses.contributors}>
            <img src="/icons/Collaborators.svg" /> <p>{story?.contributors.length} contributors</p>
          </div>

          <div className={StoryClasses.status}>
            <p>Status:</p>
            <p>{story?.status}</p>
          </div>

          <div className={StoryClasses.chain}>
            <img src="/icons/GitFork.svg" /> {story?.chains.length} Chain
          </div>

          <ButtonBase
            buttonType="secondaryWhite"
            onClick={() => console.log('hi')}
            rightSection={<img src="/icons/CornersOut.svg" />}
          >
            Chain Map
          </ButtonBase>
        </div>

        {story?.chains[0]?.links.map((link: ILink, index: number) => (
          <div className={StoryClasses.tapToEdit}>
            <div className={StoryClasses.textEditor}>
              <p className={StoryClasses.textEditorNumber}>{index + 1}</p>
              <div
                className={StoryClasses.reactQuill}
                style={{ height: 136, width: 659 }}
                onClick={() => navigate('/edit/:id')}
              >
                <p>{link.content.replace('<p>', '').replace('</p>', '')}</p>
              </div>
              <div className={StoryClasses.editButton}>
                <ButtonBase
                  buttonType="secondarySquare"
                  onClick={() => navigate(`/edit/${link._id}`)}
                  style={{ width: 'fit-content' }}
                  rightSection={<img src="/icons/PencilSimpleLine.svg" />}
                >
                  Edit
                </ButtonBase>
                <div className={StoryClasses.dateField}>
                  <p>Posted{' '}
                  {link.createdAt
                    ? new Date(link.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : ''}</p>
                </div>
                <div className={StoryClasses.stage}>
                  <div className={StoryClasses.stageDiv}>
                  <p>{link.stage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
