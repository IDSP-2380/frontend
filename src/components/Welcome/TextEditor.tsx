import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import FormClasses from "./Form.module.css"

// Register undo and redo handlers with proper 'this' typing
function undoHandler(this: {quill: Quill}) {
  this.quill.history.undo();
}

function redoHandler(this: {quill: Quill}) {
  this.quill.history.redo();
}

const TextEditor = () => {
  const [value, setValue] = useState('');
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: {
      container: "#toolbar",
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

  return (
    <div>
      <div id="toolbar" className='ql-toolbar'>
      <select className="ql-header">
        <option value="1" />
        <option value="2" />
        <option selected />
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-undo"> <img src="/undo.svg" alt="" /> </button>
      <button className="ql-redo" ><img src="/undo.svg" alt="" style={{ transform: 'scaleX(-1)' }}/> </button>
    </div>
      <ReactQuill 
        ref={quillRef}
        theme="snow" 
        value={value} 
        onChange={setValue} 
        modules={modules} 
      />
    </div>
  );
};

export default TextEditor;