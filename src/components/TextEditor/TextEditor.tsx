import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill';
import { usePublicStoryStore } from '@/stores/publicStoryStore';
import { useStoryConfigStore } from '@/stores/storyStore';
import FormClasses from './Form.module.css';

interface TextEditorProps {
  heading?: string;
}

function undoHandler(this: { quill: Quill }) {
  this.quill.history.undo();
}

function redoHandler(this: { quill: Quill }) {
  this.quill.history.redo();
}

const TextEditor = ({ heading }: TextEditorProps) => {
  const { maxWordCount, setMaxWordCount } = useStoryConfigStore();
  const { linkContent, setLinkContent } = usePublicStoryStore();

  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        undo: undoHandler,
        redo: redoHandler,
      },
    },
    history: {
      delay: 1000,
      maxStack: 100,
      userOnly: true,
    },
  };

  function getWordCount(html: string): number {
    const text = html
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .trim();
    return text === '' ? 0 : text.split(/\s+/).length;
  }

  return (
    <>
      <h2 className="h2">{heading}</h2>
      <div className="textEditorDiv">
        <div id="toolbar" className="ql-toolbar">
          <button className="ql-undo toolbar-item">
            {' '}
            <img src="/undo.svg" alt="" className="toolbar-item" />{' '}
          </button>
          <button className="ql-redo toolbar-item">
            <img
              src="/undo.svg"
              alt=""
              style={{ transform: 'scaleX(-1)' }}
              className="toolbar-item"
            />{' '}
          </button>

          <div className="toolbar-center">
            <select className="ql-header toolbar-item">
              <option value="1" />
              <option value="2" />
              <option selected />
            </select>

            <div className="toolbar-section">
              <button className="ql-bold toolbar-item" />
              <button className="ql-italic toolbar-item" />
              <button className="ql-underline toolbar-item" />
              <button className="ql-strike toolbar-item" />
              <button className="ql-mic toolbar-item">
                {' '}
                <img src="/microphone.svg" alt="" style={{ width: 18, height: 18 }} />{' '}
              </button>
            </div>
          </div>

          <label htmlFor="spell-check" className="toolbar-item spellcheck-label">
            Spell Check
          </label>
          <input type="checkbox" id="spell-check" name="spell-check" className="toolbar-item" />
        </div>

        <ReactQuill
          ref={quillRef}
          value={linkContent}
          onChange={setLinkContent}
          modules={modules}
          className="textBox"
          placeholder="The story begins..."
        />

        <input type="hidden" name="linkContent" value={linkContent} />

        <div className="wordCounter">
          Word Count: {getWordCount(linkContent)}/{maxWordCount}
        </div>
      </div>
    </>
  );
};

export default TextEditor;
