import { useState, useEffect } from 'react'
import Card from './Card'


const CardContainer = () => {
  const [data, setData] = useState({
    trending: [],
    biggestGainers: [],
    recentlyAdded: []
  })

  useEffect(() => {
    const getCoins = async () => {
      if (data.trending.length === 0) {
        let URL: string = `${import.meta.env.VITE_API_URL}search/trending`! as string
        const request = await fetch(URL)
        if (request.ok) {
          const response = await request.json()
          const res = { ...data }
          res.trending = response.coins
          data.trending = response
          setData(res)
        }
      }
    }
    getCoins()
  }, [data])

  return (
    <div className='cardContainer__container'>
      <Card />
      <Card />
      <Card />
    </div>
  )
}

export default CardContainer