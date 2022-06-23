import React, { useState, useEffect } from 'react';
// import { FaRegTrashAlt } from "react-icons/fa";
// import {  BiEdit  } from "react-icons/bi";
import { GrNext,GrPrevious } from "react-icons/gr";
import EditableRow from './EditableRow';
import ReadRow from './ReadRow';
import './Table.css';
import axios from 'axios';

const Table=()=>{
    const mystyle = {  
        height: "20px",
        width: "90%",
        margin:"1% 5% 0% 5%",
        };

    const [tableData, setTableData]=useState([]);
    const [filterTableData, setFilterTableData]=useState([]);
    const [editRowId, setEditRowId]=useState(null);
    const [editFormData, setEditFormData] = useState({
      id:"",
      fullName: "",
      email: "",
      role:""
    });

    //Get Data By calling the api
    const getTableData=async()=>{
        const data=await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        setTableData(data.data)
        setFilterTableData(data.data)
    }
 
    //Delete Row value completely
    const deleteRowValue=(data)=>{
      //  let tableAfterDeletion=tableData.filter((row)=>{
      //   return row.id != data
      //  })
       const tableAfterDeletion = [...tableData];
       const index = tableAfterDeletion.findIndex((row) => row.id === data);
       tableAfterDeletion.splice(index, 1);
       setTableData(tableAfterDeletion)
       setFilterTableData(tableAfterDeletion)
    }

   
   //call useeffect at starting when dom loading happens
   useEffect(()=>{
     getTableData();
   },[])

   //filter the data when you started searching
   const filterBySearchData=(SearchData)=>{
    let res=tableData.filter((data)=>{
       if(data.name.includes(SearchData) || data.email.includes(SearchData) || data.role.includes(SearchData))
        return data;  
    })
    setFilterTableData(res)
    return;
   }

   //handle the table data when youy click omn edit button
   const handleEditClick = (e, rowValue) => {
    setEditRowId(rowValue.id)

    const formValues = {
      id:rowValue.id,
      fullName: rowValue.name,
      email: rowValue.email,
      role: rowValue.role
    };
    setEditFormData(formValues);
  };

   const handleEditRowValue = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };


  const handleSaveLink= (e)=>{
     e.preventDefault()
     const value={
      id:editFormData.id,
      name:editFormData.fullName,
      email:editFormData.email,
      role:editFormData.role
     }
     const newTableData = [...tableData];
     const index = newTableData.findIndex((row) => row.id === editRowId);
     newTableData[index] = value;
     setTableData(newTableData)
     setFilterTableData(newTableData)
     setEditRowId(null)
  }
  const handleCancelClick=()=>{
    setEditRowId(null);
  }

    return (
        <>
        
        <div >
            <input style={mystyle} onChange={(e)=>filterBySearchData(e.target.value)} type="text" placeholder="Search by name,email or role.."/>
        </div>

         <table>
          <thead>
            <tr>
               <th> <input type="checkbox"  /></th>
               <th>Name</th>
               <th>Email</th>
               <th>Role</th>               
               <th>Actions</th>
            </tr>  
           </thead>
            <tbody>            
              {
                filterTableData.map((data)=>
                  <tr key={data.id}>
                  {editRowId === data.id ?
                      <EditableRow editFormData={editFormData} handleEditRowValue={handleEditRowValue } 
                      handleCancelClick={handleCancelClick} handleSaveLink={handleSaveLink}/> :
                      <ReadRow rowValue={data} deleteRow={deleteRowValue} handleEditClick={handleEditClick}/>                    
                  }
                  </tr>
                )  
              }
            </tbody> 
         </table>

         
         <div style={mystyle} >
            <button className="delete-multiple">
                                       <span className='semi-circle'></span>
                                       <span className='rectangle'>Delete Selected</span>
                                       <span className='semi-circle'></span>
            </button>
            <button className="circle">1</button>
            <button className="circle">2</button>
            <button className="circle">3</button>
            <button className="circle">4</button>
            <button className="circle"><GrNext/></button>
            <button className="circle"><GrPrevious/></button>
         </div>
        </>
      );

}
export default Table;