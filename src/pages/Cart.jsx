import { useSelector } from "react-redux";
import { Cart } from "../components/Cart";
import { CartEmpty } from "../components/cartEmpty";

export const CartPage = () => {
  const { items } = useSelector((state) => state.cart);

  return <>{items.length > 0 ? <Cart /> : <CartEmpty />}</>;
};
