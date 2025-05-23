import { NumberInput, TextInput } from '@mantine/core';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import TextEditor from '@/components/TextEditor/TextEditor';
import useNewPublicStory from '@/hooks/useNewPublicStory';
import { useStoryConfigStore } from '@/stores/storyStore';
import FormClasses from '../components/StoryForm/Form.module.css';

export function NewPublicStory() {
  const {
    storyTitle,
    maxWordCount,
    numberOfLinks,
    setStoryTitle,
    setMaxWordCount,
    setNumberOfLinks,
  } = useStoryConfigStore();

  const isFormComplete =
    storyTitle.trim() !== '' && Number(maxWordCount) > 0 && Number(numberOfLinks) > 0;

  const validate = () => {
    if (storyTitle.trim() === '' || maxWordCount === 0 || numberOfLinks === 0) {
      throw new Error('fill out all fields');
    }
  };

  const { submitStory } = useNewPublicStory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete) {
      await submitStory();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="post" className={FormClasses.storyForm}>
        <div className={FormClasses.storySettings}>
          <div className={FormClasses.storySettingsInputs}>
            <TextInput
              required
              withAsterisk={false}
              label="Story Title"
              className={FormClasses.inputBar}
              value={storyTitle}
              placeholder="Add a title for your story"
              classNames={{
                input: FormClasses.customInput,
              }}
              onChange={(event) => setStoryTitle(event.currentTarget.value)}
              styles={{
                input: {
                  borderRadius: '12px',
                  width: '480px',
                  height: '48px',
                  border: '1px solid #B4B1AD',
                },
              }}
              name="storyTitle"
            />

            <NumberInput
              required
              withAsterisk={false}
              label="Word count limit for each link:"
              placeholder="max. 250"
              className={FormClasses.inlineInput}
              classNames={{
                input: FormClasses.customInput,
                label: FormClasses.inputBar,
              }}
              styles={{
                input: {
                  width: '120px',
                  height: '48px',
                  borderRadius: '12px',
                  border: '1px solid #B4B1AD',
                },
              }}
              allowDecimal={false}
              min={1}
              max={250}
              onChange={setMaxWordCount}
              hideControls
              name="maxWordCount"
              value={maxWordCount}
            />

            <NumberInput
              required
              withAsterisk={false}
              label="Number of links to complete story:"
              placeholder="max. 20"
              classNames={{
                input: FormClasses.customInput,
              }}
              allowDecimal={false}
              min={1}
              max={20}
              onChange={setNumberOfLinks}
              className={FormClasses.inlineInput}
              styles={{
                input: {
                  width: '120px',
                  height: '48px',
                  borderRadius: '12px',
                  border: '1px solid #B4B1AD',
                },
              }}
              hideControls
              name="numberOfLinks"
              value={numberOfLinks}
            />
          </div>
        </div>

        <TextEditor heading="Start Your Story" />

        <div className={FormClasses.createProjectButton}>
          <ButtonBase
            disabled={!isFormComplete}
            onClick={validate}
            buttonType="primary"
            rightSection={
              isFormComplete ? (
                <img src="/icons/CaretRight.svg" alt="icon" />
              ) : (
                <img src="/icons/CaretRightDisabled.svg" alt="icon" />
              )
            }
          >
            Create Project
          </ButtonBase>
        </div>
      </form>
    </>
  );
}
