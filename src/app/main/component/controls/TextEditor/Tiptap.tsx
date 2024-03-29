import './Tiptap-styles.scss';

import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import clsx from 'clsx';
import { Size } from '@/app/common/lib/definition';
import { useEffect, useCallback } from 'react';
import Image from 'next/image';

import fontSize from "@/app/main/image/Tiptap/font-size.svg";
import alignCenter from "@/app/main/image/Tiptap/align-center.svg";
import paragraph from "@/app/main/image/Tiptap/paragraph.svg";
import bold from "@/app/main/image/Tiptap/bold.svg";
import italic from "@/app/main/image/Tiptap/italic.svg";
import strikethrough from "@/app/main/image/Tiptap/strikethrough.svg";
import highlight from "@/app/main/image/Tiptap/highlight.svg";
import alignLeft from "@/app/main/image/Tiptap/align-left.svg";
import alignRight from "@/app/main/image/Tiptap/align-right.svg";
import justifyAlign from "@/app/main/image/Tiptap/justify-align.svg";
import bulletList from "@/app/main/image/Tiptap/bullet-list.svg";
import orderedList from "@/app/main/image/Tiptap/ordered-list.svg";
import blockquote from "@/app/main/image/Tiptap/blockquote.svg";
import horizontalRule from "@/app/main/image/Tiptap/horizontal-rule.svg";
import codeBlock from "@/app/main/image/Tiptap/code-block.svg";
import undo from "@/app/main/image/Tiptap/undo.svg";
import redo from "@/app/main/image/Tiptap/redo.svg";

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
  if (!editor) { return null }

  const imgSize : Size = {width : 19, height : 19};

  return (
    <div className={clsx('tiptap-toolbar', 'flex flex-row flex-wrap',
      {className})}
      style={{...style}}
    >
      <button type='button' onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-red-200' : ''} title='h1 크기'>
      <Image
          priority
          src={fontSize}
          style={{width : imgSize.width, height : imgSize.height }}
          alt="h1 크기"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-red-200' : ''} title='h2 크기'>
      <Image
          priority
          src={fontSize}
          style={{width : imgSize.width-5, height : imgSize.height-5 }}
          className='m-[2.5px]'
          alt="h2 크기"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-red-200' : ''} title='h3 크기'>
      <Image
          priority
          src={fontSize}
          className='m-[3.5px]'
          style={{width : imgSize.width-7, height : imgSize.height-7 }}
          alt="h3 크기"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'bg-red-200' : ''} title='문단'>
        <Image
          priority
          src={paragraph}
          style={{width : imgSize.width, height : imgSize.height }}
          alt="문단"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-red-200' : ''} title='글자 굵게'>
        <Image
          priority
          src={bold}
          style={{width : imgSize.width, height : imgSize.height }}
          alt="글자 굵게"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-red-200' : ''} title='이태릭'>
      <Image
          priority
          src={italic}
          style={{width : imgSize.width, height : imgSize.height }}
          alt="이태릭"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-red-200' : ''} title='취소선'>
      <Image
          priority
          src={strikethrough}
          style={{width : imgSize.width, height : imgSize.height }}
          alt="취소선"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'bg-red-200' : ''} title='강조'>
      <Image
          priority
          src={highlight}
          style={{width : imgSize.width, height : imgSize.height }}
          alt="강조"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'bg-red-200' : ''} title='왼쪽 정렬'>
      <Image
          priority
          src={alignLeft}
          style={{width : imgSize.width, height : imgSize.height }}
          alt="왼쪽 정렬"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'bg-red-200' : ''} title='가운데 정렬'>
        <Image
        priority
        src={alignCenter}
        style={{width : imgSize.width, height : imgSize.height }}
        alt="가운데 정렬"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'bg-red-200' : ''} title='오른쪽 정렬'>
      <Image
        priority
        src={alignRight}
        style={{width : imgSize.width, height : imgSize.height }}
        alt="오른쪽 정렬"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'bg-red-200' : ''} title='평문 정렬'>
      <Image
        priority
        src={justifyAlign}
        style={{width : imgSize.width, height : imgSize.height }}
        alt="평문 정렬"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-red-200' : ''} title='목록화'>
        <Image
        priority
        src={bulletList}
        style={{width : imgSize.width, height : imgSize.height }}
        alt="목록화"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-red-200' : ''} title='번호 목록화'>
      <Image
        priority
        src={orderedList}
        style={{width : imgSize.width, height : imgSize.height }}
        alt="번호 목록화"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'bg-red-200' : ''} title='블록쿼트'>
      <Image
        priority
        src={blockquote}
        style={{width : imgSize.width, height : imgSize.height }}
        alt="블록쿼트"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().setHorizontalRule().run()} title='수평선'>
      <Image
        priority
        src={horizontalRule}
        style={{width : imgSize.width, height : imgSize.height }}
        alt="수평선"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'bg-red-200' : ''} title='코드 블록'>
      <Image
        priority
        src={codeBlock}
        style={{width : imgSize.width, height : imgSize.height }}
        alt="코드 블록"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} title='작업 취소'>
      <Image
        priority
        src={undo}
        style={{width : imgSize.width, height : imgSize.height }}
        alt="작업 취소"/>
      </button>
      <button type='button' onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} title='작업 되돌리기'>
      <Image
        priority
        src={redo}
        style={{width : imgSize.width, height : imgSize.height }}
        alt="작업 되돌리기"/>
      </button>
    </div>
  )
}

export class TiptapCallbackManager {
  callbackSetContent : ((c : string) => void) | null = null;
  callbackGetContent : (() => string) | null = null;
  registerSetContent(f : any) {
    this.callbackSetContent = f;
  }
  registerGetContent(f : any) {
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
    width='',
    height,
    content = '',
    className = '',
    word_limit = 2500,
    callbackManager,
  } : {
    width? : string,
    height : string,
    content? : string,
    className? : string,
    word_limit? : number,
    callbackManager? : TiptapCallbackManager
  }) {
  const tiptapWidth = (width) ? width : '630px';
  const limit = word_limit;
  const editor : Editor | null = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      },),
      Highlight,
      CharacterCount.configure({
        limit,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    content: content,
  })

  const getContent = useCallback(() => editor?.getHTML(), [editor]);
  const setContent = useCallback((content : string) => editor?.commands.setContent(content), [editor]);
  
  useEffect(() => {
    callbackManager?.registerSetContent(setContent);
    callbackManager?.registerGetContent(getContent);
  }, [callbackManager, getContent, setContent]);

  const onFocus = () => {
    editor?.commands.focus('all');
  }

  return (
    <div className='flex flex-col gap-1'>

      {/* 아래 input은 탭 오더로 포커스를 받으면 tiptap editor로 포커스를 주기 위한 용도이다. */}
      <input type='text' className={clsx(className, 'h-0 w-0')} onFocus={onFocus}/>

      <MenuBar editor={editor} style={{width: `${tiptapWidth}`, height: '35px'}} />
      <EditorContent
        editor={editor}
        className={clsx('border-[1px] border-black overflow-y-scroll')}
        style={{width: `${tiptapWidth}`, height: `${height}`}}
        onMouseDown={() => editor?.commands.focus()}
      />
      <div className="character-count text-right"
          style={{width: `${tiptapWidth}`}}
      >
        <p>({editor?.storage.characterCount.characters()} / {limit}) 글자</p>
      </div>
    </div>
  )
}

export function StringHtmlRender(stringHtml : string) {
  const theObj = {__html : stringHtml};
  return <div className='tiptap m-2' dangerouslySetInnerHTML={theObj} />
}
