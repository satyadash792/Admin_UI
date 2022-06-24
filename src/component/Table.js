import React, { useState, useEffect } from 'react';
import EditableRow from './EditableRow';
import ReadRow from './ReadRow';
import Pagination from './Pagination';
import './style.css';
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
      name: "",
      email: "",
      role:""
    });
    const [user, setUser]=useState([])

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
      name: rowValue.name,
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
      name:editFormData.name,
      email:editFormData.email,
      role:editFormData.role
     }
     const newTableData = [...filterTableData];
     const index = newTableData.findIndex((row) => row.id === editRowId);
     newTableData[index] = editFormData;
    //  setTableData(newTableData)
     setFilterTableData(newTableData)
     setEditRowId(null)
  }
  const handleCancelClick=()=>{
    setEditRowId(null);
  }

  const handleDeleteMultiple=(e)=>{

    const filterId=[]
    const res=document.querySelectorAll(".checkbox")
     Array.from(res).forEach((input)=>{
       if(input.checked){
          filterId.push(input.name)
         }

        const res=filterTableData.filter((rowData)=>{
           return !filterId.includes(rowData.id)
        })
        // setTableData(res)
        setFilterTableData(res)
    })
    debugger
  }

  const handleCheckBox=(e)=>{
    const {name,checked}=e.target
    let checkedBox=tableData.map( user => user.id==name ? {...user , isChecked: checked}: user )
    setUser(checkedBox)
    console.log(checked)
    console.log(e.target.checked)
    debugger;
  }
    return (
        <>
        {/* SearchBar */}
        <div >
            <input style={mystyle} onChange={(e)=>filterBySearchData(e.target.value)} type="text" placeholder="Search by name,email or role.."/>
        </div>

        {/* Table Section */}
         <table>
          <thead>
            <tr>
               <th> <input type="checkbox" name="allChecked"
                // checked={}
                onChange={(e)=>handleCheckBox(e)}/></th>
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
                      handleCancelClick={handleCancelClick} handleSaveLink={handleSaveLink}
                      handleCheckBox={handleCheckBox}
                      // checked={user?.isChecked || false}
                      /> :
                      <ReadRow rowValue={data} deleteRow={deleteRowValue} 
                      handleEditClick={handleEditClick}
                      handleCheckBox={handleCheckBox}
                      // checked={user?.isChecked || false}
                      />                    
                  }
                  </tr>
                )  
              }
            </tbody> 
         </table>

         {/* Pagination */}
         <div style={mystyle} >
            <Pagination handleDeleteMultiple={handleDeleteMultiple}/>
         </div>
        </>
      );

}
export default Table;