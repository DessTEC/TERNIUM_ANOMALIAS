import { useState, useEffect } from "react";

export const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState();
  const [slice, setSlice] = useState([]);
  const [canNextPage, setCanNextPage] = useState();
  const [canPreviousPage, setCanPreviousPage] = useState();

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange(range);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);

    const evaluateCanPreviousPage = (page) => {
        if(page === 1) return true
        else return false
    }
    setCanPreviousPage(evaluateCanPreviousPage(page));
    
    const evaluateCanNextPage = (page, range) => {

        if(page === range){
            return true
        }
        else return false
    }
    setCanNextPage(evaluateCanNextPage(page,tableRange));

  }, [data, setTableRange, page, setSlice, rowsPerPage]);

  return { slice, range: tableRange, canPreviousPage, canNextPage };
};

const calculateRange = (data, rowsPerPage) => {
    const range = Math.ceil(data.length / rowsPerPage);
    return range;
};

const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};



