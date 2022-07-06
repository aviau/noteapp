import { Breadcrumbs, Divider, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ThemeContext } from 'ui/foundation/components/ThemeProvider';
import { fetchMarkdown } from './data';

interface FileBreadcrumbProps {
  filepath: string;
}

function FileBreadcrumb({ filepath }: FileBreadcrumbProps) {
  const urls = filepath.split('/');

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {urls.map((url: string) => (
        <Typography key={url} variant="subtitle1" color="inherit">
          {url}
        </Typography>
      ))}
    </Breadcrumbs>
  );
}

// TODO: External markdown links should open in browser
export function Editor() {
  const [searchParams] = useSearchParams();
  const { mode } = useContext(ThemeContext);

  const filepath = searchParams.get('filepath');

  const markdown = fetchMarkdown(filepath);

  return (
    <>
      {filepath && <FileBreadcrumb filepath={filepath} />}
      <Divider />
      <CodeMirror value={markdown} theme={mode} />
    </>
  );
}
