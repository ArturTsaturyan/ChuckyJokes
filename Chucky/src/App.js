import React,{useState,useEffect} from 'react';
import './App.css';
import FavoriteJokes from './FavoriteJokes/FavoriteJokes';
import Button from './Components/Button/Button';
import LikesJoces from './LikesJokes/LikesJokes';

function App() {
  const [joke, setJoke] = useState([])


  async function Joke(){
    try{
      const res = await fetch(`https://api.chucknorris.io/jokes/random`)
      const req = await res.json();

      setJoke((prev) => [...prev, req.value])
    } catch(err) {
        console.log(err);
    }
  }
 
  if(joke.length===10)  {
    joke.shift()
  }

  return (
    
    <div className="App">
      <div className='jokleft'>
        <div>
            <Button value="joke" onClick={Joke}/>
            {joke.map((e,i)=>{
            return (
              <div key={i} className='chakydiv'>
                {e}
              </div>
             )
            })  }
        </div>
        <FavoriteJokes/>
      </div>
      <div className='jokright'>
         <LikesJoces/>
      </div>  
    </div>
  );
}

export default App;
