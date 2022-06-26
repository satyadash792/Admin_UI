import React from "react";

const EditableRow = ({inputBoxTest,editFormData,handleEditRowValue,handleCancelClick,handleSaveClick,handleCheckBox}) => {
  return (
    <>
    <td><input type="checkbox" checked={inputBoxTest} name={editFormData.id}  className="checkbox" onChange={(e)=>handleCheckBox(e)}/></td>
     <td>     
         <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="name"
          className='name'
          onChange={handleEditRowValue }
          value={editFormData.name}
        ></input>
     </td>
     <td>     
         <input
          type="email"
          required="required"
          placeholder="Enter a email..."
          name="email"
          className='email'
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
          className='role'
          onChange={handleEditRowValue }
          value={editFormData.role}
        ></input>
     </td>  
     <td>
            <button onClick={handleCancelClick}>Cancel</button> 
            <button onClick={(e)=>handleSaveClick(e)} >Save</button> 
    </td> 
    </>
  );
};

export default EditableRow;