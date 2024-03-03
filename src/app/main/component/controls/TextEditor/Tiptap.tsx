import './styles.scss'

import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import clsx from 'clsx'
import { useEffect, useCallback } from 'react'

const MenuBar = (
  { 
    className,
    style,
    editor
  } : {
    className? : string,
    style? : any,
    editor: Editor | null
  }
) => {
  if (!editor) {
    return null
  }

  return (
    <div className={clsx('tiptap-toolbar', {className})} style={{...style}}>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-red-200' : ''}>
        h1
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-red-200' : ''}>
        h2
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-red-200' : ''}>
        h3
      </button>
      <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'bg-red-200' : ''}>
        paragraph
      </button>
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-red-200' : ''}>
        bold
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-red-200' : ''}>
        italic
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-red-200' : ''}>
        strike
      </button>
      <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'bg-red-200' : ''}>
        highlight
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'bg-red-200' : ''}>
        left
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'bg-red-200' : ''}>
        center
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'bg-red-200' : ''}>
        right
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'bg-red-200' : ''}>
        justify
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-red-200' : ''}>
        bullet list
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-red-200' : ''}>
        ordered list
      </button>
      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
        undo
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
        redo
      </button>
    </div>
  )
}

export class TiptapCallbackManager {
  callbackSetContent : ((c : string) => void) | null = null;
  callbackGetContent : (() => string) | null = null;
  registerSetContentCallback(f : any) {
    this.callbackSetContent = f;
  }
  registerGetContentCallback(f : any) {
    this.callbackGetContent = f;
  }
  setContent(c : string) {
    if(this.callbackSetContent)
      this.callbackSetContent(c);
  }
  getContent() {
    if(this.callbackGetContent)
      return this.callbackGetContent();
  }
}

export default function Tiptap(
  {
    width,
    height,
    content = '',
    callbackManager,
  } : {
    width : string,
    height : string,
    content? : string,
    callbackManager? : TiptapCallbackManager
  }) {
  const editor : Editor | null = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    content: content,
    // content: `
    //   <h3 style="text-align:center">
    //     Devs Just Want to Have Fun by Cyndi Lauper
    //   </h3>
    //   <p style="text-align:center">
    //     I come home in the morning light<br>
    //     My mother says, <mark>“When you gonna live your life right?”</mark><br>
    //     Oh mother dear we’re not the fortunate ones<br>
    //     And devs, they wanna have fun<br>
    //     Oh devs just want to have fun</p>
    //   <p style="text-align:center">
    //     The phone rings in the middle of the night<br>
    //     My father yells, "What you gonna do with your life?"<br>
    //     Oh daddy dear, you know you’re still number one<br>
    //     But <s>girls</s>devs, they wanna have fun<br>
    //     Oh devs just want to have
    //   </p>
    //   <p style="text-align:center">
    //     That’s all they really want<br>
    //     Some fun<br>
    //     When the working day is done<br>
    //     Oh devs, they wanna have fun<br>
    //     Oh devs just wanna have fun<br>
    //     (devs, they wanna, wanna have fun, devs wanna have)
    //   </p>
    // `,
  })

  const getContent = useCallback(() => editor?.getHTML(), [editor]);
  const setContent = useCallback((content : string) => editor?.commands.setContent(content), [editor]);

  useEffect(() => {
  callbackManager?.registerSetContentCallback(setContent);
  callbackManager?.registerGetContentCallback(getContent);
  }, [callbackManager, getContent, setContent]);

  return (
    <div className='flex flex-col gap-1'>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className='border-[1px] border-black overflow-auto'
        style={{width: `${width}`, height: `${height}`}}
        />
    </div>
  )
}