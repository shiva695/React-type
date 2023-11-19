import { useState, useContext, ReactNode, createContext } from "react";
import ShoppingCartDrawer from "../ShoppingCartDrawer";
import { useLocalStorage } from "../hooks/useLocalStorage";
// Create context

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (
    id: number,
    price: number,
    title: string,
    images: string[]
  ) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  price: number;
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

// Custom Hooks useShoppingCart
// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // getItemQuntity
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // increaseCartQuantity
  const increaseCartQuantity = (
    id: number,
    price: number,
    title: string,
    images: string[]
  ) => {
    setCartItems((currCart) => {
      if (cartItems.find((item) => item.id === id) === undefined) {
        return [...currCart, { id, price, title, images, quantity: 1 }];
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  // decreaseCartQuantity
  const decreaseCartQuantity = (id: number) => {
    setCartItems((currCart) => {
      if (cartItems.find((item) => item.id === id)?.quantity === 1) {
        return currCart.filter((item) => item.id !== id);
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  //   remove cartItems
  const removeFromCart = (id: number) => {
    setCartItems((currCart) => currCart.filter((item) => item.id !== id));
  };

  // cart quantity
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  // open and close cart
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      {isOpen && <ShoppingCartDrawer isOpen={isOpen} />}
    </ShoppingCartContext.Provider>
  );
}
