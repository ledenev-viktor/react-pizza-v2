import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Categories } from '../components/categories';
import { Sort } from '../components/sort';
import { Skeleton } from '../components/pizzablock/skeleton';
import { PizzaBlock } from '../components/pizzablock/pizzablock';
import { Pagination } from '../components/pagination';
import { setPageCount } from '../redux/slices/filterSlice';


export const Home = () => {
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortActive = useSelector((state) => state.filter.sort);
  const searchPizzaValue = useSelector((state) => state.searchPizza.searchValue);
  const currentPage = useSelector((state) => state.filter.pageCount);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const search = searchPizzaValue ? `&search=${searchPizzaValue}` : '';
  const category = categoryId !== 0 ? `&category=${categoryId}` : '';
  const sort = `&sortBy=${sortActive.sortProperty}`;
  const order = `&order=${sortActive.sortProperty === 'price' ? 'asc' : 'desc'}`;
  const addressApi = `https://62eac342ad2954632593de7c.mockapi.io/items?&page=${currentPage}&limit=4${search}${category}${sort}${order}`;

  console.log('addressApi', addressApi);

  const onChangePage = (number) => dispatch(setPageCount(number));

  React.useEffect(() => {
    axios.get(addressApi).then(({ data }) => {
      setPizzas(data);
      setIsLoading(false);
    });
  }, [searchPizzaValue, currentPage, categoryId, sortActive]);

  const pizzasArray = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = new Array(6).fill(null).map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzasArray}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};
