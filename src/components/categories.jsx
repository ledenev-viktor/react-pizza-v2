import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';


const Categories = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];


  return (
    <div className="categories">
      <ul>
        {categories.map((categ, index) => (
          <li
            onClick={() => dispatch(setCategoryId(index))}
            key={index}
            className={categoryId === index ? 'active' : ''}>
            {categ}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Categories };
