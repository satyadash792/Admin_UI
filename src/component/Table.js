import React, { useState, useEffect } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import {  BiEdit  } from "react-icons/bi";
import { GrNext,GrPrevious } from "react-icons/gr";
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
    
    //Get Data By calling the api
    const getTableData=async()=>{
        const data=await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        setTableData(data.data)
        setFilterTableData(data.data)
    }
    //Delete Row value completely
    const deleteRowValue=(data)=>{
       let tableAfterDeletion=tableData.filter((row)=>{
        return row.id != data
       })
       setTableData(tableAfterDeletion)
       setFilterTableData(tableAfterDeletion)
    }

    //Arrange the each row data dynamically 
    const getRows=(rowData)=>(
    <>
        <td><input type="checkbox"/></td>
        <td>{rowData.name}</td>
        <td>{rowData.email}</td>
        <td>{rowData.role}</td>       
        <td>
                <button onClick={()=>deleteRowValue(rowData.id)}><FaRegTrashAlt  /></button> 
                <button><BiEdit /></button> 
        </td> 
    </>)
   
   //call useeffect at starting when dom loading happens
   useEffect(()=>{
     getTableData();
   },[])

   //filter the data when you started searching
   const filterBySearchData=(SearchData)=>{
    let res=tableData.filter((data)=>{
       if(data.name.includes(SearchData) || data.email.includes(SearchData) || data.role.includes(SearchData)){
        return data;
       }
    })
    setFilterTableData(res)
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
                    (                    
                     <tr key={data.id}>
                      {getRows(data)}
                     </tr>)
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