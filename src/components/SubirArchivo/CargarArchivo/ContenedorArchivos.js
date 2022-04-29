import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faFileCsv, faFile } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react';

const ContenedorArchivos = ({file, setFile}) =>{

    const wrapperRef = useRef(null);
    const iconRef = useRef(null);

    const onDragEnter = () => {
        wrapperRef.current.classList.add('containerDrag');
        iconRef.current.classList.add('iconoSubidaActive');
    }

    const onDragLeave = () => {
        wrapperRef.current.classList.remove('containerDrag');
        iconRef.current.classList.remove('iconoSubidaActive');
    }

    const onDrop = () => {
        wrapperRef.current.classList.remove('containerDrag');
        iconRef.current.classList.remove('iconoSubidaActive');
    }

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            setFile(newFile);
        }
    }

    const fileRemove = () => {
        setFile();
    }

    return(
        <div 
            className="containerArchivos"  
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            {
                file === undefined ? 
                <>
                    <div id="containerIcono">
                        <div ref={iconRef}>
                            <FontAwesomeIcon icon={faUpload} className="iconoSubida"/>
                        </div>
                    </div>
                    <h5 className="text" id="texto-archivo">Arrastra los archivos aquí</h5>

                    <input type="file" accept=".csv" onChange={onFileDrop} className="inputFile"/>
                </>
                : 
                <div className='h-full flex flex-col center justify-between'>
                    {
                        file.type.includes("csv") ? 
                        <>
                            <FontAwesomeIcon icon={faFileCsv} className="text-[#006C3B] w-full h-1/3 mb-3 mt-4"/>
                            <p className='text-center'>{file.name}</p>
                            <p className='text-center'>{file.size} B</p>
                        </>
                        :
                        <>
                            <FontAwesomeIcon icon={faFile} className="text-[#CCCCCC] w-full h-1/3 mb-3 mt-4"/>
                            <p className='text-center'>{file.name}</p>
                            <p className='text-center'>{file.size} B</p>
                            <p className='text-center text-sm'>Sólo se permiten archivos con extensión csv</p>
                        </>
                    }
                    
                    <button 
                        className="text-slate-50 font-medium rounded-3xl text-lg text-center hover:text-slate-50 bg-[#FF3502] border-none hover:bg-[#c62901] py-1.5 mb-4"
                        onClick={fileRemove}
                    >Cancelar</button>
                </div>
            }
            
        </div>
    )
}

export default ContenedorArchivos
