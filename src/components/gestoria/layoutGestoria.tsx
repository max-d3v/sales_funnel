import { HeaderGestoria } from "./headerGestoria"
import { Outlet } from "react-router-dom"
import React from 'react';
import { useState } from "react";


interface headerContextData {
    searchValue: string;
    filters: any;
    gerenciados: any;
}

interface gerenciado {
    CodigoVendedor: string;
    VendedorExterno: string;
    Selecionado: boolean;
}

const SearchContextGestoria = React.createContext({} as headerContextData);

export default SearchContextGestoria;

export function LayoutGestoria() {
    const [search, setSearch] = useState<string>('');
    const [filters, setFilters] = useState({});
    const [gerenciados, setGerenciados] = useState<gerenciado[]>([]);
    return (
        <>
        <SearchContextGestoria.Provider value={{searchValue: search, filters: filters, gerenciados: gerenciados}}>
            <HeaderGestoria setSearch={setSearch} setFilters={setFilters} setGerenciadosContext={setGerenciados} />
            <Outlet/>
        </SearchContextGestoria.Provider>
        </>
    )
}