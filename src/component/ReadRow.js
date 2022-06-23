import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import {  BiEdit  } from "react-icons/bi";

const ReadRow = ({rowValue,deleteRow,handleEditClick}) => {
  return (
        <>
        <td><input type="checkbox"/></td>
         <td>{rowValue.name}</td>
         <td>{rowValue.email}</td>
         <td>{rowValue.role}</td>       
         <td>
                <button onClick={()=>deleteRow(rowValue.id)}><FaRegTrashAlt  /></button> 
                <button onClick={(e)=>handleEditClick(e,rowValue)}><BiEdit /></button> 
        </td> 
        </>
  );
};

export default  ReadRow;