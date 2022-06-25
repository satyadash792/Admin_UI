import React, { useEffect, useState } from "react";
import {  FaAngleDoubleLeft,FaAngleDoubleRight,FaAngleLeft,FaAngleRight} from "react-icons/fa";

const Pagination = ({tableData,searchTableData, filterTableData,handleDeleteMultiple, handlePagination}) => {
  const[currentPage,setCurrentPages]=useState(1)
  const postPerPage=10
  let totalPages=Math.ceil(searchTableData.length/postPerPage)

  let pageNumber=[]
  for(let i=1;i<=totalPages;i++){
    pageNumber.push(i)
  }


  const pageDetails=(e)=>{
    setCurrentPages(e.target.innerText)
    handlePagination(e.target.innerText,postPerPage,searchTableData)
  }

  //previous page
  const getFirstPageData=(e)=>{
    setCurrentPages(1)
    handlePagination(1,postPerPage,searchTableData)
  }

  const getPreviousPageData=(e)=>{
    if(currentPage===1){
      alert("You are in FirstPage")
      return
    }
    setCurrentPages(currentPage-1)
    handlePagination(currentPage-1,postPerPage,searchTableData)
  }

  const getNextPageData=(e)=>{
    if(currentPage===totalPages){
      alert("You are in LastPage")
      return
    }
    setCurrentPages(currentPage+1)
    handlePagination(currentPage+1,postPerPage,searchTableData)
  }

  const getLastPageData=(e)=>{
    setCurrentPages(totalPages)
    handlePagination(totalPages,postPerPage,searchTableData)
  }

  useEffect(()=>{
    handlePagination(currentPage,postPerPage,searchTableData)
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
            {/* <div id="Pagination-button"> */}
            <button className={currentPage === 1 ? "disabled circle" :  "passive circle"}  disabled={currentPage === 1 ? true : false} onClick={(e)=>getFirstPageData(e)}><FaAngleDoubleLeft/></button>
            <button className={currentPage === 1 ? "disabled circle" :  "passive circle"}  disabled={currentPage === 1 ? true : false} onClick={(e)=>getPreviousPageData(e)}><FaAngleLeft/></button>
            {
              pageNumber.map((page)=>
              (
              <button  className={currentPage === page ? "active circle" : "passive circle"} onClick={(e)=>pageDetails(e)}>{page}</button>
              ))
            }
            <button className={currentPage === totalPages ? "disabled circle" :  "passive circle"}  disabled={currentPage === totalPages ? true : false} onClick={(e)=>getNextPageData(e)}><FaAngleRight/></button>
            <button className={currentPage === totalPages ? "disabled circle" :  "passive circle"}  disabled={currentPage === totalPages ? true : false} onClick={(e)=>getLastPageData(e)}><FaAngleDoubleRight/></button>
            {/* </div> */}
            </div>
        </>
  );
};

export default  Pagination;