import React from "react"

const InventoryList = ({inventory, updateItem, updateCallback}) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_fooditem/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to Delete")
            }
        } catch (error) {
            alert(error)
        }
    } 

    return <div>
        <h2>Inventory</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>
                            <button onClick={() => updateItem(item)}>Update</button>
                            <button onClick={() => onDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default InventoryList