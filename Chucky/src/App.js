import React,{useState,useEffect} from 'react';
import './App.css';
import FavoriteJokes from './FavoriteJokes/FavoriteJokes';
import Button from './Components/Button/Button';
import axios from "axios";
import uniqid from "uniqid";
import LikesJoces from './LikesJokes/LikesJokes';

// import LikesJoces from './LikesJokes/LikesJokes';

function App() {
  const [joke, setJoke] = useState([]);
  const [jokes, setJokes] = useState([]);
  const [lkjoke,setLkjoke] = useState(false);



  
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
  const resetJokes = () => {
    setJokes([]);
  };

 

  useEffect(() => {
    const getStorage = localStorage.getItem("test")

    return ()=> setJokes(JSON.parse(getStorage))
  },[])

  useEffect(()=>{
    const setStorage = JSON.stringify(jokes);
    localStorage.setItem("test",setStorage); 
  },[jokes])


  const onDeleteJoke = (e) => {
    setJokes(jokes.filter(j => j !== e))
  }

  useEffect(() => {
    if (jokes.length >= 10) {
      jokes.shift();
    }
  });
  
  function addJoke1(e){
      return lkjoke?()=>{
        setLkjoke((z)=>!z)
        setJokes((y)=>[...y,e])} : ()=>{
          setLkjoke((z)=>!z)
          setJokes(jokes.filter((y)=>y !== e))}
   };

  return (
    
    <div className="App">
      <div className='jokleft'>
        <div>
            <Button value="joke" onClick={Joke}/>
            {joke.map((e,i)=>{
              console.log(i);
            return (
              <div key={i} className='chakydiv'>
              <button 
              key={i} 
              className={lkjoke?'heat':"heatrem"} 
              onClick={addJoke1(e)}>❤</button>
                {e}
              </div>
             )
            })  }
        </div>
        <FavoriteJokes/>
      </div>
      <div className='jokright'>
      <div className='resetJokes'>
     <Button onClick={resetJokes} value="Jokes like"/>
     <ol>
       {jokes.map((el,i) => (
        <div key={i}>
         <li key={i}>{el}<Button onClick={() => {onDeleteJoke(el)}} value="delete"/></li>

        </div>
       ))}
     </ol>
   </div>
   <LikesJoces/>
      </div>  
      
    </div>
  );
}

export default App;
