import React, { useState } from 'react'
import { ReturnIcon, ValidIcon } from '../../../svg'
import UnderlineInput from './UnderlineInput'
import MultipleSelect from './MultipleSelect'
import { useSelector } from 'react-redux'
import {ClipLoader} from "react-spinners"
import axios from 'axios'

function CreateGroup({setShowGroup}) {
    const {user}=useSelector(state=>state.user);
    console.log(user.token)
    const {status}=useSelector((state)=>state.chat);
    console.log(status)
    const [searchResults,setSearchResults]=useState([])
    const [selectedUsers,setSelectedUsers]=useState([])
    const [name,setName]=useState("")
    const handleSearch=async(e)=>{
      if(e.target.value.length && e.key==="Enter"){
        setSearchResults([]);
          try {
              const {data}=await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,{
                  headers:{
                      Authorization:`Bearer ${user.token}`,
                  }
              })
              if(data.length>0)  {
                let tempArray=[];
                data.forEach((user) => {
                  let temp={
                      value:user._id,
                      label:user.name,
                      picture:user.picture,
                  };
                  tempArray.push(temp);
                });
              setSearchResults(tempArray);

              }
              else{
                setSearchResults([]);
              }
             
          } catch (error) {
              console.log(error.response.data.error.message)
          }
      }
      else{
          setSearchResults([])
      }
       
  }
  return (
    <div className='createGroupAnimation relative flex0030 h-full z-40'>
        {/* Container */}
        <div className='mt-5'>
            {/* Return/Close button */}
            <button className='btn w-6 h-6 border' onClick={setShowGroup(false)}>
                <ReturnIcon className={"fill-white"}/>
            </button>
            {/* Group name input */}
            <UnderlineInput name={name} setName={setName}/>
            {/* Multiple Selections */}
            <MultipleSelect selectedUsers={selectedUsers} searchResults={searchResults} setSelectedUsers={setSelectedUsers} handleSearch={handleSearch}/>
            {/* Create button group */}
            <div className='absolute bottom-1/3 left-1/2 -translate-x-1/2 max-h-fit '>
            <button className='btn bg-green_1 scale-150 hover:bg-green-500'>
              {
                status==="loading"? <ClipLoader color='#E9EDF'/> : <ValidIcon className={"fill-white mt-2"}/>
              }
            </button>
            </div>
        </div>
    </div>
  )
}

export default CreateGroup