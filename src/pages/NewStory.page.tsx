import { HeaderMenu } from "@/components/Welcome/HeaderMenu";
import { TextInput } from "@mantine/core";
import { Form } from "react-router-dom";
import FormClasses from "../components/Welcome/Form.module.css"
import TextEditor from "@/components/Welcome/TextEditor";
import { FloatingIndicator, Tabs } from "@mantine/core";
import { useState } from "react";

import { NewPublicStory } from "./NewPublicStory.page";

import { NewPrivateStory } from "./NewPrivateStory.page";

import { NumberInput } from "@mantine/core";


export function NewStoryPage() {

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };
  return (
    <>
      <HeaderMenu />
      <h1 className="h1">Start New Story</h1>
      <Tabs variant="none" value={value} onChange={setValue} >
        <Tabs.List ref={setRootRef} className={FormClasses.list}>
          
          <Tabs.Tab value="1" ref={setControlRef('1')} className={FormClasses.tab}>
          {value === "1" ? <img src="/Globe.svg" alt="" /> : <img src="/Globe-gray.svg" alt="" />}Public
          </Tabs.Tab>
          <Tabs.Tab value="2" ref={setControlRef('2')} className={FormClasses.tab}>
            {value === "2" ? <img src="/Lock.svg" alt="" /> : <img src="/Lock-gray.svg" alt="" />}Private 
          </Tabs.Tab>

          <FloatingIndicator
            target={value ? controlsRefs[value] : null}
            parent={rootRef}
            className={FormClasses.indicator}
          />
        </Tabs.List>

        <Tabs.Panel value="1"><NewPublicStory /></Tabs.Panel>
        <Tabs.Panel value="2"><NewPrivateStory /></Tabs.Panel>
      </Tabs>
        
    </>
  );
}
