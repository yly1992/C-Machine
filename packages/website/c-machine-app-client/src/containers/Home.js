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
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
//https://codesandbox.io/s/material-demo-34fsi?fontsize=14&hidenavigation=1&theme=dark&file=/demo.js


export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [etfs, setEtfs] = useState([]);
  const { isAuthenticated } = useAppContext();
  const { userEmail } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const [stockToBeAdded, setStockToBeAdded] = useState();
  const [etfToBeAdded, setEtfToBeAdded] = useState();


  function onStockToBeAddedInput(e){
    console.log("$$$")
    setStockToBeAdded(e.target.value);
  } 

  function onStockToBeAddedSubmit(e){
    e.preventDefault();
    console.log(stockToBeAdded);
  }

  function onEtfToBeAddedInput(e){
    console.log("$$$")
    setEtfToBeAdded(e.target.value);
  } 

  function onEtfToBeAddedSubmit(e){
    e.preventDefault();
    console.log(etfToBeAdded);
  }

  function deleteStock(event) {
    console.log("delete " + event.target.id);
    // const path = `/username/${userEmail}/${ticker}`;
    // API.del("user CRUD Service", path);
  }

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
          <Card key={etf}>
            <Card.Header style={{ display: "flex" }}>
              <Accordion.Toggle as={Button} variant="link" eventKey={etf}>
                {etf}
              </Accordion.Toggle>
              <Button id={`delete-${etf}`} variant="outline-danger" style={{ marginLeft: "auto" }} onClick={deleteStock}> Delete </Button>
            </Card.Header>
            <Accordion.Collapse eventKey={etf}>
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </>
    );
  }
  //https://stackoverflow.com/questions/43230622/reactjs-how-to-delete-item-from-list

  function renderStocksList(stocks) {
    // console.log(stocks);
    return (
      <>
        {stocks.map((stock) => (
          <Card key={stock}>
            <Card.Header style={{ display: "flex" }}>
              <Accordion.Toggle as={Button} variant="link" eventKey={stock}>
                {stock}
              </Accordion.Toggle>
              <Button id={`delete-${stock}`} variant="outline-danger" style={{ marginLeft: "auto" }} onClick={deleteStock}> Delete </Button>
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
        <div className = "pb-3 mt-4 mb-3">
        <br />
        <InputGroup className="mb-3">
          <FormControl aria-describedby="basic-addon1" type="text" placeholder="Add Stock" onChange={onStockToBeAddedInput} value={stockToBeAdded}/>
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={onStockToBeAddedSubmit}>Add</Button>
          </InputGroup.Append>
        </InputGroup>
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Stocks </h2>
        <Accordion >{!isLoading && renderStocksList(stocks)}</Accordion>
        </div>
        <div className = "pb-3 mt-4 mb-3 border-top">
        <br />
        <InputGroup className="mb-3">
          <FormControl aria-describedby="basic-addon1"  placeholder="Add ETF" onChange={onEtfToBeAddedInput} value={etfToBeAdded} />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={onEtfToBeAddedSubmit}>Add</Button>
          </InputGroup.Append>
        </InputGroup>
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your ETFs </h2>
        <Accordion >{!isLoading && renderETFsList(etfs)}</Accordion>
        </div>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderStocks() : renderLander()}
    </div>
  );
}