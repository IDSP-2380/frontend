import { useEffect, useState } from 'react';
import { Accordion, Box, Button, Combobox, ComboboxFooter,  NumberInput, TextInput, useCombobox } from '@mantine/core';
import { ButtonBase } from '@/components/Buttons/ButtonBase';
import { DatePicker } from '@/components/Calendar/DatePicker';
import { DndListHandle } from '@/components/DragNDrop/DndListHandle';
import { HeaderMenu } from '@/components/Header/HeaderMenu';
import { SetTimer } from '@/components/Time/SetTimer';
import { usePrivateStoryStore } from '@/stores/privateStoryStore';
import { useStoryConfigStore } from '@/stores/storyStore';
import FormClasses from '../components/StoryForm/Form.module.css';
import useNewPrivateStory from '@/hooks/useNewPrivateStory';

export function NewPrivateStory() {

  const [value, setValue] = useState<string | null>('1');

  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState<string>('');

  const { submitStory } = useNewPrivateStory()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete) {
      await submitStory();
    }
  };

  const {
    storyTitle,
    maxWordCount,
    numberOfLinks,
    setStoryTitle,
    setMaxWordCount,
    setNumberOfLinks,
  } = useStoryConfigStore();

  const {
    collaborator,
    contributors,
    startDate,
    endDate,
    days,
    hours,
    minutes,
    isActiveDate,
    isActiveTime,
    calculatedEndDate,
    timePerTurn,
    users,
    setCollaborator,
    setCollaboratorsList,
    setStartDate,
    setEndDate,
    setDays,
    setHours,
    setMinutes,
    setIsActiveDate,
    setIsActiveTime,
    setCalculatedEndDate,
    setTimePerTurn,
    setUsers
  } = usePrivateStoryStore();

  const isFormComplete =
    startDate &&
    endDate &&
    days >= 1 &&
    storyTitle.trim() !== '' &&
    contributors.length > 0 &&
    Number(maxWordCount) > 0 &&
    Number(numberOfLinks) > 0;

  const validate = () => {
    if (
      storyTitle.trim() === '' ||
      contributors.length === 0 ||
      maxWordCount === 0 ||
      numberOfLinks === 0
    ) {
      throw new Error('fill out all fields');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!startDate || !endDate) {
      setError('Both dates must be selected');
      throw new Error('Both dates must be selected');
      console.log(error);
    } else if (startDate < today) {
      setError('Start date must be today or later');
      throw new Error('Start date must be today or later');
      console.log(error);
    } else if (startDate > endDate) {
      setError('Start date must be before end date');
      throw new Error('Start date must be before end date');
      console.log(error);
    } else {
      setError(null);
      console.log('Selected Time:', time);
    }
  };

  function calculateTimePerTurn() {
    if (!startDate || !endDate || !contributors.length || !numberOfLinks) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();
    const totalProjectTime = endDateTime - startDateTime;

    const turnsPerCollaborator = Math.ceil(Number(numberOfLinks) / contributors.length);

    const timePerTurnMs = totalProjectTime / (turnsPerCollaborator * contributors.length);

    const timePerTurnDays = Math.floor(timePerTurnMs / (1000 * 60 * 60 * 24));
    const timePerTurnHours = Math.floor((timePerTurnMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const timePerTurnMinutes = Math.floor((timePerTurnMs % (1000 * 60 * 60)) / (1000 * 60));

    return { days: timePerTurnDays, hours: timePerTurnHours, minutes: timePerTurnMinutes };
  }

  function calculateEndDate() {
    if (
      !startDate ||
      !contributors.length ||
      !Number(numberOfLinks) ||
      (!days && !hours && !minutes)
    ) {
      return null;
    }

    const timePerTurnMs = days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000;

    const totalTurns = Number(numberOfLinks);

    const totalProjectTimeMs = timePerTurnMs * totalTurns;

    const startDateTime = new Date(startDate).getTime();
    const endDateTime = startDateTime + totalProjectTimeMs;

    return new Date(endDateTime);
  }

  // when in date mode and date changes, update the time per turn
  useEffect(() => {
    if (isActiveDate && startDate && endDate && contributors.length && Number(numberOfLinks)) {
      const { days: d, hours: h, minutes: m } = calculateTimePerTurn();

      if (d !== days || h !== hours || m !== minutes) {
        setTimePerTurn({ days: d, hours: h, minutes: m });
        setDays(d);
        setHours(h);
        setMinutes(m);
      }
    }
  }, [isActiveDate, startDate, endDate, contributors.length, numberOfLinks]);

  // when in time mode and time values change, update end date
  useEffect(() => {
    if (
      isActiveTime &&
      startDate &&
      contributors.length &&
      Number(numberOfLinks) &&
      (days || hours || minutes)
    ) {
      const newCalculatedEndDate = calculateEndDate();

      if (newCalculatedEndDate) {
        setEndDate(newCalculatedEndDate);
        setCalculatedEndDate(newCalculatedEndDate);
      }

      setTimePerTurn({ days, hours, minutes });
    }
  }, [isActiveTime, startDate, days, hours, minutes, contributors.length, numberOfLinks]);

  const usernames = users?.map((user) => user.username) ?? [];

  const combobox = useCombobox();

  const shouldFilterOptions = !usernames.some((person) => person === value);

  const filteredOptions = shouldFilterOptions
    ? usernames.filter((name) => name.toLowerCase().includes(collaborator.toLowerCase().trim()))
    : usernames;

  const options = filteredOptions.map((name) => (
    <Combobox.Option value={name} key={name}>
      {name}
    </Combobox.Option>
  ));

  function addUserToCollaborators(person: string) {
    if (
      !contributors.includes(person) &&
      person.trim().length !== 0 &&
      usernames.includes(person)
    ) {
      setCollaboratorsList([...contributors, person]);
    }
  }

  const accordionItems = [
    {
      value: 'Set by date',
      description: (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <DatePicker type="end" />
        </Box>
      ),
    },
    {
      value: 'Set by Time per turn',
      description: (
        <SetTimer
          days={days}
          hours={hours}
          minutes={minutes}
          onChange={(d, h, m) => {
            setDays(d);
            setHours(h);
            setMinutes(m);
          }}
        />
      ),
    },
  ];

  const items = accordionItems.map((item) => (
    <Accordion.Item key={item.value} value={item.value} className={FormClasses.accordionItem}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel className={FormClasses.accordionPanel}>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

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
              classNames={{
                input: FormClasses.customInput,
              }}
              onChange={(event) => setStoryTitle(event.currentTarget.value)}
              placeholder="Add a title for your story"
              styles={{
                input: {
                  borderRadius: '12px',
                  width: '480px',
                  height: '48px',
                  border: '1px solid #B4B1AD',
                },
              }}
              value={storyTitle}
              name="storyTitle"
            />

            <Combobox
              onOptionSubmit={(optionValue) => {
                setCollaborator(optionValue);
                combobox.closeDropdown();
              }}
              store={combobox}
            >
              <Combobox.Target>
                <TextInput
                  withAsterisk={false}
                  label="Pick value or type anything"
                  placeholder="Pick value or type anything"
                  value={collaborator}
                  className={FormClasses.inputBar}
                  classNames={{
                    input: FormClasses.customInput,
                  }}
                  styles={{
                    input: {
                      borderRadius: '12px',
                      width: '480px',
                      height: '48px',
                      border: '1px solid #B4B1AD',
                    },
                  }}
                  onChange={(event) => {
                    setCollaborator(event.currentTarget.value);
                    combobox.openDropdown();
                    combobox.updateSelectedOptionIndex();
                  }}
                  onClick={() => combobox.openDropdown()}
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  name="collaborator"
                  rightSection={
                    <Button
                      className={FormClasses.inviteButton}
                      onClick={() => {
                        addUserToCollaborators(collaborator);
                        setCollaborator('');
                      }}
                    >
                      Invite
                    </Button>
                  }
                  rightSectionWidth={80}
                />
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>
                  {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>

            <div className={FormClasses.listTitle}>Writing order</div>
            {contributors && <DndListHandle />}

            <NumberInput
              required
              withAsterisk={false}
              label="Word count limit for each link:"
              placeholder="max. 250"
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
              name="maxWordCount"
              value={maxWordCount}
              allowDecimal={false}
              min={1}
              max={250}
              onChange={setMaxWordCount}
            />

            <NumberInput
              required
              withAsterisk={false}
              label="Number of links to complete story:"
              placeholder="max. 20"
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
              allowDecimal={false}
              min={1}
              max={20}
              onChange={setNumberOfLinks}
            />
          </div>
        </div>

        <div className={FormClasses.projectStartDate}>
          <DatePicker label="Project start date:" type="start" />
        </div>

        <h2 className={FormClasses.projectEndDate}>Project end Date:</h2>

        <div className={FormClasses.bottomBars}>
          <Accordion
            className={`${FormClasses.projectEndDate} ${FormClasses.endDate}`}
            onClick={() => {
              setIsActiveDate(!isActiveDate);
            }}
          >
            {items[0]}
          </Accordion>

          <div className={`${FormClasses.setEndDate} ${isActiveDate ? '' : FormClasses.noDisplay}`}>
            <p>Based on selected date, each writer's time per turn is...</p>
            <span>
              {timePerTurn.days}d:{timePerTurn.hours}h:{timePerTurn.minutes}m
            </span>
          </div>

          <Accordion
            className={`${FormClasses.projectEndDate} ${FormClasses.endTime}`}
            onClick={() => setIsActiveTime(!isActiveTime)}
          >
            {items[1]}
          </Accordion>

          <div className={`${FormClasses.setEndDate} ${isActiveTime ? '' : FormClasses.noDisplay}`}>
            <p>Based on time per turn, project end date will be...</p>
            <span>{calculatedEndDate ? calculatedEndDate.toLocaleDateString('en-CA') : 'N/A'}</span>
          </div>
        </div>

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
            width={360}
          >
            Create Project
          </ButtonBase>
        </div>
      </form>
    </>
  );
}
