"use client";

import React, { useRef } from "react";
import { Editor, IAllProps } from "@tinymce/tinymce-react";

interface TinyEditorProps extends IAllProps {
  height?: number;
}

export default function TinyEditor({ height=30, ...props }: TinyEditorProps) {
  const editorRef = useRef<any>(null);
  return (
    <>
      <Editor
        {...props}
        apiKey="mket0gz2vleyx9rgc1te5l8lxyprcg60wv23tlog9sbef5r7"
        onInit={(evt, editor) => (editorRef.current = editor)}
        plugins="lists"
        init={{
          height: height,
          menubar: false,
          plugins: [
            "advlist autolink link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
}
