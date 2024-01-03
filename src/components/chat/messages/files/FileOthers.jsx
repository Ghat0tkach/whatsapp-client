import React from 'react'
import DownloadIcon from '../../../../svg/DownloadIcon'
import { ConvertToMb } from '../../../../utils/file'

function FileOthers({file,type}) {
    let size=ConvertToMb(file.bytes)
  return (
    <div className='dark:bg-green_4 p-2 rounded-lg'>
    <div className='flex justify-between gap-x-8 dark:bg-green_2 p-2 rounded-lg'>
    {/* file Infos */}
    <div className='flex items-center gap-2'>
        <img src={`../../../../images/file/${type}.png`} className='w-8 object-contain' alt=''/>
        <div className='flex flex-col gap-2'>
            <h1 className='text-sm'>{file.original_filename} {file.public_id.split('/')[1]}</h1>
            <span className='text-xs font-thin '>
                {type} . {size} Mb
            </span>
        </div>
    </div>
    {/* Download  */}
    <a href={file.secure_url} target='_blank' download>
        <DownloadIcon/>
    </a>
    </div>
   </div>
  )
}
export default FileOthers