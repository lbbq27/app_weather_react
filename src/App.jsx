import { useEffect, useState } from "react"




function App(){
  
  const[input, setInput] = useState("")
  const[options, setOptions]=useState([])
  const[show, setShowList]=useState([])
  
  
  
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

 
  
  
  
  const getData= async(value)=>{
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${apiKey}`)
    const data = await response.json()
    setOptions(data[0])
    
    
  }
  
  const handleOnCHange = (e)=>{
    const value = e.target.value
    setInput(value)
    if (value==="")return
    getData(value)
  }
  
  const handleClick = (data,index)=>{
    
    const newW =
      {
        id:index,
        name: data.name,
        lat: data.lat,
        lon:data.lon
      }
    

    setShowList((prev)=>[...prev, newW])
    
    setInput('')
    
  
    
  }
  
    
  return (
    <>
    <main className="h-screen min-w-full bg-gray-700 flex justify-center items-center" >
      <section className="md:max-w-[500px] flex flex-col items-center gap-3">
      <h1 className="font-extrabold text-pink-500 text-3xl">App<span className="text-white font-thin">Weather</span></h1>
      <p className="text-center font-medium text-gray-50 px-6">Enter below the place you want to know the weather of and select an option from the dropdown</p>
      <div>
        <input type="text" className="rounded-md p-1" value={input} onChange={handleOnCHange}/>
        <button onClick={()=>handleClick(options)} className="bg-pink-500 rounded-md px-2 font-bold text-gray-700 ml-2 border-solid border-white border-2 text-center">search</button>
      </div>
      <div className="text-white">

        {
          show.map((item,index)=>(
            <ul>
              <li key={index}><span className="font-semibold text-pink-500">{item.name}</span> , Lat:{item.lat}, Lon:{item.lon}</li>
            </ul>
          ))
        }

      </div>
     
      </section>

    </main>

    </>
  )
}

export default App
