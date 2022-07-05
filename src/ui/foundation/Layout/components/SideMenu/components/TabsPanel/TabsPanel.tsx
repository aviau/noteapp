import React, { useState, ReactNode } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

export type TabItem = {
  id: string;
  label?: string;
  icon?: React.ReactElement;
  children: ReactNode;
};

interface Props {
  tabItems: TabItem[];
}

export function TabsPanel({ tabItems }: Props) {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabIndex} onChange={handleChange}>
        {tabItems.map(({ id, label, icon }, index) => (
          <Tab key={id} icon={icon} label={label} value={index} />
        ))}
      </Tabs>

      {tabItems.map(({ id, children }, index) => (
        <Box key={id} hidden={tabIndex !== index} sx={{ p: 3 }}>
          {children}
        </Box>
      ))}
    </Box>
  );
}
