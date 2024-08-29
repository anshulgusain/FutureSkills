import React from 'react'
import {useState,useEffect} from 'react'
import "./Card.css"


export default function Card() {
const [data,setData]=useState([])
const [search,setSearch]=useState('')
const [loading,setLoading]=useState(false)
const [error,setError]=useState(false)

useEffect(()=>{
  const find=async()=>{
    try{
    setLoading(true)
    const response= await fetch("http://localhost:5050/cards")
    const result=await response.json()
    console.log(result)
    setData(result)
    setLoading(false)
    }catch(err){
      setLoading(false)
      setError(true)
      console.log(err)
    }
    
  }
  find()

},[])


 const doSearch=()=>{
 console.log(search)
    const find=async()=>{
      try{
      setLoading(true)
      const response= await fetch(`http://localhost:5050/cards/${search}`)
      const result=await response.json()
      console.log(result)
      setData(result)
      setLoading(false)
      }catch(err){
        setLoading(false)
        setError(true)
        console.log(err)
      }
      
    }
    find()

 }



if(loading){
  return<div>Loading.....</div>
}

if(error){
  return<div>Error Please try again!!!!</div>
}

  return (
    <div>
      <div className='searchContainer'>
      <nav className='navbar'>
    <div className='heading'>
     Abstract | Help Centre
    </div>
   <div className='fakeButton'>
    <button>Submit a request</button>
   </div>

      </nav>

      
        <h1 className='how'>How can we help?</h1>
        <input placeholder='search' onChange={e => setSearch(e.target.value)}  className='searchbox'></input>
        <button onClick={doSearch} className='doSearch'>Go</button>
      </div>
{
      <div className='cardcontainer'>
        {
          
          data.map((ele)=>(
            <div key={ele.id} className='card'>
              <h3>{ele.title}</h3>
              <hr></hr>
              <p>{ele.description}</p>
            </div>
          ))
        }
      </div>
}
    </div>
  )
}
