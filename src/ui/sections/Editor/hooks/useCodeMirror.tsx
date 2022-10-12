import { defaultKeymap } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { indentOnInput } from "@codemirror/language";
import { languages } from "@codemirror/language-data";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export const editorTheme = EditorView.theme({
    "&": {
        height: "75vh",
    },
    ".cm-content": {
        caretColor: "var(--cursor-color)",
    },
    ".cm-scroller": {
        overflow: "auto",
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    },
    "::-webkit-scrollbar": {
        width: "0.5em",
    },
    "::-webkit-scrollbar-track": {
        borderRadius: "1em",
        backgroundColor: "rgba(160,160,160,.1)",
    },
    "::-webkit-scrollbar-thumb": {
        borderRadius: "1em",
        backgroundColor: "rgba(160,160,160,.3)",
    },
});

interface Props {
  initialDoc: string;
  onChange: (state: EditorState) => void;
}

// Inspired by https://github.com/warmachine028/markdown-editor/blob/main/packages/renderer/src/use-codemirror.tsx
// TODO: explore using the following extensions:
//  - @codemirror/history
//  - @codemirror/matchbrackets
//  - @codemirror/highlight
export const useCodeMirror = <T extends Element>(
    props: Props
): [React.MutableRefObject<T | null>, EditorView?] => {
    const refContainer = useRef<T>(null);
    const [editorView, setEditorView] = useState<EditorView>();
    const { onChange } = props;

    useEffect(() => {
        if (!refContainer.current) return () => {};

        const startState = EditorState.create({
            doc: props.initialDoc,
            extensions: [
                keymap.of([...defaultKeymap]),
                indentOnInput(),
                markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                    addKeymap: true,
                }),
                editorTheme,
                EditorView.lineWrapping,
                EditorView.updateListener.of((update) => {
                    if (update.changes) {
                        onChange(update.state);
                    }
                }),
            ],
        });

        const view = new EditorView({
            state: startState,
            parent: refContainer.current,
        });
        setEditorView(view);

        return () => {
            view.destroy();
            setEditorView(undefined);
        };
    }, [onChange, props.initialDoc, refContainer]);

    return [refContainer, editorView];
};
