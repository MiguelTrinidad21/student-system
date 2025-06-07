import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './elements/Home'
import Create from './elements/Create'
import Edit from './elements/Edit'
import Read from './elements/Read'
import Search from './elements/Search'


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search/:nameToFind' element={<Search />}/>
        <Route path='/create' element={<Create />}/>
        <Route path='/edit/:id' element={<Edit />}/>
        <Route path='/get_student/:id' element={<Read />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
