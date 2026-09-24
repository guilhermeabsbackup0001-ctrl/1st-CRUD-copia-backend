import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const TableRow = ({ usuario, handleEdit, handleDelete, selectedId }) => {

    return (
        <tr className={selectedId === usuario._id ? "bg-[#17b14f] text-[#ffffff]" : "bg-gray-50 text-[#000000]"}>
            <td className="px-6 py-4 text-sm">{usuario._id}</td>
            <td className="px-6 py-4 text-sm">{usuario.name}</td>
            <td className="px-6 py-4 text-sm">{usuario.email}</td>
            <td className="px-6 py-4 text-sm">{usuario.age}</td>
            <td className="px-6 py-4 text-sm">{usuario.phone}</td>
            <td className="px-6 py-4 text-sm cursor-pointer"
                onClick={handleEdit}>
                <SquarePen />
            </td>
            <td className="px-6 py-4 text-sm cursor-pointer"
                onClick={handleDelete}>
                <Trash2 color="#f24a4a" />
            </td>
        </tr>
    )
}