"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapMenuBar from "./TiptapMenubar";

interface TiptapRichtexteditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapRichtexteditor = (props: TiptapRichtexteditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: props.content,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert border rounded-md p-3 max-w-none min-h-[156px] text-xs md:text-sm",
      },
    },
    onUpdate: ({ editor }) => {
      props.onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <TiptapMenuBar editor={editor} />
      <EditorContent editor={editor} className="" />
    </div>
  );
};

export default TiptapRichtexteditor;
