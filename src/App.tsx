import './App.css'
import Card from './components/Card'
import CardContainer from './components/CardContainer'
import Table from './components/Table'

function App() {

  return (
    <div className='container'>
      <CardContainer />
      <h1 className='container__title'>Negrin Market Cap</h1>
      <Table />
    </div >
  )
}

export default App
