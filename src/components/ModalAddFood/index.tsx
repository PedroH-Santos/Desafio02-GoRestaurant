import { Component, createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal/index';
import Input from '../Input/index';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: FoodsProps) => void;
}
interface FoodsProps {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

const ModalAddFood = (props : ModalAddFoodProps): JSX.Element => {

    let formRef = createRef();
  
    async function handleSubmit(data: FoodsProps) {
      props.handleAddFood(data);
      props.setIsOpen();
    
    }

    return (
      <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <Form  onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui"   />

          <Input name="name" placeholder="Ex: Moda Italiana"  />
          <Input name="price" placeholder="Ex: 19.90"  />

          <Input name="description" placeholder="Descrição"  />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  
};

export default ModalAddFood;
