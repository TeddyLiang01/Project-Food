import React from "react";
import Button from "./Button"

const InventoryList = ({ inventory, updateItem, updateCallback, openCreateModal }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_fooditem/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to Delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className=" self-center text-left px-6 py-3 text-gray-600 font-semibold text-2xl uppercase tracking-wider border-b">
          Inventory
        </h2>
        <Button onClick={openCreateModal}>New Food Item</Button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="text-left px-6 py-3 text-gray-600 font-semibold text-sm uppercase tracking-wider border-b">
              Name
            </th>
            <th className="text-left px-6 py-3 text-gray-600 font-semibold text-sm uppercase tracking-wider border-b">
              Quantity
            </th>
            <th className="text-left px-6 py-3 text-gray-600 font-semibold text-sm uppercase tracking-wider border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 text-gray-800">{item.name}</td>
              <td className="px-6 py-4 text-gray-800">{item.quantity}</td>
              <td className="px-6 py-4 text-gray-800">
                <div className="flex gap-2"><Button onClick={() => updateItem(item)}>Update</Button>
                <Button onClick={() => onDelete(item.id)}>Delete</Button></div>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
