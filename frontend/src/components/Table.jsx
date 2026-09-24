import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { TableRow } from './TableRow';

export const Table = ({ data = [], selectedId, setSelectedId, switchDelete, switchEdit }) => {

    const hasData = Array.isArray(data) && data.length > 0

    return (
        <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
                <div className="overflow-y-auto max-h-[50vh]">
                    <table className="w-full text-left text-sm text-gray-500 border-collapse">
                        <thead className="sticky top-0 z-10 bg-[#1d7b4b] text-xs text-white font-semibold">
                            <tr>
                                <th className="px-6 py-3 font-sans font-semibold text-white text-lg">Id</th>
                                <th className="px-6 py-3 font-sans font-semibold text-white text-lg">Nome</th>
                                <th className="px-6 py-3 font-sans font-semibold text-white text-lg">E-mail</th>
                                <th className="px-6 py-3 font-sans font-semibold text-white text-lg">Idade</th>
                                <th className="px-6 py-3 font-sans font-semibold text-white text-lg">N° de Telefone</th>
                                <th className="px-6 py-3 font-sans font-semibold text-white"></th>
                                <th className="px-6 py-3 font-sans font-semibold text-white"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {!hasData ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-base text-center">
                                        Sem dados
                                    </td>
                                </tr>
                            ) : (
                                data.map((userData) => (
                                    <TableRow usuario={userData} key={userData._id}
                                        handleEdit={() => {
                                            setSelectedId(userData._id)
                                            switchEdit()
                                        }} selectedId={selectedId}
                                        handleDelete={() => {
                                            setSelectedId(userData._id)
                                            switchDelete()
                                        }} selectedId={selectedId} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
