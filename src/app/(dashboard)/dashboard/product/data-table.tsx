import { Fragment } from 'react';
import { Product } from './columns';
// Asegúrate de importar el tipo Product adecuadamente

interface CardListProps {
  data: Product[];
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  return (
    <div>
      <CardList data={data}/>
    </div>
  );
};

export default CardList;
