import { HeaderMenu } from "@/components/Welcome/HeaderMenu";
import { TextInput } from "@mantine/core";
import { Form } from "react-router-dom";
import FormClasses from "../components/Welcome/Form.module.css";
import { TextEditor } from "@/components/Welcome/TextEditor";

import { NumberInput } from "@mantine/core";


export function NewStoryPage() {
  return (
    <>
      <HeaderMenu />
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

          <TextEditor />
          
        </Form>
    </>
  );
}
