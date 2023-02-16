import React from "react";
import { Animation } from "@ledenev/react-animation";
import { useDispatch, useSelector } from "react-redux";
import { addItem, cartItemByIdSelector } from "../../redux/slices/cartSlice";

const PizzaBlock = ({
  id,
  imageUrl,
  name,
  types,
  sizes,
  price,
  category,
  rating,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(cartItemByIdSelector(id));
  const addedCount = cartItem ? cartItem.count : 0;

  const typePizzas = ["тонкое", "традиционное"];
  const [typePizzasIndex, setTipePizzasIndex] = React.useState(0);
  const [sizeActive, setSizeActive] = React.useState(0);

  const handleTypePizzas = (index) => setTipePizzasIndex(index);
  const handleSizeActive = (index) => setSizeActive(index);

  const onClickAdd = () => {
    const item = {
      id,
      name,
      price,
      imageUrl,
      type: typePizzas[typePizzasIndex],
      size: sizes[sizeActive],
    };
    dispatch(addItem(item));
  };

  return (
    <>
      <div className="pizza-block">
        <div style={{ width: "260px", height: "260px" }}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </div>
        <div className="pizza-block__rating">
          <span>
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.98757 0.12671C6.93041 0.129109 6.87536 0.148959 6.82982 0.183594C6.78428 0.218228 6.75044 0.265984 6.73286 0.320432L5.41407 4.40765L1.12061 4.39916C1.06138 4.39906 1.00366 4.41773 0.955714 4.4525C0.907773 4.48727 0.872088 4.53635 0.85379 4.59268C0.835491 4.64901 0.835521 4.70969 0.853875 4.766C0.872229 4.82232 0.907962 4.87136 0.955937 4.90608L4.43492 7.42362L3.09913 11.5066C3.08073 11.5629 3.08065 11.6236 3.0989 11.6799C3.11715 11.7363 3.15278 11.7854 3.20069 11.8202C3.24859 11.855 3.30629 11.8737 3.36551 11.8737C3.42472 11.8736 3.4824 11.8548 3.53024 11.8199L6.99934 9.28823L10.4699 11.8199C10.5177 11.8548 10.5754 11.8736 10.6346 11.8737C10.6938 11.8737 10.7515 11.855 10.7994 11.8202C10.8473 11.7854 10.883 11.7363 10.9012 11.6799C10.9194 11.6236 10.9194 11.5629 10.901 11.5066L9.56517 7.42362L13.0442 4.90608C13.0921 4.87136 13.1279 4.82232 13.1462 4.766C13.1646 4.70969 13.1646 4.64901 13.1463 4.59268C13.128 4.53635 13.0923 4.48727 13.0444 4.4525C12.9964 4.41773 12.9387 4.39906 12.8795 4.39916L8.58592 4.40765L7.26571 0.320338C7.24688 0.262097 7.20948 0.211633 7.15925 0.176664C7.10902 0.141694 7.04872 0.124149 6.98757 0.12671Z"
                fill="#E6EB00"
              />
            </svg>
          </span>
          <span>{rating}</span>
        </div>
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                key={index}
                onClick={() => handleTypePizzas(index)}
                className={typePizzasIndex === index ? "active" : ""}
              >
                {typePizzas[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => handleSizeActive(index)}
                className={sizeActive === index ? "active" : ""}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </>
  );
};

export { PizzaBlock };
