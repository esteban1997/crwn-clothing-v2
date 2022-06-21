import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';
import {Routes,Route} from 'react-router-dom'


const Shop = () =>  {
  return <h1>I am the shoop page</h1>;
}

const App = () =>  {
  return (
    <Routes>
      <Route path='/' element={<Navigation></Navigation>}>
        <Route index element={<Home></Home>}></Route>
        <Route path='shop' element={<Shop></Shop>}></Route>
        <Route path='signIn' element={<SignIn></SignIn>}></Route>
      </Route>
    </Routes>
  );
}

export default App;