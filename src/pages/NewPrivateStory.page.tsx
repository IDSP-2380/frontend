import { HeaderMenu } from "@/components/Welcome/HeaderMenu";
import { Button, TextInput, Combobox, useCombobox, Accordion, ComboboxFooter, ActionIcon } from "@mantine/core";
import { Form } from "react-router-dom";
import FormClasses from "../components/Welcome/Form.module.css"
import TextEditor from "@/components/Welcome/TextEditor";
import { FloatingIndicator, Tabs, Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { DatePicker } from "@/components/Calendar/DatePicker";
import type { DateValue } from '@mantine/dates';
import { TimePicker } from "@/components/Time/TimePicker";
import { DndListHandle } from "@/components/DragNDrop/DndListHandle";
import { NumberInput } from "@mantine/core";
import { useListState } from '@mantine/hooks';
import { useRef } from "react";

export function NewPrivateStory() {

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [collaborator, setCollaborator] = useState('');

  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

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
    
    const validate = () => {
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
        description: <TimePicker value={time} onChange={setTime} />
       }
    ];

    const items = theGroceries.map((item) => (
      <Accordion.Item key={item.value} value={item.value} className={FormClasses.accordionItem} >
        <Accordion.Control>{item.value}</Accordion.Control>
        <Accordion.Panel className={FormClasses.accordionPanel}>{item.description}</Accordion.Panel>
      </Accordion.Item>
    ));

    const [collaboratorList, handlers] = useListState<string>();

    function addUserToCollaborators(thing: string) {
      if (!collaboratorList.includes(thing)) {
        handlers.append(thing);
      }
    }

    const [isActiveDate, setIsActiveDate] = useState(false);

    const [isActiveTime, setIsActiveTime] = useState(false);

    const[wordCount, setWordCount] = useState(0);


    function wordCountCheck(value: number | string | null) {
      if (value === null || value === '') return;
      const number = typeof value === 'number' ? value : parseInt(value.toString());
      if (number <= 250) {
        setWordCount(number);
      } 
      while (number > 250) {
        console.log("too big")
      }
    }

    const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
        <Form action="/create/story/private" method="post" className={FormClasses.storyForm}>
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
            placeholder="Add a title for your story"
            styles={{
              input: {
                borderRadius: "12px",
                width: "480px",
                height: "48px",
                border: "1px solid #B4B1AD",
                
              }
            }}
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
            required
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
    <DndListHandle collaboratorList={collaboratorList}/>}
    

        
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
            value={wordCount}
            onChange={(val) => {
              wordCountCheck(val);
            }}
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
        </Form>
    </>
  );
}