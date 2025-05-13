import ReactQuill from 'react-quill';
import { Box, Button, Paper, ScrollArea } from '@mantine/core';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import { HeaderMenu } from '@/components/Header/HeaderMenu';
import FormClasses from '../components/StoryForm/Form.module.css';
import { useParams } from 'react-router-dom';
import { useStory } from '@/hooks/useStory';
import { usePrivateStoryStore } from '@/stores/privateStoryStore';
import { useNavigate } from 'react-router-dom';


export function NewStoryCreation() {

const { id } = useParams();

let story;

if (id) {
  story = useStory(id)
}

const navigate = useNavigate()

const { contributors } = usePrivateStoryStore();

  return (
    <>
      <HeaderMenu />
      <div className={FormClasses.privatePageContent}>
        <div className={FormClasses.timeAndProjectInfo}>
          <div className={FormClasses.timeAndProjectAndEnd}>
            <div className={FormClasses.timeLeft}>
              <div className={FormClasses.timeIcons}>
                <img src="/icons/Alarm.svg" alt="" />
                <h4>Time Left</h4>
              </div>
              <div className={FormClasses.time}>
                <p>01 : 23 : 59</p>
                <div className={FormClasses.daysHoursMinutes}>
                  <p>days</p>
                  <p>hours</p>
                  <p>minutes</p>
                </div>
              </div>
            </div>

            <div className={FormClasses.projectInfo}>
              <div className={FormClasses.projectInfoComponents}>
                <div className={FormClasses.startDateDiv}>
                  <p>Start Date</p>
                  <span>{story?.story?.startDate ? new Date(story.story.startDate).toLocaleDateString("en-CA") : ''}</span>
                </div>
                <div className={FormClasses.endDateDiv}>
                  <p>End Date</p>
                  <span>{story?.story?.endDate ? new Date(story.story.endDate).toLocaleDateString("en-CA") : ''}</span>
                </div>
                <div className={FormClasses.daysUntilCompletion}>
                  <p>15 turns until completion</p>
                </div>
              </div>
            </div>
          </div>

          <div className={FormClasses.turnCueCard}>
            <p> It's your turn to write! </p>
            <div className={FormClasses.scrollBox}>
              <ScrollArea
                type="auto"
                className={FormClasses.scrollArea}
                styles={{ scrollbar: { display: 'none' } }}
              >
                <Box
                  style={{ display: 'flex', gap: 16, width: 480 }}
                  className={FormClasses.scrollBox}
                >
                  {contributors.map((person) => (
                    <Paper className={FormClasses.horScrollPaper}>{person}</Paper>
                  ))}
                </Box>
              </ScrollArea>
            </div>
            <div className={FormClasses.turnButtons}>
              <ButtonBase
                buttonType="secondaryWhite"
                onClick={() => console.log('hi')}
                style={{ height: 40, width: 169 }}
                rightSection={<img src="/icons/ArrowArcRight.svg" />}
              >
                Pass My Turn{' '}
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
                rightSection={<img src="/icons/CaretRight.svg" />}
              >
                {' '}
                Submit writing{' '}
              </ButtonBase>
            </div>
          </div>
        </div>

        <h2>To be submitted</h2>
        <div className={FormClasses.textEditor}>
          <p className={FormClasses.textEditorNumber}>1</p>
          <div
            className={FormClasses.reactQuill}
            style={{ height: 136, width: 712 }}
            onClick={() => navigate("/edit/:id")}
          ><p>Tap to start writing</p> </div>
          <div className={FormClasses.editButton}>
          <ButtonBase
            buttonType="secondarySquare"
            onClick={() => console.log('hi')}
            style={{ width: 'fit-content' }}
            rightSection={<img src="/icons/PencilSimpleLine.svg" />}
          >
            Edit
          </ButtonBase>
          <div>{story?.story?.chains[0]?.link[0]?.stage}</div>
          </div>
        </div>
      </div>
    </>
  );
}
