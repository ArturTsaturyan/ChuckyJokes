import React, { useEffect, useState} from "react";
import axios from "axios";
import Button from "../Components/Button/Button";
import './FavoriteJokes.css'

const Jokes = () => {
  const [joke, setJoke] = useState("");
  const [started, setStarted] = useState(false);

  const apiJoke = () => {
    axios
      .get("https://api.chucknorris.io/jokes/random")
      .then((res) => {
        setJoke(res.data.value);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    let stop;
    if(started){
        stop = setInterval(() => {
          apiJoke();
        }, 3000);
    }
    return () => clearInterval(stop)
    
  },[started])



  return (
    <div>
     <Button onClick={() => setStarted(!started)} value="Jokes"/>
      <div className="favoritejokes">
        {joke}
      </div>
    </div>
  );
};

export default Jokes;
