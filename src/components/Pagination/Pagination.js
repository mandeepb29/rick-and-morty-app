import React, { useState, useEffect } from 'react';
import styles from "./Pagination.module.scss";
import PropTypes from 'prop-types';

const Pagination = props => {

    Pagination.propTypes = {
        totalPages: PropTypes.number,
        activePageNumber: PropTypes.number,
        handlePageSelect:PropTypes.func
    };

    const [pageList, setPageList] = useState([]); //array of page numbers 
    useEffect(() => {
        //create list of page numbers from 0 to last page number - 1
       if(props.totalPages){
           setPageList(Array.from({length: props.totalPages}, (_, i) => i))
       }
    }, [props.totalPages])

    return (
        <div className={styles.container}>
            {/* Pagination Header */}
            <div className={styles.containerHeader}>
            <h4 className='mb-0 text-secondary'>
               {props.totalPages}
           </h4>
           <small className='font-weight-bold'>
               pages
           </small>
            </div>
            {/* Pagination Page List */}
            <div className={`${styles.containerBody} scrollbarContainer`}>
                {pageList.map(pageNumber => 
                      <button key={`pagination-btn-${pageNumber}`} className={`${props.activePageNumber == pageNumber ? "bg-primary text-dark":""} ${styles.containerItem}`} onClick={() => props.handlePageSelect(pageNumber+1)}>
                      {pageNumber+1}
                  </button>
            )}
            </div>
          
        </div>
    );
};


export default Pagination;