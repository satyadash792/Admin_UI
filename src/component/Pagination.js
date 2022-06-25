import React, { useEffect, useState } from "react";
import {  FaAngleDoubleLeft,FaAngleDoubleRight,FaAngleLeft,FaAngleRight} from "react-icons/fa";

const Pagination = ({tableData, filterTableData,handleDeleteMultiple, handlePagination}) => {
  const[currentPage,setCurrentPages]=useState(1)
  const[postPerPage, setPostPerPage]=useState(10)

  let pageNumber=[]
  for(let i=1;i<=Math.ceil(tableData.length/postPerPage);i++){
    pageNumber.push(i)
  }


  const pageDetails=(e)=>{
    console.log(e.target.innerText)
  }

  useEffect(()=>{
    handlePagination(currentPage,postPerPage,filterTableData)
  },[tableData,currentPage,postPerPage])
  return (  
        <> 
            <div id="main">
            <div id="delete-btn">
            <button className="delete-multiple" onClick={handleDeleteMultiple}>
                                       <span className='semi-circle'></span>
                                       <span className='rectangle'>Delete Selected</span>
                                       <span className='semi-circle'></span>
            </button>
            </div>
            <div id="Pagination-button">
            <button className="circle"><FaAngleDoubleLeft/></button>
            <button className="circle"><FaAngleLeft/></button>
            {
              pageNumber.map((page)=>
              (
              <button className="circle" onClick={(e)=>pageDetails(e)}>{page}</button>
              ))
            }
            <button className="circle"><FaAngleRight/></button>
            <button className="circle"><FaAngleDoubleRight/></button>
            </div>
            </div>
        </>
  );
};

export default  Pagination;