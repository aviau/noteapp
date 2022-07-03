import { useState, ReactNode } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

export type TabItem = {
  label: string;
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
        {tabItems.map(({ label }, index) => (
          <Tab key={label} label={label} value={index} />
        ))}
      </Tabs>

      {tabItems.map(({ label, children }, index) => (
        <Box key={label} hidden={tabIndex !== index} sx={{ p: 3 }}>
          {children}
        </Box>
      ))}
    </Box>
  );
}
