import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { CircleX } from 'lucide-react';
import { createUser, editUser } from "../services/userService"
import { useEffect, useState } from "react"

export const Form = ({ updateValueFunction, isEditing, setIsEditing, selectedUser, setDisabled, setSelectedId }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [phone, setPhone] = useState('')
    const [emailRequired, setEmailRequired] = useState(false)
    const [nameRequired, setNameRequired] = useState(false)

    useEffect(() => {
        if (isEditing && selectedUser) {
            setName(selectedUser.name || '')
            setEmail(selectedUser.email || '')
            setAge(selectedUser.age || '')
            setPhone(selectedUser.phone || '')
        } else {
            setName('')
            setEmail('')
            setAge('')
            setPhone('')
        }
    }, [isEditing, selectedUser])

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 11)

        if (digits.length <= 2) return digits
        if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
        if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
    }
    
    const handlePhoneChange = (e) => {
        setPhone(formatPhone(e.target.value))
    }

    const formatAge = (value) => {
        if (value.length > 2) {
            value = value.slice(0, 2);
        }
        return value;
    }
    const handleAgeChange = (e) => {
        setAge(formatAge(e.target.value))
    }

    const saveUser = async () => {
        const created = await createUser({
            name,
            email,
            age,
            phone
        })

        if (!created) return

        setName('')
        setEmail('')
        setAge('')
        setPhone('')

        if (updateValueFunction) {
            await updateValueFunction()
        }
    }

    const updateUser = async () => {
        if (!selectedUser?._id) return

        const edited = await editUser({
            id: selectedUser._id,
            name,
            email,
            age,
            phone
        })

        if (!edited) return

        setName('')
        setEmail('')
        setAge('')
        setPhone('')
        setIsEditing(false)
        setDisabled(false)
        setSelectedId(null)

        if (updateValueFunction) {
            await updateValueFunction()
        }
    }

    return (
        <div className="flex flex-col items-center p-4 max-[700px]:m-5 min-[700px]:flex-row min-[700px]:items-start mb-10 mt-10 mr-0 ml-0 gap-1 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <Input inputName="Nome" inputType="text" inputValue={name} inputClick={() => setNameRequired(true)} inputChange={(e) => setName(e.target.value)} required={nameRequired} />
            <Input inputName="E-mail" inputType="text" inputValue={email} inputClick={() => setEmailRequired(true)} inputChange={(e) => setEmail(e.target.value)}  required={emailRequired}/>
            <Input inputName="Idade" inputType="number" inputValue={age} inputChange={handleAgeChange} required={false} />
            <Input inputName="N° de telefone" inputType="tel" inputValue={phone} inputChange={handlePhoneChange} required={false} />
            {isEditing ? (
                <div className="flex flex-row items-center">
                    <Button variant="primary" buttonClick={updateUser}>Atualizar</Button>
                    <Button variant="secondary"
                        buttonClick={() => {
                            setIsEditing(false)
                            setDisabled(false)
                            setSelectedId(null)
                        }}>
                        <CircleX />
                    </Button>
                </div>
            ) : (
                <div className="flex flex-row justify-center w-48">
                    <Button variant="primary" buttonClick={saveUser}>Criar</Button>
                </div>
            )}
        </div>
    )
}