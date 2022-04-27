import { useState } from 'react'

const Card = () => {
  return (
    <div className='card_container'>
      <div className='card_container__header'>
        <span>Icon</span>
        <h3>Trending</h3>
      </div>
      <div className='card_container__body'>
        <div>
          <span>1</span>
          <span>Icono</span>
          <p>Nombre</p>
          <span>Siglas</span>
        </div>
        <span>Data</span>
      </div>
    </div>
  )
}

export default Card