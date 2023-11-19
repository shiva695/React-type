import { useEffect } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "./context/ShoppingCartContext";
import CartDrawerItem from "./CartDrawerItem";
import { formatCurrency } from "./utilities/currencyFormater";
type ShoppingCartDrawerprops = {
  isOpen: boolean;
};
const ShoppingCartDrawer = ({ isOpen }: ShoppingCartDrawerprops) => {
  const { closeCart, cartItems } = useShoppingCart();

  const totalAmount = () => {
    const t = cartItems?.map((el) => el.price * el.quantity);
    return formatCurrency(t.reduce((sum, item) => sum + item, 0));
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      closeCart();
    }
  }, [cartItems.length, closeCart]);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems?.map((item, idx) => (
            <CartDrawerItem images={[]} title={""} key={idx} {...item} />
          ))}

          <div className="ms-auto fw-bold fs-5">Total {totalAmount()}</div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCartDrawer;
