import { useState } from 'react';
import { MenuDivider, Tabs } from '@mantine/core';
import TabStyles from './HomeTabs.module.css';

interface HomeTabsProps {
  icon1Active: string;
  icon2Active: string;
  icon3Active: string;
  icon1Inactive: string;
  icon2Inactive: string;
  icon3Inactive: string;
  label1: string;
  label2: string;
  label3: string;
  panel1: string;
  panel2: string;
  panel3: string;
}

export default function HomeTabs({
  icon1Active,
  icon2Active,
  icon3Active,
  icon1Inactive,
  icon2Inactive,
  icon3Inactive,
  label1,
  label2,
  label3,
  panel1,
  panel2,
  panel3,
}: HomeTabsProps) {
  const [activeTab, setActiveTab] = useState<string | null>(label1);

  return (
    <Tabs
      variant="pills"
      radius="md"
      value={activeTab}
      onChange={setActiveTab}
      defaultValue={label1}
    >
      <Tabs.List>
        <Tabs.Tab value={label1}>
          {activeTab === label1 ? <img src={icon1Active} /> : <img src={icon1Inactive} />}
          {label1}
        </Tabs.Tab>
        <Tabs.Tab value={label2}>
          {activeTab === label2 ? <img src={icon2Active} /> : <img src={icon2Inactive} />}
          {label2}
        </Tabs.Tab>
        <Tabs.Tab value={label3}>
          {activeTab === label3 ? <img src={icon2Active} /> : <img src={icon3Inactive} />}
          {label3}
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={label1}>{panel1}</Tabs.Panel>
      <Tabs.Panel value={label2}>{panel2}</Tabs.Panel>
      <Tabs.Panel value={label3}>{panel3}</Tabs.Panel>
    </Tabs>
  );
}
