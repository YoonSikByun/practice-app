import { useMemo, useState } from "react";
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic' // next.js로 Quill 실행 시 렌더링 순서 잡아주기 
import dompurify  from "dompurify"
const ReactQuill = dynamic(() => import("react-quill"), {ssr: false}) 
export default function TextEditor() {
  const printEditor = () => {
    setTextresult(values)
    setValues(textresult)
  };
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
  const [textresult , setTextresult] = useState('');
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
    <>
      <ReactQuill
       theme="snow"
       modules={modules}
       formats={formats}
       style={{ marginLeft:"40px", width: "700px", height: "300px" }}
       onChange={setValues}
     />
     <button onClick={printEditor}>출력</button>
     <div dangerouslySetInnerHTML={{__html: dompurify.sanitize(textresult)}}></div>
     <div>{values}</div>
    </>
  );
}