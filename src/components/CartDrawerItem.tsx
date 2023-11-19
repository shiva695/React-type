import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "./utilities/currencyFormater";
import { useShoppingCart } from "./context/ShoppingCartContext";

type CartDrawerItemProps = {
  id: number;
  quantity: number;
  images: string[];
  price: number;
  title: string;
};

const CartDrawerItem = ({
  id,
  quantity,
  images,
  price,
  title,
}: CartDrawerItemProps) => {
  const { removeFromCart } = useShoppingCart();
  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d-flex justify-content-between align-items-center"
    >
      <img
        src={images[0]}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />

      <div className="me-auto">
        <h6
          className="d-inline-block text-truncate"
          style={{ maxWidth: "110px" }}
        >
          {title}
        </h6>

        <div className="d-flex gap-3 align-items-center">
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(price)}
          </div>
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              X {quantity}
            </span>
          )}
        </div>
      </div>

      <div className="d-flex gap-2">
        <div className="text-fs-4">{formatCurrency(price * quantity)}</div>
        <Button onClick={() => removeFromCart(id)} className="btn-sm">
          X
        </Button>
      </div>
    </Stack>
  );
};

export default CartDrawerItem;
