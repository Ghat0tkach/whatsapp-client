import React, { useRef } from 'react'
import { CloseIcon } from '../../../../svg'
import { useDispatch } from 'react-redux';
import { addFiles } from '../../../../features/ChatSlice';
import { getFileType } from '../../../../utils/file';

function AddFile() {
    const dispatch=useDispatch();
    const inputRef=useRef(null);
    function fileHandler(e){
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
                        fileData:
                        getFileType(file.type)==="IMAGE"?
                        e.target.result:"",
                        type:getFileType(file.type)}));
                        
                }
            }
        })
    }
  return (
    <>
       <div 
       onClick={()=>inputRef.current.click()}
       className='w-14 h-14 mt-2 border dark:border-white rounded-md flex items-center justify-center cursor-pointer'>
        <span className='rotate-45' >
        <CloseIcon className='dark:fill-dark_svg_1'/>
        </span>
       </div>
       <input type="file" hidden multiple ref={inputRef} accept='application/* ,text/plain,audio/wav,audio/mpeg,image/*,image/gif,image/png,image/jpeg,image/webp,video/mp4,video/mpeg'
      onChange={fileHandler}
     
     />

    </>
  )
}

export default AddFile