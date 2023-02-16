import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../components/categories";
import { Sort } from "../components/sort";
import { Skeleton } from "../components/pizzablock/skeleton";
import { PizzaBlock } from "../components/pizzablock/pizzablock";
import { Pagination } from "../components/pagination";
import {
  setPageCount,
  setFilters,
  categoryIdSelector,
  pageCountSelector,
  sortSelector,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { useNavigate, userNavigate } from "react-router-dom";
import { sortPoints } from "../components/sort";
import { fetchPizzas, pizzaDataSelector } from "../redux/slices/pizzaSlice";
import { searchPizzaValueSelector } from "../redux/slices/searchSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const categoryId = useSelector(categoryIdSelector);
  const searchPizzaValue = useSelector(searchPizzaValueSelector);
  const currentPage = useSelector(pageCountSelector);
  const sortActive = useSelector(sortSelector);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const { items, status } = useSelector(pizzaDataSelector);

  // const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = Object.values(sortPoints).find(
        ({ name, sortProperty }) => sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  const getPizzas = async () => {
    const search = searchPizzaValue ? `&search=${searchPizzaValue}` : "";
    const category = categoryId !== 0 ? `&category=${categoryId}` : "";
    const sort = `&sortBy=${sortActive.sortProperty}`;
    const order = `&order=${
      sortActive.sortProperty === "price" ? "asc" : "desc"
    }`;
    // const addressApi = `https://62eac342ad2954632593de7c.mockapi.io/items?&page=${currentPage}&limit=4${search}${category}${sort}${order}`;

    dispatch(
      fetchPizzas({
        currentPage,
        search,
        category,
        sort,
        order,
      })
    );
  };

  const onChangePage = (number) => dispatch(setPageCount(number));

  React.useEffect(() => {
    if (isSearch) {
      getPizzas();
    }
    isSearch.current = false;
  }, [searchPizzaValue, currentPage, categoryId, sortActive]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortActive.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [currentPage, categoryId, sortActive]);

  const pizzasArray = items.map((pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  const skeletons = new Array(6)
    .fill(null)
    .map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить пиццы</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzasArray}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};
