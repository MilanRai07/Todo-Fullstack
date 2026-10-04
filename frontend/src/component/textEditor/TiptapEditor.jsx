import { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit"; // v3 already includes Link and Underline
// Importing necessary extensions for the Tiptap editor
import {
  Bold,
  ChevronDown,
  Code,
  Highlighter,
  Italic,
  Link,
  List,
  ListOrdered,
  ListTodo,
  Minus,
  Plus,
  Strikethrough,
  Table2,
  TextQuote,
  Trash2,
  Underline,
} from "lucide-react";
import Highlight from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extensions";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import "../../style/component/tiptap-editor.css";

const ACTIONS = [
  { id: "bold", label: <Bold size={16} />, title: "Bold", run: (c) => c.toggleBold(), active: ["bold"] },
  { id: "italic", label: <Italic size={16} />, title: "Italic", run: (c) => c.toggleItalic(), active: ["italic"] },
  { id: "underline", label: <Underline size={16} />, title: "Underline", run: (c) => c.toggleUnderline(), active: ["underline"] },
  { id: "strike", label: <Strikethrough size={16} />, title: "Strikethrough", run: (c) => c.toggleStrike(), active: ["strike"] },
  { id: "highlight", label: <Highlighter size={16} />, title: "Highlight", run: (c) => c.toggleHighlight(), active: ["highlight"] },
  { id: "code", label: <Code size={16} />, title: "Inline code", run: (c) => c.toggleCode(), active: ["code"] },
  "sep",
  { id: "quote", label: <TextQuote size={16} />, title: "Quote", run: (c) => c.toggleBlockquote(), active: ["blockquote"] },
  "sep",
  { id: "bullet", label: <List size={16} />, title: "Bulleted list", run: (c) => c.toggleBulletList(), active: ["bulletList"] },
  { id: "ordered", label: <ListOrdered size={16} />, title: "Numbered list", run: (c) => c.toggleOrderedList(), active: ["orderedList"] },
  { id: "task", label: <ListTodo size={16} />, title: "Checkable task list", run: (c) => c.toggleTaskList(), active: ["taskList"] },
  "sep",
];

// LinkInput component for handling link insertion and removal
function LinkInput({ editor, onDone }) {
  const ref = useRef(null);
  const [value, setValue] = useState(editor.getAttributes("link").href || "");
  useEffect(() => ref.current?.focus(), []);

  const apply = () => {
    let v = value.trim();
    if (!v) editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else {
      if (!/^(https?:|mailto:)/i.test(v)) v = "https://" + v;
      editor.chain().focus().extendMarkRange("link").setLink({ href: v }).run();
    }
    onDone();
  };

  return (
    <div className="tt-row">
      <input
        ref={ref}
        type="url"
        value={value}
        placeholder="Paste a link, press Enter"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); apply(); }
          if (e.key === "Escape") { e.preventDefault(); onDone(); editor.commands.focus(); }
        }}
      />
      <button type="button" onClick={() => { editor.chain().focus().extendMarkRange("link").unsetLink().run(); onDone(); }}>
        Remove
      </button>
      <button type="button" aria-label="Back" onClick={() => { onDone(); editor.commands.focus(); }}>&times;</button>
    </div>
  );
}

// Toolbar component for the editor, containing formatting actions
function Toolbar({ editor }) {
  const [linkMode, setLinkMode] = useState(false);
  const [tableMenuOpen, setTableMenuOpen] = useState(false);
  const [textStyleMenuOpen, setTextStyleMenuOpen] = useState(false);
  const tableDropdownRef = useRef(null);
  const tableTriggerRef = useRef(null);
  const textStyleDropdownRef = useRef(null);
  const textStyleTriggerRef = useRef(null);

  useEffect(() => {
    if (!tableMenuOpen && !textStyleMenuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!tableDropdownRef.current?.contains(event.target)) setTableMenuOpen(false);
      if (!textStyleDropdownRef.current?.contains(event.target)) setTextStyleMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        if (textStyleMenuOpen) {
          setTextStyleMenuOpen(false);
          textStyleTriggerRef.current?.focus();
        } else {
          setTableMenuOpen(false);
          tableTriggerRef.current?.focus();
        }
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [tableMenuOpen, textStyleMenuOpen]);

  // Re-render only when the active-state flags change.
  const active = useEditorState({
    editor,
    selector: ({ editor }) => ({
      ...Object.fromEntries(
        [...ACTIONS, { id: "link", active: ["link"] }, { id: "table", active: ["table"] }]
          .filter((a) => a !== "sep")
          .map((a) => [a.id, editor.isActive(...a.active)])
      ),
      headingLevel: [1, 2, 3, 4].find((level) => editor.isActive("heading", { level }))?.toString() || "",
    }),
  });

  const insertTable = (rows, cols) => {
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    setTableMenuOpen(false);
  };

  const runTableCommand = (command) => {
    const chain = editor.chain().focus();
    chain[command]().run();
    setTableMenuOpen(false);
  };

  const setTextStyle = (level) => {
    const chain = editor.chain().focus();
    if (level) chain.setNode("heading", { level: Number(level) }).run();
    else chain.setParagraph().run();
    setTextStyleMenuOpen(false);
  };

  return (
    <div className="tt-toolbar">
      {linkMode ? (
        <LinkInput editor={editor} onDone={() => setLinkMode(false)} />
      ) : (
        <div className="tt-row">
          <div className="tt-dropdown" ref={textStyleDropdownRef}>
            <button
              ref={textStyleTriggerRef}
              className="tt-style-trigger"
              type="button"
              aria-label="Text style"
              aria-haspopup="menu"
              aria-expanded={textStyleMenuOpen}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setTextStyleMenuOpen((open) => !open)}
            >
              <span>{active.headingLevel ? `Heading ${active.headingLevel}` : "Paragraph"}</span>
              <ChevronDown size={14} />
            </button>
            {textStyleMenuOpen && (
              <div className="tt-dropdown-menu" role="menu">
                <p className="tt-dropdown-menu-label">Text style</p>
                {["", "1", "2", "3", "4"].map((level) => {
                  const label = level ? `Heading ${level}` : "Paragraph";
                  return (
                    <button
                      key={level || "paragraph"}
                      type="button"
                      role="menuitemradio"
                      aria-checked={active.headingLevel === level}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => setTextStyle(level)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <span className="tt-sep" />
          {ACTIONS.map((a, i) =>
            a === "sep" ? (
              <span key={i} className="tt-sep" />
            ) : (
              <button
                key={a.id}
                type="button"
                title={a.title}
                aria-label={a.title}
                aria-pressed={active[a.id]}
                className={active[a.id] ? "on" : ""}
                onMouseDown={(e) => e.preventDefault()} // keep the text selection
                onClick={() => a.run(editor.chain().focus()).run()}
              >
                {a.label}
              </button>
            )
          )}
          <div className="tt-dropdown" ref={tableDropdownRef}>
            <button
              ref={tableTriggerRef}
              type="button"
              title="Table options"
              aria-label="Table options"
              aria-haspopup="menu"
              aria-expanded={tableMenuOpen}
              className={active.table ? "on" : ""}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setTableMenuOpen((open) => !open)}
            >
              <Table2 size={16} />
              <span>Table</span>
              <ChevronDown size={14} />
            </button>
            {tableMenuOpen && (
              <div className="tt-dropdown-menu" role="menu">
                {active.table ? (
                  <>
                    <p className="tt-dropdown-menu-label">Edit table</p>
                    <button type="button" role="menuitem" onClick={() => runTableCommand("addRowAfter")}>
                      <Plus size={15} /> Add row after
                    </button>
                    <button type="button" role="menuitem" onClick={() => runTableCommand("addColumnAfter")}>
                      <Plus size={15} /> Add column after
                    </button>
                    <button type="button" role="menuitem" onClick={() => runTableCommand("deleteRow")}>
                      <Minus size={15} /> Delete current row
                    </button>
                    <button type="button" role="menuitem" onClick={() => runTableCommand("deleteColumn")}>
                      <Minus size={15} /> Delete current column
                    </button>
                    <button className="tt-dropdown-menu-danger" type="button" role="menuitem" onClick={() => runTableCommand("deleteTable")}>
                      <Trash2 size={15} /> Delete table
                    </button>
                  </>
                ) : (
                  <>
                    <p className="tt-dropdown-menu-label">Insert table</p>
                    {[2, 3, 4].map((size) => (
                      <button
                        key={size}
                        type="button"
                        role="menuitem"
                        onClick={() => insertTable(size, size)}
                      >
                        <Table2 size={15} /> {size} × {size}
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
          <span className="tt-sep" />
          <button
            type="button"
            title="Link"
            aria-pressed={active.link}
            className={active.link ? "on" : ""}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setLinkMode(true)}
          >
            <Link size={16} />
            <span>Link</span>
          </button>
        </div>
      )}
    </div>
  );
}


// Main TiptapEditor component that integrates the editor and its functionalities
export default function TiptapEditor({
  content = "<h1>Write something worth reading</h1><p>Start typing to edit this document.</p>",
  onChange,
  editable = true,
  placeholder = "Start typing\u2026",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false, autolink: true },
        heading: { levels: [1, 2, 3, 4] },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Highlight,
      Placeholder.configure({ placeholder }),
    ],
    content,
    editable,
    immediatelyRender: false, // avoids hydration mismatches in Next.js / SSR
    editorProps: { attributes: { "aria-label": "Document" } },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  const words = useEditorState({
    editor,
    selector: ({ editor }) => {
      const t = editor?.getText().trim();
      return t ? t.split(/\s+/).length : 0;
    },
  });

  if (!editor) return null;

  return (
    <div className="tt-wrap">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="tt-content" />
      <div className="tt-count">{words} {words === 1 ? "word" : "words"}</div>
    </div>
  );
}
