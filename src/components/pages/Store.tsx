import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Row, Col } from "react-bootstrap";
import { FC } from "react";
import StoreItems from "../StoreItems";

interface StoreData {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const Store: FC = () => {
  const [storeData, setStoreData] = useState<StoreData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        const responseData: StoreData[] = response.data;
        setStoreData(responseData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Store</h1>
      {error && <p>Something went wrong</p>}
      {isLoading ? (
        <h5>Loading...</h5>
      ) : (
        <Row md={2} xs={1} lg={3} className="g-3">
          {storeData &&
            storeData?.slice(0, 20).map((item, idx) => (
              <Col key={idx}>
                <StoreItems {...item} />
              </Col>
            ))}
        </Row>
      )}
    </>
  );
};

export default Store;
