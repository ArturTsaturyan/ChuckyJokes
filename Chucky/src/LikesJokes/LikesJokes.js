import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Components/Button/Button";
import './LikesJokes.css'

const LikesJoces = () => {
  const [jokes, setJokes] = useState([]);

  const resetJokes = () => {
    setJokes([]);
  };

  const addJoke = () => {
    axios
      .get("https://api.chucknorris.io/jokes/random")
      .then((res) => {
        setJokes([...jokes, res.data.value]);
      })
      .catch((error) => {
        console.log(error);
      });
    
  };


  const onDeleteJoke = (e) => {
    setJokes(jokes.filter(j => j !== e))
  }

  useEffect(() => {
    if (jokes.length >= 10) {
      jokes.shift();
    }
  });
  

  return (
    <div className="likejokes">
     
      <Button onClick={addJoke} value="Jokes random"/>
      <Button onClick={resetJokes} value="Reset jokes"/>
      <ol >
        {jokes.map((el,i) => (
          <li key={i}>{el}<Button onClick={() => {onDeleteJoke(el)}} value="delete"/></li>
        ))}
      </ol>
    </div>
  );
};

export default LikesJoces;