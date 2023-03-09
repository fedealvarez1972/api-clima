import axios from 'axios'
import './App.css'
import Climate from './components/Climate'
import { useState, useEffect } from 'react'

function App() {

  const API_endpoint = "https://api.openweathermap.org/data/2.5/weather?"
  const API_key = "44632ef80a8e631810f1b35deef354c2"
  let lat = ""
  let lon = ""
  const [ character, setCharacter ] = useState({})

  useEffect(() => {
  
 
    navigator.geolocation.getCurrentPosition( possition => {
        lat = (possition.coords.latitude); 
        lon = (possition.coords.longitude);

        axios
        .get(`${API_endpoint}lat=${lat}&lon=${lon}&appid=${API_key}`)
        .then( (resp) => setCharacter(resp.data))
        .catch( (error) => console.log(error) )
      })
    }, [])

    const [ text, setText ] = useState("")

const cityClimate = () => {

      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_key}`)
         .then( (resp) => setCharacter(resp.data))
         .catch( (error) => console.log(error) )
}
console.log(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_key}`)
return (
  <div className="App">

    <div className="buscador"> 
      <input value={text} onChange={ (e) => setText(e.target.value)} className='buscador-imput' type="text" name="city" placeholder= "   Ciudad..."/>
      <button onClick={cityClimate} className='btn-buscador'>buscar<i className='bx bx-search-alt-2'></i></button>
    </div>

    <Climate data={character}/>
      
    </div>
  )
}

export default App








