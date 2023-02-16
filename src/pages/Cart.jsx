import { useSelector } from "react-redux";
import { Cart } from "../components/Cart";
import { CartEmpty } from "../components/cartEmpty";
import { cartSelector } from "../redux/slices/cartSlice";

export const CartPage = () => {
  const { items } = useSelector(cartSelector);

  return <>{items.length > 0 ? <Cart /> : <CartEmpty />}</>;
};
