import { Box, Tab, Tabs, TabsProps, useTheme } from '@mui/material';
import React, { ReactNode, useState } from 'react';

export type TabItem = {
  id: string;
  label?: string;
  icon?: React.ReactElement;
  children: ReactNode;
};

interface Props {
  items: TabItem[];
}

type ComposedProps = Props & TabsProps;

export function TabsPanel({ items, ...tabsProps }: ComposedProps) {
  const { orientation = 'horizontal' } = tabsProps;
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'row' : 'column',
        height: '100%',
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        sx={{ backgroundColor: theme.palette.secondary.dark }}
        {...tabsProps}
      >
        {items.map(({ id, label, icon }, index) => (
          <Tab key={id} icon={icon} label={label} value={index} />
        ))}
      </Tabs>

      {items.map(({ id, children }, index) => (
        <Box key={id} hidden={tabIndex !== index} sx={{ p: 3, width: '100%' }}>
          {children}
        </Box>
      ))}
    </Box>
  );
}
