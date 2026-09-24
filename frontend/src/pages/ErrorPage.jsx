import { TriangleAlert } from 'lucide-react'

export const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md mx-auto px-4">
                <div className="bg-white-800 border border-blue-200 rounded-3xl shadow-2xl p-8 text-center">
                    <div className="text-5xl mb-3 flex justify-center"><TriangleAlert size={60} /></div>
                    <h2 className="m-0 mb-2.5 text-red-600 text-2xl font-bold">Servidor indisponível</h2>
                    <p className="m-0 mb-5 text-slate-500 leading-relaxed">
                        O servidor se encontra indisponível neste momento devido a uma instabilidade no serviço de hospedagem
                    </p>
                </div>
            </div>
        </div>
    )
}