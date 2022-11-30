import React from 'react';
import './App.css';
import {useEditor} from "./hooks/useEditor"
function App() {

  const {updateInput, showInfo, clickHandler,length, editorRef } = useEditor()

  return (
    <div className="editor-wrapper">
      <div
        ref={editorRef}
        className="editor"
        id="editor"
        contentEditable
        onInput={updateInput}
      />
      <span className='counter'>{length}</span>
      <button className='button' onMouseDown={clickHandler}>Dima</button> 
      <button className='button' onMouseDown={clickHandler}>02 November 2022</button> 
      <button className='button' onMouseDown={clickHandler}>13:45</button> 
      <button className='button' onMouseDown={clickHandler}>www.test.com</button> 
      <button className='button' onMouseDown={clickHandler}>visit-date</button> 
      <button className='button' onClick={showInfo}>save</button>
    </div>
  );
}

export default App;
