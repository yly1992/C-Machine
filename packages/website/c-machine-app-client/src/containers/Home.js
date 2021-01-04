import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const { isAuthenticated } = useAppContext();
  const { userEmail } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const stocks = await loadStocks();
        setStocks(stocks);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated, userEmail]);
  
  function loadStocks() {
    console.log(userEmail);
    const path = `/username/${userEmail}`;
    return API.get("user CRUD Service", path);
  }

  function renderStocksList(stocks) {
    console.log(stocks);
    // return (
    //     <>
    //       {stocks.map(({ stock }) => (
    //         <LinkContainer>
    //           <ListGroup.Item>
    //             <span className="text-muted">
    //               Name: {stock}
    //             </span>
    //           </ListGroup.Item>
    //         </LinkContainer>
    //       ))}
    //     </>
    //   );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A $imple Making Money app</p>
      </div>
    );
  }

  function renderStocks() {
    return (
      <div className="stocks">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Stocks Here: </h2>
        <ListGroup>{!isLoading && renderStocksList(stocks)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderStocks() : renderLander()}
    </div>
  );
}