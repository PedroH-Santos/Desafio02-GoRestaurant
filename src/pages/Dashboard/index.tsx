import { useEffect, useState } from 'react';

import Header from '../../components/Header/index';
import api from '../../services/api';
import Food from '../../components/Food/index';
import ModalAddFood from '../../components/ModalAddFood/index';
import ModalEditFood from '../../components/ModalEditFood/index';
import { FoodsContainer } from './styles';


interface FoodsProps {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}
const Dashboard = (): JSX.Element => {
  const [foods, setFoods] = useState<FoodsProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodsProps>();

  useEffect(() => {
    async function componentDidMount() {
      const response = await api.get('/foods');
      setFoods(response.data);
    }
    componentDidMount();
  }, []); 


  async function handleAddFood(food: FoodsProps) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleUpdateFood(food: FoodsProps) {
    try {
      if (editingFood) {
        const foodUpdated = await api.put(
          `/foods/${editingFood.id}`,
          { ...editingFood, ...food },
        );
        const foodsUpdated = foods.map(f =>
          f.id !== foodUpdated.data.id ? f : foodUpdated.data,
        );

        setFoods(foodsUpdated);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDeleteFood(id: number) {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }
  function toggleModal() {
    setModalOpen(!modalOpen);
  }
  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }
  function handleEditFood(food: any) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header  openModal = {toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods && 
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};


export default Dashboard;
