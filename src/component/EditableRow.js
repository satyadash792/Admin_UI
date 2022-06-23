import React from "react";

const EditableRow = ({editFormData,handleEditRowValue,handleCancelClick,handleSaveLink}) => {
  return (
    <>
    <td><input type="checkbox"/></td>
     <td>     
         <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="fullName"
          onChange={handleEditRowValue }
          value={editFormData.fullName}
        ></input>
     </td>
     <td>     
         <input
          type="email"
          required="required"
          placeholder="Enter a email..."
          name="email"
          onChange={handleEditRowValue }
          value={editFormData.email}
        ></input>
     </td>
     <td>     
         <input
          type="text"
          required="required"
          placeholder="Enter a role..."
          name="role"
          onChange={handleEditRowValue }
          value={editFormData.role}
        ></input>
     </td>  
     <td>
            <button onClick={handleCancelClick}>Cancel</button> 
            <button onClick={(e)=>handleSaveLink(e)} >Save</button> 
    </td> 
    </>
  );
};

export default EditableRow;