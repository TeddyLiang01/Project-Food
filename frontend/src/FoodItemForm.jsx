import { useState } from "react";
import Button from "./Button";

const FoodItemForm = ({ existingItem = {}, updateCallback }) => {
  const [name, setName] = useState(existingItem.name || "");
  const [quantity, setQuantity] = useState(existingItem.quantity || 0);

  const updating = Object.entries(existingItem).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      quantity,
    };
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_fooditem/${existingItem.id}` : "create_fooditem");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(data);
    const responce = await fetch(url, options);

    if (responce.status != 201 && responce.status != 200) {
      const message = await responce.json();
      console.log("alert");
      alert(message.message);
    } else {
      updateCallback();
    }
  };

  return (
    <div className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-800 bg-opacity-50">
      <form
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg"
        onSubmit={onSubmit}
      >
        <div className="flex gap-2">
          <label htmlFor="name">Name:</label>
          <input
            className="border border-gray-300 rounded pl-2 w-full"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <label htmlFor="quantity">Quantity:</label>
          <input
            className="border border-gray-300 rounded pl-2 w-full"
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
          />
        </div>

        <div className="flex justify-around ">
          <Button
            onClick={() => {
              updateCallback();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">{updating ? "Update" : "Add Food Item"}</Button>
        </div>
      </form>
    </div>
  );
};

export default FoodItemForm;
