import { EditorState } from "@codemirror/state";
import { Box, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchMarkdown } from "./data";
import { useCodeMirror } from "./hooks";

interface CodeMirrorProps {
  initialDoc: string;
  onChange: (doc: string) => void;
}

function CodeMirror({ initialDoc, onChange }: CodeMirrorProps) {
    const handleChange = useCallback(
        (state: EditorState) => onChange(state.doc.toString()),
        [onChange]
    );
    const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
        initialDoc,
        onChange: handleChange,
    });

    useEffect(() => {
        if (editorView) {
            // Do nothing for now
        }
    }, [editorView]);

    return <Box sx={{ p: 4 }} ref={refContainer} />;
}

// TODO: External markdown links should open in browser
export function Editor() {
    const theme = useTheme();
    const [searchParams] = useSearchParams();

    const filepath = searchParams.get("filepath");
    const filename = useMemo(() => filepath?.split("/").pop(), [filepath]);

    const markdown = fetchMarkdown(filepath);

    return (
        <Box sx={{ flex: 1 }}>
            <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
                <Typography variant="h6" paragraph p={1}>
                    {filename}
                </Typography>
            </Box>
            <CodeMirror initialDoc={markdown} onChange={() => {}} />
        </Box>
    );
}
