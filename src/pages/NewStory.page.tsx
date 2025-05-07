import { useState } from 'react';
import { Form } from 'react-router-dom';
import { FloatingIndicator, NumberInput, Tabs, TextInput } from '@mantine/core';
import { HeaderMenu } from '@/components/Header/HeaderMenu';
import TextEditor from '@/components/TextEditor/TextEditor';
import { NewPrivateStory } from './NewPrivateStory.page';
import { NewPublicStory } from './NewPublicStory.page';
import FormClasses from '../components/StoryForm/Form.module.css';

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
      <Tabs variant="none" value={value} onChange={setValue}>
        <Tabs.List ref={setRootRef} className={FormClasses.list}>
          <Tabs.Tab value="1" ref={setControlRef('1')} className={FormClasses.tab}>
            {value === '1' ? (
              <img src="/icons/Globe.svg" alt="" />
            ) : (
              <img src="/icons/Globe-gray.svg" alt="" />
            )}
            Public
          </Tabs.Tab>
          <Tabs.Tab value="2" ref={setControlRef('2')} className={FormClasses.tab}>
            {value === '2' ? (
              <img src="/icons/Lock.svg" alt="" />
            ) : (
              <img src="/icons/Lock-gray.svg" alt="" />
            )}
            Private
          </Tabs.Tab>

          <FloatingIndicator
            target={value ? controlsRefs[value] : null}
            parent={rootRef}
            className={FormClasses.indicator}
          />
        </Tabs.List>

        <Tabs.Panel value="1">
          <NewPublicStory />
        </Tabs.Panel>
        <Tabs.Panel value="2">
          <NewPrivateStory />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
