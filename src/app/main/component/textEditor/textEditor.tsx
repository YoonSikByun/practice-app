import { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

export default function TextEditor() {
    const formats = [
        'font',
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'align',
        'color',
        'background',
        'size',
        'h1',
      ];
      const [values, setValues] = useState('');

      const modules = useMemo(() => {
         return {
           toolbar: {
             container: [
               [{ size: ['small', false, 'large', 'huge'] }],
               [{ align: [] }],
               ['bold', 'italic', 'underline', 'strike'],
               [{ list: 'ordered' }, { list: 'bullet' }],
               [
                 {
                   color: [],
                 },
                 { background: [] },
               ],
             ],
           },
         };
       }, []);
     
    return(
          <ReactQuill
           theme="snow"
           modules={modules}
           formats={formats}
           style={{ marginLeft:"40px", width: "700px", height: "300px" }}
           onChange={setValues}
         />
        );
}