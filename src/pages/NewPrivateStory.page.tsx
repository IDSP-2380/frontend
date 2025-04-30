import { HeaderMenu } from "@/components/Welcome/HeaderMenu";
import { Button, TextInput, Combobox, useCombobox } from "@mantine/core";
import { Form } from "react-router-dom";
import FormClasses from "../components/Welcome/Form.module.css"
import TextEditor from "@/components/Welcome/TextEditor";
import { FloatingIndicator, Tabs } from "@mantine/core";
import { useState } from "react";

import { NumberInput } from "@mantine/core";


export function NewPrivateStory() {

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

  const combobox = useCombobox();
  const [thing, setThing] = useState('');
  const shouldFilterOptions = !groceries.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(thing.toLowerCase().trim()))
    : groceries;

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
        {item}
        </Combobox.Option>
    ));
  return (
    <>
        <Form action="/events" method="post" className={FormClasses.storyForm}>
        <div className={FormClasses.storySettings}>
          <div className={FormClasses.storySettingsInputs}>
          <TextInput 
            label="Story Title"
            className={FormClasses.inputBar}
            placeholder="Add a title for your story"
            styles={{
              input: {
                borderRadius: "12px",
                width: "480px",
                height: "48px",
                border: "1px solid #B4B1AD"
              }
            }}
            name="storyTitle"
          />

    <Combobox
        onOptionSubmit={(optionValue) => {
            setThing(optionValue);
            combobox.closeDropdown();
        }}
        store={combobox}
        >
        <Combobox.Target>
            <TextInput
            label="Pick value or type anything"
            placeholder="Pick value or type anything"
            value={thing}
            onChange={(event) => {
                setThing(event.currentTarget.value);
                combobox.openDropdown();
                combobox.updateSelectedOptionIndex();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            />
        </Combobox.Target>

        <Combobox.Dropdown>
            <Combobox.Options>
            {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
            </Combobox.Options>
        </Combobox.Dropdown>
    </Combobox>

        
          <NumberInput 
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
            />
            <NumberInput 
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

          
          
          
        </Form>
    </>
  );
}