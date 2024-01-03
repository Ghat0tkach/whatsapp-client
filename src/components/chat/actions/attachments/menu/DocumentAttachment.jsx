import React, { useRef } from 'react'
import { DocumentIcon } from '../../../../../svg'
import { useDispatch } from 'react-redux';
import { addFiles } from '../../../../../features/ChatSlice';
import { getFileType } from '../../../../../utils/file';

function DocumentAttachment() {
    const inputRef=useRef(null);
    const dispatch=useDispatch();
    const DocumentHandler=(e)=>{
        let files=Array.from(e.target.files);
        files.forEach((file)=>{
            
            if(file.type!=='application/pdf' && file.type!=='text/plain' && file.type!=='application/vnd.ms-powerpoint'&& file.type!=='application/vnd.openxmlformats-officedocument.presentationml.presentation' && file.type!=='application/vnd.ms-excel' && file.type!=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'&& file.type!=='application/vnd.rar' && file.type!=='application/zip '  && file.type!=='audio/mpeg '  && file.type!=='audio/wav ' ){
                files=files.filter((item)=>item.name !==file.name);
                return;
            }else if(file.size>1024*1024*10){
                files=files.filter((item)=>item.name !==file.name);
                return;
            }
            else{
                const reader=new FileReader();
                reader.readAsDataURL(file);
                reader.onload=(e)=>{
                    dispatch(addFiles(
                        {file:file,
                        // fileData:e.target.result,
                        type:getFileType(file.type)}));
                }
            }
        })
    }
  return (
    <li>
      <button type="button" className="bg-[#5F66CD] rounded-full">
       <DocumentIcon/>
       <input type="file" hidden multiple ref={inputRef} accept='application/* ,text/plain,audio/wav,audio/mpeg'
      onChange={DocumentHandler}
     
     />
       </button>
      
    </li>
  )
}

export default DocumentAttachment