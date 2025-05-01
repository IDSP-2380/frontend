import { HeaderMenu } from "@/components/Welcome/HeaderMenu";
import { Button, TextInput } from "@mantine/core";
import { Form } from "react-router-dom";
import FormClasses from "../components/Welcome/Form.module.css"
import TextEditor from "@/components/Welcome/TextEditor";
import { FloatingIndicator, Tabs } from "@mantine/core";
import { useState } from "react";

import { NumberInput } from "@mantine/core";


export function NewPublicStory() {

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };
  return (
    <>
        <Form action="/create/story/public" method="post" className={FormClasses.storyForm}>
        <div className={FormClasses.storySettings}>
          <div className={FormClasses.storySettingsInputs}>
          <TextInput 
            required
            withAsterisk={false}
            label="Story Title"
            className={FormClasses.inputBar}
            placeholder="Add a title for your story"
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
              label: FormClasses.inputBar
            }}
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
            required
            withAsterisk={false}
            label="Number of links to complete story:"
            placeholder="max. 20"
            classNames={{
              input: FormClasses.customInput,
            }}
            
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

          <TextEditor />
          
        </Form>
    </>
  );
}