import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
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
    <>
    <h2 className="h2">Start your story</h2>
    <div className="textEditorDiv">
    <div id="toolbar" className='ql-toolbar'>

      
        <button className="ql-undo toolbar-item" > <img src="/undo.svg" alt="" className='toolbar-item'/> </button>
        <button className="ql-redo toolbar-item" ><img src="/undo.svg" alt="" style={{ transform: 'scaleX(-1)' }} className='toolbar-item'/> </button>
     

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
        <button className="ql-mic toolbar-item"> <img src="/microphone.svg" alt="" style={{width: 18, height: 18}}/> </button>
      </div>
      </div>
      
      
      
        <label htmlFor="spell-check" className="toolbar-item spellcheck-label">Spell Check</label>
        <input type="checkbox" id='spell-check' name='spell-check' className="toolbar-item"/>
      
      
    </div>
  
      <ReactQuill 
        ref={quillRef}
        value={value} 
        onChange={setValue} 
        modules={modules} 
        className="textBox"
        placeholder='The story begins...'
      />
      <input type="hidden" name='linkContent' value={value}/>
    </div>
    </>
  );
};

export default TextEditor;