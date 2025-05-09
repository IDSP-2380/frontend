import { useState } from 'react';
import { Tabs } from '@mantine/core';
import { useHomeStore } from '@/stores/homeStore';
import TabStyles from './Tabs.module.css';

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
  panel1?: string;
  panel2?: string;
  panel3?: string;
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
  const { activeTab, setActiveTab } = useHomeStore();

  return (
    <Tabs
      variant="pills"
      radius="md"
      value={activeTab}
      onChange={setActiveTab}
      defaultValue={label1}
      className={TabStyles.Root}
      classNames={{ list: TabStyles.TabList, tabLabel: TabStyles.TabLabel, tab: TabStyles.Tab }}
    >
      <Tabs.List>
        <div className={TabStyles.TabDiv}>
          <Tabs.Tab value={label1}>
            {activeTab === label1 ? <img src={icon1Active} /> : <img src={icon1Inactive} />}
            {label1}
          </Tabs.Tab>
        </div>
        <div className={TabStyles.TabDiv}>
          <img
            src="/icons/TabDivider.svg"
            className={TabStyles.TabDivider}
            style={{ visibility: activeTab === label3 ? 'visible' : 'hidden' }}
          />
          <Tabs.Tab value={label2}>
            {activeTab === label2 ? <img src={icon2Active} /> : <img src={icon2Inactive} />}
            {label2}
          </Tabs.Tab>
          <img
            src="/icons/TabDivider.svg"
            className={TabStyles.TabDivider}
            style={{ visibility: activeTab === label1 ? 'visible' : 'hidden' }}
          />
        </div>
        <div className={TabStyles.TabDiv}>
          <Tabs.Tab value={label3}>
            {activeTab === label3 ? <img src={icon3Active} /> : <img src={icon3Inactive} />}
            {label3}
          </Tabs.Tab>
        </div>
      </Tabs.List>

      <Tabs.Panel value={label1}>{panel1}</Tabs.Panel>
      <Tabs.Panel value={label2}>{panel2}</Tabs.Panel>
      <Tabs.Panel value={label3}>{panel3}</Tabs.Panel>
    </Tabs>
  );
}
