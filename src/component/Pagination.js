import React from "react";
import {  FaAngleDoubleLeft,FaAngleDoubleRight,FaAngleLeft,FaAngleRight} from "react-icons/fa";

const Pagination = ({handleDeleteMultiple}) => {
  return (
        <>
            <button className="delete-multiple" onClick={handleDeleteMultiple}>
                                       <span className='semi-circle'></span>
                                       <span className='rectangle'>Delete Selected</span>
                                       <span className='semi-circle'></span>
            </button>
            <button className="circle"><FaAngleLeft/></button>
            <button className="circle"><FaAngleDoubleLeft/></button>
            <button className="circle">1</button>
            <button className="circle">2</button>
            <button className="circle">3</button>
            <button className="circle">4</button>
            <button className="circle">5</button>
            <button className="circle"><FaAngleRight/></button>
            <button className="circle"><FaAngleDoubleRight/></button>
        </>
  );
};

export default  Pagination;