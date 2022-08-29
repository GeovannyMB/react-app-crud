import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  console.log(listGames);

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then(() => {
      setListGames([
        ...listGames,
        {
          name: values.name,
          cost: values.cost,
          category: values.category,
        },
      ]);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListGames(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="AppForm">
        <Form>
          <h1>Cadastrar Game</h1>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Nome"
              className="name"
              onChange={handleChangeValues}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Control
              type="number"
              name="cost"
              placeholder="Preço"
              className="cost"
              onChange={handleChangeValues}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Control
              type="text"
              name="category"
              placeholder="Categoria"
              className="category"
              onChange={handleChangeValues}
            />
          </Form.Group>

          <Button
            variant="primary"
            className="add-btn"
            onClick={() => handleClickButton()}
          >
            Adicionar
          </Button>
          {typeof listGames !== "undefined" &&
            listGames.map((value) => {
              return (
                <Card
                  key={value.id}
                  listCard={listGames}
                  setListCard={setListGames}
                  id={value.idgames}
                  name={value.name}
                  cost={value.cost}
                  category={value.category}
                ></Card>
              );
            })}
        </Form>
      </div>
    </div>
  );
}

export default App;
