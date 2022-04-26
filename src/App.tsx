import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    const getCoins = async () => {
      if (data.length === 0) {
        let URL: string = `${import.meta.env.VITE_API_URL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`! as string
        const request = await fetch(URL)
        if (request.ok) {
          const response = await request.json()
          setData(response)
        }
      }
    }
    getCoins()
  }, [data])

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  let formatterPercent = (percent: Number) => {
    return ` ${percent.toFixed(2)}%`
  }
  console.log(data)
  return (
    <div className='container'>
      <h1 className='container__title'>Negrin Market Cap</h1>
      <table className='container__table'>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>24h</th>
          <th>Capitalización</th>
        </tr>
        {data?.length > 0 && data.map((coins) => {

          const { id, symbol, name, image, market_cap, current_price, market_cap_rank, price_change_percentage_24h } = coins

          return (
            <tr className='coin' key={id}>
              <td>{market_cap_rank}</td>
              <td className='coin_name'>
                <span><img src={image} alt={id} width='25px' height='25px' /></span>{name} <span className='coin_symbol'>{symbol}</span></td>
              <td>{formatter.format(current_price)}</td>
              <td>{formatterPercent(price_change_percentage_24h)}</td>
              {/* <td>{price_change_percentage_24h}</td> */}
              <td>{formatter.format(market_cap)}</td>
            </tr>
          )

        })}
      </table>
    </div >
  )
}

export default App
