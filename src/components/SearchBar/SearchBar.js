export const SearchBar = () => (
    <form action="/" method="get" className='text-center'>
        <input
            type="text"
            id="header-search"
            placeholder="Buscar por nombre"
            name="s" 
            className='bg-[#F2F2F2] rounded-xl pt-2 pb-2 pl-3 w-1/3'
        />
        {/* <button type="submit">Search</button> */}
    </form>
);

// export default SearchBar;