import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const factUrl = `https://catfact.ninja/fact?`
  const [fact, setFact] = useState()
  const [imgUrl, setImgUrl] = useState()
  
  useEffect(()=>{
    fetch(factUrl)
      .then(res => res.json())
      .then(data => {
        const {fact} = data
        setFact(fact)
      }) 
  },[])

  useEffect(()=> {
    //only execute if fact exists
    if (!fact) return
    const firstThreeWords = fact.split(' ',3).join(' ')
    fetch(`https://cataas.com/cat/says/${firstThreeWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const {url} = response
        setImgUrl(url)
      })
      // adding dependecy on fact
  },[fact])

  return (
    <main>
      <h1>Random Cat Fact</h1>
      {fact ? <p>{fact}</p> : null}
      {fact ? <img src={`https://cataas.com/${imgUrl}`}/> : null}
    </main>
  )
}

export default App

