const url = `https://usermanagementcrud-al7wnwcf.b4a.run`

export async function getData({ term, page, limit }) {
    const response = await fetch(`${url}/search?term=${encodeURIComponent(term ?? "")}&page=${page - 1}&limit=${limit}`)
    const data = await response.json()

    if (Array.isArray(data)) {
        return data
    }

    return []
}

export async function createUser({ name, email, age, phone }) {
    try {
        if (name.trim() === '') {
            alert('Insira um nome!')
            return false
        }

        if (email.trim() === '') {
            alert('Insira um e-mail!')
            return false
        }

        const response = await fetch(`${url}/insert`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                age: age,
                phone: phone
            })
        })

        if (!response.ok) {
            const errorData = await response.text()
            throw new Error(errorData)
        }

        else {
            alert(await response.text())
            return true
        }
    } catch (error) {
        alert(`${error.message}`)
        return false
    }
}
export async function editUser({ id, name, email, age, phone }) {
    try {
        if (name.trim() === '') {
            alert('Insira um nome!')
            return false
        }

        if (email.trim() === '') {
            alert('Insira um e-mail!')
            return false
        }

        const response = await fetch(`${url}/update`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id,
                data: {
                    name: name,
                    email: email,
                    age: age,
                    phone: phone
                }
            })
        })

        if (!response.ok) {
            const errorData = await response.text()
            throw new Error(errorData)
        }

        alert(await response.text())
        return true
    } catch (error) {
        alert(`${error.message}`)
        return false
    }
}

export async function deleteUser({ id }) {
    try {
        const response = await fetch(`${url}/delete`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id
            })
        })

        if (!response.ok) {
            const errorData = await response.text()
            throw new Error(errorData)
        }

        alert(await response.text())
        return true
    } catch (error) {
        alert(`${error.message}`)
        return false
    }
}