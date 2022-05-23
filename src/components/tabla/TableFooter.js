
import { useState } from "react";

export const TableFooter = ({ range, setPage, page, setRowsPerPage, rowsPerPage, slice, canNextPage, canPreviousPage }) => {

    const styleControlButton = "bg-[#254873] hover:bg-[#376CAD] text-white font-bold py-1 px-2 rounded mr-2 disabled:bg-[#7C7C7C]"

    const [inputValue, setInputValue] = useState('1')

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOnBlur = (e) => {
        let pageRequested = Math.ceil(Number(inputValue))
        if(pageRequested < 1) pageRequested = 1;
        if(pageRequested > range) pageRequested = range;
        setPage(pageRequested);
        setInputValue(pageRequested);
    }

    return (
      <div className="mb-3">
        <button onClick={() => setPage(1)} disabled={canPreviousPage} className={styleControlButton}>
          {'<<'}
        </button>
        <button onClick={() => setPage(page-1)} disabled={canPreviousPage} className={styleControlButton}>
          {'<'}
        </button>
        <button onClick={() => setPage(page+1)} disabled={canNextPage} className={styleControlButton}>
          {'>'}
        </button>
        <button onClick={() => setPage(range)} disabled={canNextPage} className={styleControlButton}>
          {'>>'}
        </button>
        <span className="mr-2">
          Página{' '}
          <strong>
            {page} de {range}
          </strong>{' '}
        </span>
        <span className="mr-2">
          Ir a la página:{' '}
          <input
            type="number"
            value={ inputValue }
            onChange= {handleInputChange}
            onBlur= {handleOnBlur}
            className="w-14 border rounded text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </span>
        <select
          value={rowsPerPage}
          onChange={e => {
            setRowsPerPage(Number(e.target.value))
          }}
          className= "border border-solid border-gray-200"
        >
          {[10, 50, 100, 200, 500].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    );
};
