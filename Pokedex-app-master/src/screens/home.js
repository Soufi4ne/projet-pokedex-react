import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { filter } from "underscore";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokedex, setPokedex] = useState([]);
  const [filterPokeDex, setFilterPokeDex] = useState([]);

  const fetchPokedex = async () => {
    console.log("fetching data ...");
    setIsLoading(true);

    try {
      const res = await axios.get("http://localhost:8000/pokedex");
      console.log(res.data);
      setPokedex(res.data);
      setFilterPokeDex(res.data);
      setIsLoading(false);
    } catch (ex) {
      console.log("error", ex);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokedex();
  }, []);

  const onChange = (e) => {
    const val = e.target.value;

    if (val === "") {
      setFilterPokeDex(pokedex);
      return;
    }

    const filterData = filter(pokedex, (rec) => {
      return rec["nom"].toLowerCase().startsWith(val);
    });
    setFilterPokeDex(filterData);
  };

  return (
    <React.Fragment>
      <input
        type="text"
        className="form-control my-4"
        placeholder="Cherche ton Pokemon..."
        style={{borderRadius: '50px'}}
        onChange={onChange}
      
      />

      {isLoading && <div className="spinner-border"></div>}
      {!isLoading && filterPokeDex.length > 0 && (
        <PokedexList items={filterPokeDex} />
      )}
    </React.Fragment>
  );
};

export default HomeScreen;

function PokedexList({ items }) {
  return (
    <div className="row">
      {items.map((pokedex, i) => (
        <div className="col-md-3 my-3" key={i}>
          <SinglePokedex pokedex={pokedex} />
        </div>
      ))}
    </div>
  );
}

function SinglePokedex({ pokedex }) {
  const img = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokedex.ndex}.png`;

  return (
    <div>
      <Card>
        
        <Card.Img variant="top" src={img} />
        <Card.Header className="text-center">
          <p>Numéro: {pokedex.numero} </p>
          <p>Nom: {pokedex.nom}</p>
          <p>Espece: {pokedex.espece}</p>
          <p>Taille: {pokedex.taille}</p>
          <p>Poids: {pokedex.poids}</p>
          <p>Type 1: {pokedex.type1}</p>
          <p>
            Type 2:{" "}
            {pokedex.type2 ? (
              pokedex.type2
            ) : (
              <span style={{ color: "#CC0066" }}>Pas de 2ème type</span>
            )}
          </p>
        </Card.Header>
      </Card>
    </div>
  );
}
