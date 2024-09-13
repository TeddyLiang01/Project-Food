import { useState, useEffect } from "react";
import InventoryList from "./InventoryList";
import FoodItemForm from "./FoodItemForm";
import Button from "./Button";
import "./App.css";

function App() {
  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const responce = await fetch("http://127.0.0.1:5000/inventory");
    const data = await responce.json();
    setInventory(data.inventory);
    console.log(data.inventory);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    if (isModalOpen) return;
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchInventory();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <InventoryList
        inventory={inventory}
        updateItem={openEditModal}
        updateCallback={onUpdate}
        openCreateModal={openCreateModal}
      />
      {isModalOpen && (
        <FoodItemForm existingItem={currentItem} updateCallback={onUpdate} />
      )}
    </div>
  );
}

export default App;
