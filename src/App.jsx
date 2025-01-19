import {Outlet} from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { store } from './utils/store'
import {Provider} from "react-redux"


function App() {
 

  return (
    <Provider store={store}>
     <Header />
     <Outlet />
     <Footer />
    </Provider>
  )
}

export default App
