import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import { HeaderMenu } from '@/components/Header/HeaderMenu';
import { useStory } from '@/hooks/useStory';
import { useUpdateStatus } from '@/hooks/useUpdateStatus';
import { ILink, IStory } from '@/stores/storyStore';
import StoryClasses from '../styles/storyPage.module.css';

export function Story() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { story } = useStory(id!);

  const { user } = useUser();

  const { isCompleted } = useUpdateStatus(story);

  return (
    <>
      <HeaderMenu />

      <div className={StoryClasses.storyPageDiv}>
        <div className={StoryClasses.titleAndButtons}>
          <ButtonBase
            buttonType="secondaryNeutral"
            style={{ border: '1px solid #B4B1AD', backgroundColor: '#FDF9F4', color: '#1B1B1B' }}
            leftSection={<img src="/icons/ArrowLeft.svg" alt="icon" />}
            onClick={() => navigate('/')}
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

        {isCompleted ? (
          <div className={StoryClasses.linkInfoCompleted}>
            <div className={StoryClasses.contributorsAndStatusAndChain}>
              <div className={StoryClasses.views}>
                <div className={StoryClasses.viewMode}>
                  <p>View Mode</p>
                </div>

                <div className={StoryClasses.viewOne}>
                  <img src="/icons/ViewOne.svg" alt="" />
                </div>

                <div className={StoryClasses.viewTwo}>
                  <img src="/icons/ViewTwo.svg" />
                </div>
              </div>
            </div>

            <div className={StoryClasses.completedButtons}>
              <ButtonBase
                buttonType="primaryWhite"
                onClick={() => console.log('hi')}
                style={{
                  height: 40,
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: 24,
                  width: 'fit-content',
                  paddingRight: 16,
                  paddingLeft: 16
                }}
                rightSection={<img src="/icons/Share.svg" />}
              >
                Share
              </ButtonBase>

              <ButtonBase
                buttonType="primary"
                onClick={() => console.log('hi')}
                style={{
                  height: 40,
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: 24,
                  width: 'fit-content',
                  paddingRight: 16,
                  paddingLeft: 16,
                }}
                rightSection={<img src="/icons/Export.svg" />}
              >
                Export
              </ButtonBase>
            </div>
          </div>
        ) : (
          <div className={StoryClasses.linkInfo}>
            <div className={StoryClasses.contributorsAndStatusAndChain}>
              <div className={StoryClasses.contributorsAndStatus}>
                <div className={StoryClasses.contributors}>
                  <img src="/icons/Collaborators.svg" />{' '}
                  <p>{story?.contributors.length} contributors</p>
                </div>

                <div className={StoryClasses.status}>
                  <p>Status:</p>
                  <p>{story?.status}</p>
                </div>
              </div>

              <div className={StoryClasses.chain}>
                <img src="/icons/GitFork.svg" /> <p>{story?.chains.length} Chain</p>
              </div>
            </div>

            <ButtonBase
              buttonType="secondaryWhite"
              onClick={() => console.log('hi')}
              rightSection={<img src="/icons/CornersOut.svg" />}
            >
              Chain Map
            </ButtonBase>
          </div>
        )}

        {story?.chains[0]?.links.map((link: ILink, index: number) => {
          const isLastLink = index === story?.chains[0]?.links.length - 1;

          const canEdit = !isCompleted && user?.username === link.author && isLastLink;

          return canEdit ? (
            <div key={link._id} className={StoryClasses.tapToEdit}>
              <div className={StoryClasses.textEditor}>
                <p className={StoryClasses.textEditorNumber}>{index + 1}</p>
                <div
                  className={StoryClasses.reactQuill}
                  style={{ height: 136, width: 659 }}
                  onClick={() => navigate(`/edit/${story?._id}/${link._id}`)}
                >
                  <div dangerouslySetInnerHTML={{ __html: link.content }} />
                  <div className={StoryClasses.stage}>
                    <div className={StoryClasses.stageDiv}>
                      <p>{link.stage}</p>
                    </div>
                  </div>
                </div>
                <div className={StoryClasses.editButton}>
                  <ButtonBase
                    buttonType="secondarySquare"
                    onClick={() => navigate(`/edit/${story?._id}/${link._id}`)}
                    style={{ width: 'fit-content' }}
                    rightSection={<img src="/icons/PencilSimpleLine.svg" />}
                  >
                    Edit
                  </ButtonBase>
                  <div className={StoryClasses.dateField}>
                    <p>
                      Posted{' '}
                      {link.createdAt
                        ? new Date(link.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : ''}
                    </p>
                  </div>
                  
                </div>
              </div>
              <div className={StoryClasses.heartAndComment}>
                <div className={StoryClasses.heart}>
                  <img src="/icons/Heart.svg" alt="" />
                </div>
                <div className={StoryClasses.comment}>
                  <img src="/icons/Comment.svg" alt="" />
                </div>
              </div>
            </div>
          ) : (
            <div
              key={link._id}
              className={`${StoryClasses.tapToEdit} ${isCompleted ? StoryClasses.completedLink : ''}`}
            >
              <div className={StoryClasses.textEditor}>
                <p className={StoryClasses.textEditorNumber}>{index + 1}</p>
                <div className={StoryClasses.reactQuillLogged} style={{ height: 136, width: 659 }}>
                  <p dangerouslySetInnerHTML={{ __html: link.content }}/>
                  <div className={StoryClasses.stageLogged}>
                    <div className={StoryClasses.stageDivLogged}>
                      <p>{link.stage}</p>
                    </div>
                  </div>
                </div>
                <div className={StoryClasses.editButton}>
                  <div className={StoryClasses.username}>
                    <p>{link.author}</p>
                  </div>
                  <div className={StoryClasses.dateFieldLoggedIn}>
                    <p>
                      Posted{' '}
                      {link.createdAt
                        ? new Date(link.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : ''}
                    </p>
                  </div>
                  
                </div>
              </div>
              <div className={StoryClasses.heartAndComment}>
                <div className={StoryClasses.heart}>
                  <img src="/icons/Heart.svg" alt="" />
                </div>
                <div className={StoryClasses.comment}>
                  <img src="/icons/Comment.svg" alt="" />
                </div>
              </div>
            </div>
          );
        })}

        {!isCompleted && (
          <div className={StoryClasses.addLinkButton}>
            <ButtonBase
              buttonType="primary"
              leftSection={<img src="/icons/Link-white.svg" alt="icon" />}
              onClick={() => navigate(`/edit/${story?._id}`)}
            >
              Add an Inlink
            </ButtonBase>
          </div>
        )}
      </div>
    </>
  );
}
