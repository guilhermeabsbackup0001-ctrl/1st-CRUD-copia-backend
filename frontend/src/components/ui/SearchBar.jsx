import { Search } from 'lucide-react'
import { Button } from './Button'

export const SearchBar = ({ searchTerm, inputChange, inputDisabled }) => {

    return (
        <div className="flex justify-center items-center gap-4 mb-6 w-full p-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <Search color="#000000" />
            <input className="bg-gray-200 rounded-lg w-full p-2"
                name="search"
                placeholder="Pesquise a informação de um usuário"
                type="text"
                value={searchTerm}
                onChange={inputChange}
                disabled={inputDisabled}
            />
        </div>
    )
}