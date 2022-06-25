import React, { useEffect, useState } from "react";
import {  FaAngleDoubleLeft,FaAngleDoubleRight,FaAngleLeft,FaAngleRight} from "react-icons/fa";

const Pagination = ({tableData, filterTableData,handleDeleteMultiple, handlePagination}) => {
  const[currentPage,setCurrentPages]=useState(1)
  const[postPerPage, setPostPerPage]=useState(5)

  const pageCount=Math.ceil(filterTableData.length/postPerPage)

  useEffect(()=>{
    handlePagination(currentPage,postPerPage)
    debugger
  },[tableData])
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
            <button className="circle"><FaAngleLeft/></button>
            <button className="circle"><FaAngleDoubleLeft/></button>
            <button className="circle">1</button>
            <button className="circle">2</button>
            <button className="circle">3</button>
            <button className="circle">4</button>
            <button className="circle">5</button>
            <button className="circle"><FaAngleRight/></button>
            <button className="circle"><FaAngleDoubleRight/></button>
            </div>
            </div>
        </>
  );
};

export default  Pagination;