import React from 'react';
import { useRef } from 'react';
import styles from './search.module.scss';
import { setSearchValue } from '../../redux/slices/searchSlice';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import { useState } from 'react';
import { useCallback } from 'react';


const Search = () => {
  /*
  * Локально меняю значение в инпуте, 
  * а также через debounce отправляю в redux-store
  * значения для поиска и использую эти значения
  * для отображения элементов.
  * Возможно можно было бы воспользоваться redux-subscribe ???
  */ 
  const inputRef = useRef(null);
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleSetSearchInputValue = (e) => {
    setSearchInputValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  const handleClearSearchInputValue = () => {
    setSearchInputValue('');
    updateSearchValue('');
    inputRef.current.focus();
  };

  const dispatch = useDispatch();
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={searchInputValue}
        onChange={(e) => handleSetSearchInputValue(e)}
        className={styles.input}
        placeholder="Найти.."
        type="text"
      />
      {searchInputValue && (
        <svg
          onClick={handleClearSearchInputValue}
          className={styles.close}
          height="100%"
          viewBox="0 0 16 16"
          width="100%"
          fill="currentColor">
          <path d="M13 4L12 3 8 7 4 3 3 4 7 8 3 12 4 13 8 9 12 13 13 12 9 8z"></path>
        </svg>
      )}
    </div>
  );
};

export { Search };
