import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import {  BiEdit  } from "react-icons/bi";

const ReadRow = ({rowValue,deleteRow,handleEditClick,handleCheckBox}) => {
  return (
        <>
        <td><input  name={rowValue.id} 
        type="checkbox" className="checkbox" 
        onChange={(e)=>handleCheckBox(e)}/></td>
         <td className='name'>{rowValue.name}</td>
         <td className='email'>{rowValue.email}</td>
         <td className='role'>{rowValue.role}</td>       
         <td>
                <button onClick={()=>deleteRow(rowValue.id)}><FaRegTrashAlt  /></button> 
                <button onClick={(e)=>handleEditClick(e,rowValue)}><BiEdit /></button> 
        </td> 
        </>
  );
};

export default  ReadRow;