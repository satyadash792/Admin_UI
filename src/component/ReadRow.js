import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import {  BiEdit  } from "react-icons/bi";

const ReadRow = ({inputBoxTest,rowValue,deleteRow,handleEditClick,handleCheckBox}) => {
  return (
        <>
        <td><input  name={rowValue.id} checked={inputBoxTest}
        type="checkbox" className="checkbox" 
        onChange={(e)=>handleCheckBox(e)}/></td>
         <td >{rowValue.name}</td>
         <td >{rowValue.email}</td>
         <td >{rowValue.role}</td>       
         <td>
                <button onClick={()=>deleteRow(rowValue.id)}><FaRegTrashAlt  /></button> 
                <button onClick={(e)=>handleEditClick(e,rowValue)}><BiEdit /></button> 
        </td> 
        </>
  );
};

export default  ReadRow;