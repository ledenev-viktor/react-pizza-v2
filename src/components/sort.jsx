import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sort } from '../redux/slices/filterSlice';

export const sortPoints = {
  popular: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  price: {
    name: 'цене',
    sortProperty: 'price',
  },
  alfabet: {
    name: 'алфавиту',
    sortProperty: 'alfabetic',
  },
};
const Sort = () => {
  const [open, setOpen] = React.useState(false);
  // const [sortActive, setSortActive] = React.useState(0);

  const sortActive = useSelector(state => state.filter.sort);
  const dispatch = useDispatch();

  const sortRef = useRef(null);

  React.useEffect(()=> {
    const onClick = e => sortRef.current.contains(e.target) || setOpen(false);
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick); // при ретерне выполняется unmount
  }, [])

  
  const sortPointActive = sortActive.name;

  const handleSortActive = (index, key, value) => {
    dispatch(sort({
      name: value.name,
      sortProperty: value.sortProperty,
    }));

    setOpen(!open);
  };
  return (
    <div ref={sortRef}  className="sort">
      <div className="sort__label" onClick={() => setOpen(!open)}>
        <svg className={open ? "activeDown" : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{sortPointActive}</span>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {Object.entries(sortPoints)?.map(([key, value], index) => (
              <li
                key={index}
                onClick={() => handleSortActive(index, key, value)}
                className={value === index ? 'active' : ''}>
                {value.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Sort };
