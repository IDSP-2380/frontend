import { useState } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

export function TextEditor() {
  const [value, setValue] = useState('');

  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white' }}>
      <ReactQuill theme="snow" value={value} onChange={setValue} style={{ minHeight: '200px' }} />
    </div>
  );
}
