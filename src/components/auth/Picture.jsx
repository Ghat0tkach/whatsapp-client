import { useRef, useState } from "react"

export default function Picture({readablePicture,setReadablePicture , setPicture}){
    const [error,setError]=useState("");
    const inputref=useRef();
    const handlePicture=(e)=>{
        let pic=e.target.files[0];
     if(pic.type!== "image/jpeg" && pic.type!== "image/png" && pic.type!== "image/webp" )
     {
        setError(`${pic.name} format is not supported`)
        return ;
     }
    else if(pic.size> 1024 *1024 *10){
        setError(`${pic.name} is too large , maximum 5mb allowed`);
    }else{
        setError("")
         setPicture(pic);
         const reader= new FileReader();
         reader.readAsDataURL(pic);
         reader.onload=(e)=>{
            setReadablePicture(e.target.result)
         }
    }
    }
return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
    <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture(optional)
    </label>
    {
        readablePicture? <div>
            <img src={readablePicture} alt="picture" className="w-20 h-20 object-cover rounded-full"/>
 
            <div className="w-20 mt-2 p-1 text-xs dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
        onClick={()=>inputref.current.click()}>
        Change 
        </div>
        </div>: 
        <div className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
        onClick={()=>inputref.current.click()}>
            Upload Picture
        </div>
    }
    <input type="file" name="picture" id="picture" hidden ref={inputref}
        accept="image/png , image/jpeg, image/webp"
        onChange={handlePicture}
    />
    {/* error */}
    <div className="mt-2">
        <p className="text-red-400">{error}</p>
    </div>
</div>
)}