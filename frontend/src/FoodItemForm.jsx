import { useState } from "react";

const FoodItemForm = ({existingItem = {}, updateCallback}) => {
    const [name, setName] = useState(existingItem.name || "")
    const [quantity, setQuantity] = useState(existingItem.quantity || 0)

    const updating = Object.entries(existingItem).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name,
            quantity
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_fooditem/${existingItem.id}` : "create_fooditem")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        console.log(data)
        const responce = await fetch(url, options)

        if (responce.status != 201 && responce.status != 200) {
            const message = await responce.json()
            console.log("alert")
            alert(message.message)
        } else {
            updateCallback()
        }
    }

    return <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>

        <div>
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}/>
        </div>

        <button type="submit">{updating ? "Update" : "Add Food Item"}</button>
    </form>
}

export default FoodItemForm