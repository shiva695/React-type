import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "./utilities/currencyFormater";
import { useShoppingCart } from "./context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

const StoreItems = ({
  id,
  price,
  title,
  description,
  images,
}: StoreItemProps) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();

  const quantity = getItemQuantity(id);
  return (
    <Card style={{ height: "400px" }}>
      <Card.Img
        variant="top"
        src={images[0]}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex  justify-content-between align-items-baseline mb-3">
          <span>{title}</span>
          <span>{formatCurrency(price)}</span>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="mx-auto mt-auto">
          {quantity === 0 ? (
            <Button
              onClick={() => increaseCartQuantity(id, price, title, images)}
            >
              Add to cart
            </Button>
          ) : (
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100px" }}
            >
              <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              <h4>{quantity}</h4>
              <Button
                onClick={() => increaseCartQuantity(id, price, title, images)}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItems;
