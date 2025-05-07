import { useState } from 'react';
import { MenuDivider, Tabs } from '@mantine/core';
import TabStyles from './HomeTabs.module.css';

export default function HomeTabs() {
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <Tabs variant="pills" radius="md" value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="all">All</Tabs.Tab>
        <Tabs.Tab value="ongoing">Ongoing</Tabs.Tab>
        <Tabs.Tab value="completed">Completed</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="all">All</Tabs.Panel>
      <Tabs.Panel value="ongoing">Ongoing</Tabs.Panel>
      <Tabs.Panel value="completed">Completed</Tabs.Panel>
    </Tabs>
  );
}
