import { HeaderMenu } from "@/components/Welcome/HeaderMenu";
import { Button, TextInput, Combobox, useCombobox, Accordion, ComboboxFooter, ActionIcon } from "@mantine/core";
import { Form } from "react-router-dom";
import FormClasses from "../components/Welcome/Form.module.css"
import TextEditor from "@/components/Welcome/TextEditor";
import { FloatingIndicator, Tabs, Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { DatePicker } from "@/components/Calendar/DatePicker";
import type { DateValue } from '@mantine/dates';
import { SetTimer } from "@/components/Time/SetTimer";
import { DndListHandle } from "@/components/DragNDrop/DndListHandle";
import { NumberInput } from "@mantine/core";
import { useListState } from '@mantine/hooks';
import { useRef } from "react";
import { ButtonBase } from "@/components/Buttons/ButtonBase";
import axios from "axios";

export function NewPrivateStory() {

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [collaborator, setCollaborator] = useState('');

  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };


  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

  const combobox = useCombobox();
  
  const shouldFilterOptions = !groceries.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(collaborator.toLowerCase().trim()))
    : groceries;

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
        {item}
        </Combobox.Option>
    ));

     const [startDate, setStartDate] = useState<DateValue>(null);
      const [endDate, setEndDate] = useState<DateValue>(null);
      const [error, setError] = useState<string | null>(null);
      const [time, setTime] = useState<string>('');
      const [isActiveDate, setIsActiveDate] = useState(false);

    const [isActiveTime, setIsActiveTime] = useState(false);

    const [maxWordCount, setMaxWordCount] = useState<string | number>('');
    const [numberOfLinks, setNumberOfLinks] = useState<string | number>('');
    const [storyTitle, setStoryTitle] = useState("");
    const [collaboratorList, handlers] = useListState<string>();

    const isFormComplete = startDate && endDate && days >= 1 && storyTitle.trim() !== "" && collaboratorList.length > 0 && Number(maxWordCount) > 0 && Number(numberOfLinks) > 0;

    
    
    const validate = () => {
      if (storyTitle.trim() === "" || collaboratorList.length === 0 || maxWordCount === 0 || numberOfLinks === 0) {
        throw new Error("fill out all fields")
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0); 
    
      if (!startDate || !endDate) {
        setError('Both dates must be selected');
      } else if (startDate < today) {
        setError('Start date must be today or later');
      } else if (startDate > endDate) {
        setError('Start date must be before end date');
      } else {
        setError(null);
        console.log('Selected Time:', time);
      }
    };

    const theGroceries = [
      {
        value: 'Set by date',
        description: <Box style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 12,
          paddingBottom: 12,
        }}><DatePicker value={endDate} onChange={setEndDate} /></Box>
      },
       {
        value: 'Set by Time per turn',
        description: <SetTimer
        days={days}
        hours={hours}
        minutes={minutes}
        onChange={(d, h, m) => {
          setDays(d);
          setHours(h);
          setMinutes(m);
        }}
      />
       }
    ];

    const items = theGroceries.map((item) => (
      <Accordion.Item key={item.value} value={item.value} className={FormClasses.accordionItem} >
        <Accordion.Control>{item.value}</Accordion.Control>
        <Accordion.Panel className={FormClasses.accordionPanel}>{item.description}</Accordion.Panel>
      </Accordion.Item>
    ));

    

    function addUserToCollaborators(thing: string) {
      if (!collaboratorList.includes(thing)) {
        handlers.append(thing);
      }
    }

    const inputRef = useRef<HTMLInputElement>(null);


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const payload = {
        storyTitle,
        collaboratorList,
        maxWordCount,
        numberOfLinks,
        startDate,
        endDate,
        days,
        hours,
        minutes
      };
  
      try {
        await axios.post('http://localhost:3000/api/stories/create/story/public', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
      } catch (err) {
        console.error("Failed to send to backend:", err);
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
            classNames={{
              input: FormClasses.customInput,
            }}
            onChange={(event) => setStoryTitle(event.currentTarget.value)}
            placeholder="Add a title for your story"
            styles={{
              input: {
                borderRadius: "12px",
                width: "480px",
                height: "48px",
                border: "1px solid #B4B1AD",
              }
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
                borderRadius: "12px",
                width: "480px",
                height: "48px",
                border: "1px solid #B4B1AD"
              }
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
            rightSection={<Button className={FormClasses.inviteButton} onClick={() => {
              addUserToCollaborators(collaborator);
              setCollaborator('')
            }}>Invite</Button>}
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
    {collaboratorList && 
    <DndListHandle collaboratorList={collaboratorList} />}
    

        
          <NumberInput 
            required
            withAsterisk={false}
            label="Word count limit for each link:"
            placeholder="max. 250"
            className={FormClasses.inlineInput}
            styles={{
              input: {
                width: "120px",
                height: "48px",
                borderRadius: "12px",
                border: "1px solid #B4B1AD"
              }
            }}
            hideControls
            name="maxWordCount"
            value={maxWordCount}
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
                width: "120px",
                height: "48px",
                borderRadius: "12px",
                border: "1px solid #B4B1AD"
              }
            }}
            hideControls
            name="numberOfLinks"
            value={numberOfLinks}
            onChange={setNumberOfLinks}
            />
            </div>
          </div>  

          <div className={FormClasses.projectStartDate} >
            <DatePicker label="Project start date:" value={startDate} onChange={setStartDate} />
          </div>

          <h2 className={FormClasses.projectEndDate}>Project end Date:</h2>

          <div className={FormClasses.bottomBars}>
          
          <Accordion className={`${FormClasses.projectEndDate} ${FormClasses.endDate}`} onClick={() => setIsActiveDate(!isActiveDate)}>
            {items[0]}
          </Accordion>

            <div className={`${FormClasses.setEndDate} ${isActiveDate ? '' : FormClasses.noDisplay}`}>
            <p>Based on selected date, each writer's time per turn is...</p>
              <span>2d:00h:00m</span>
            </div>

          
          
          <Accordion className={`${FormClasses.projectEndDate} ${FormClasses.endTime}`} onClick={() => setIsActiveTime(!isActiveTime)}>
            {items[1]}
          </Accordion>

          <div className={`${FormClasses.setEndDate} ${isActiveTime ? '' : FormClasses.noDisplay}`}>
            <p>Based on time per turn, project end date will be...</p>
            <span>2021-12-30</span>
          </div>

          </div>

          <ButtonBase disabled={!isFormComplete} onClick={validate} buttonType="secondarySquare"  rightSection={isFormComplete ? <img  src='/icons/CaretRight.svg' alt="icon" />: <img  src='/icons/CaretRightDisabled.svg' alt="icon" />}>Submit</ButtonBase >
          </form>
    </>
  );
}