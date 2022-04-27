import { useState, useEffect } from 'react'

function Table() {

  const [data, setData] = useState([])

  useEffect(() => {
    const getCoins = async () => {
      if (data.length === 0) {
        let URL: string = `${import.meta.env.VITE_API_URL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C14d%2C30d`! as string
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

  let numberFormat = new Intl.NumberFormat('number', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  })

  return (
    <table className='container__table'>
      <tr>
        <th>#</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>24h</th>
        <th>7d</th>
        <th>14d</th>
        <th>30d</th>
        <th>Capitalización</th>
        <th>Moneda en circulación</th>
      </tr>
      {data?.length > 0 && data.map((coins) => {

        const { id, symbol, name, image, market_cap, current_price, market_cap_rank, price_change_percentage_24h, price_change_percentage_7d_in_currency, price_change_percentage_14d_in_currency, price_change_percentage_30d_in_currency, circulating_supply } = coins

        return (
          <tr className='coin' key={id}>
            <td>{market_cap_rank}</td>
            <td className='coin_name'>
              <span><img src={image} alt={id} width='25px' height='25px' /></span>{name} <span className='coin_symbol'>{symbol}</span></td>
            <td>{formatter.format(current_price)}</td>
            <td>{formatterPercent(price_change_percentage_24h)}</td>
            <td>{formatterPercent(price_change_percentage_7d_in_currency)}</td>
            <td>{formatterPercent(price_change_percentage_14d_in_currency)}</td>
            <td>{formatterPercent(price_change_percentage_30d_in_currency)}</td>
            <td>{formatter.format(market_cap)}</td>
            <td>{numberFormat.format(circulating_supply)}</td>
          </tr>
        )
      })}
    </table>
  )
}

export default Table
