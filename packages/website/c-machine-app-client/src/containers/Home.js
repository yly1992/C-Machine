import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

//https://codesandbox.io/s/material-demo-34fsi?fontsize=14&hidenavigation=1&theme=dark&file=/demo.js


export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [etfs, setEtfs] = useState([]);
  const { isAuthenticated } = useAppContext();
  const { userEmail } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const obj = await loadStocks();
        setStocks(obj['Item']['stocks']);
        setEtfs(obj['Item']['ETFs']);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadStocks() {
    console.log(userEmail);
    const path = `/username/${userEmail}`;
    return API.get("user CRUD Service", path);
  }

  function renderETFsList(etfs) {
    return (
      <>
        {etfs.map((etf) => (
          <ListGroup.Item>
            <span className="text-muted">
              {etf}
            </span>
          </ListGroup.Item>
        ))}
      </>
    );
  }
  //https://stackoverflow.com/questions/43230622/reactjs-how-to-delete-item-from-list

  function renderStocksList(stocks) {
    console.log(stocks);
    return (
      <>
        {stocks.map((stock) => (
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={stock}>
               {stock}
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={stock}>
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
        )
        )}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch Now</h1>
        <p className="text-muted">A $imple Making Money app</p>
      </div>
    );
  }

  function renderStocks() {
    return (
      <div className="stocks">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Stocks </h2>
        <Accordion defaultActiveKey="0">{!isLoading && renderStocksList(stocks)}</Accordion>
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your ETFs </h2>
        <ListGroup>{!isLoading && renderETFsList(etfs)}</ListGroup>
      </div>
    );
  }

  function deleteStock(ticker) {
    const path = `/username/${userEmail}/${ticker}`;
    API.del("user CRUD Service", path);
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderStocks() : renderLander()}
    </div>
  );
}