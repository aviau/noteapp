import { Box, Typography, useTheme } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ThemeContext } from 'ui/foundation/components/ThemeProvider';
import { fetchMarkdown } from './data';

// TODO: External markdown links should open in browser
export function Editor() {
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();

  const filepath = searchParams.get('filepath');
  const fileName = useMemo(() => filepath?.split('/').pop(), [filepath]);

  const markdown = fetchMarkdown(filepath);

  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
        <Typography variant="h6" paragraph p={1}>
          {fileName}
        </Typography>
      </Box>
      <CodeMirror value={markdown} theme={mode} />
    </>
  );
}
