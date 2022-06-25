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
    const [searchTableData, setSearchTableData]=useState([]);
    const [filterTableData, setFilterTableData]=useState([]);
    const [editRowId, setEditRowId]=useState(null);
    const [editFormData, setEditFormData] = useState({
      id:"",
      name: "",
      email: "",
      role:""
    });
    const [user, setUser]=useState([])
    const [paginationDetails, setPaginationDetails]=useState({
      page:1,
      rowPerPage:5
    })

    //Get Data By calling the api
    const getTableData=async()=>{
        const data=await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        setTableData(data.data)
        setSearchTableData(data.data)
        setFilterTableData(data.data)
    }
 
    //Delete Row value completely
    const deleteRowValue=(data)=>{
       const tableAfterDeletion = [...tableData];
       const index = tableAfterDeletion.findIndex((row) => row.id == data);
       tableAfterDeletion.splice(index, 1);
       setTableData(tableAfterDeletion)
       
       const tableAfterDeletionFilter = [...searchTableData];
       const index2 = tableAfterDeletionFilter.findIndex((row) => row.id == data);
       tableAfterDeletionFilter.splice(index2, 1);
       setFilterTableData(tableAfterDeletionFilter)
       setSearchTableData(tableAfterDeletionFilter)
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
    setSearchTableData(res)
    handlePagination(paginationDetails.page,paginationDetails.rowPerPage,res)
    return;
   }

   // on click edit button store that data and enable the editing id
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

  //handle editing of column
   const handleEditRowValue = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };


  //handle saving of editing values
  const handleSaveLink= (e)=>{
    debugger;
     e.preventDefault()
     const newTableData = [...filterTableData];
     const index = newTableData.findIndex((row) => row.id === editRowId);
     newTableData[index] = editFormData;
     setFilterTableData(newTableData)

     const newTableData2 = [...tableData];
     const index2 = newTableData2.findIndex((row) => row.id === editRowId);
     newTableData2[index2] = editFormData;
     setTableData(newTableData2)
     setEditRowId(null)
  }

  //cancel the edited rowdata
  const handleCancelClick=()=>{
    setEditRowId(null);
  }


  //handle multiple deletion of table row
  const handleDeleteMultiple=(e)=>{
    const filterId=[]
    const res=document.querySelectorAll(".checkbox")
     Array.from(res).forEach((input)=>{
       if(input.checked){
          filterId.push(input.name)
         }
       const filtertable=searchTableData.filter((rowData)=>{
          return !filterId.includes(rowData.id)
       })
       setFilterTableData(filtertable)
       setSearchTableData(filtertable)

        const table=tableData.filter((rowData)=>{
           return !filterId.includes(rowData.id)
        })
        setTableData(table)      
    })
  }

  //handle checkbox
  const handleCheckBox=(e)=>{
    const {name,checked}=e.target
    if(name==="allChecked"){
      debugger;
      let checkedBox=filterTableData.map( user => {return {...user,isChecked: checked}} ) 
      setFilterTableData(checkedBox)
    }
    else{
    console.log(user.id===name)
    let checkedBox=filterTableData.map( user => user.id == name ? {...user , isChecked: checked}: user )
    setFilterTableData(checkedBox)
    debugger;
    }
  }


  //handle pagination
  const handlePagination=(currentPage,postPerPage,data)=>{
    setPaginationDetails({ page:currentPage,  rowPerPage:postPerPage})
    const startIndex=(currentPage-1)*postPerPage;
    const lastIndex=currentPage*postPerPage;
    console.log("start "+startIndex +"  last "+lastIndex)
    const displayRow=data.slice(startIndex,lastIndex)
    setFilterTableData(displayRow)
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
               <th> <input type="checkbox" name="allChecked" className='checkbox'
               checked={filterTableData.filter((user)=>user?.isChecked !==true).length===0}
                onChange={(e)=>handleCheckBox(e)}/></th>
               <th className='name'>Name</th>
               <th className='email'>Email</th>
               <th className='role'>Role</th>               
               <th className='action'>Actions</th>
            </tr>  
           </thead>
            <tbody>            
              {
                filterTableData.map((data)=>
                  <tr key={data.id}>
                  {editRowId === data.id ?
                      <EditableRow editFormData={editFormData} handleEditRowValue={handleEditRowValue } 
                      handleCancelClick={handleCancelClick} handleSaveLink={handleSaveLink}
                      inputBoxTest={data?.isChecked || false}
                      handleCheckBox={handleCheckBox}
                      /> :
                      <ReadRow rowValue={data} deleteRow={deleteRowValue} 
                      handleEditClick={handleEditClick}
                      inputBoxTest={data?.isChecked || false}
                      handleCheckBox={handleCheckBox}
                      />                    
                  }
                  </tr>
                )  
              }
            </tbody> 
         </table>

         {/* Pagination */}
         <div style={mystyle} >
           {tableData.length ?
            <Pagination 
            tableData={tableData}
            searchTableData={searchTableData}
            filterTableData={filterTableData}
            handleDeleteMultiple={handleDeleteMultiple} 
            handlePagination={handlePagination}/> : null}
 
         </div>
        </>
      );

}
export default Table;