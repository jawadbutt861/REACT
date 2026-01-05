
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Route, Routes} from "react-router";
import Home from './screens/Home';
import About from './screens/About';
import Contact from './screens/Contact';
import Services from './screens/Services';
import Navbar from './components/Navbar';
import Dashboard from './screens/Dashboard/Dashboard';
import Student from './screens/Dashboard/Student';
import Settings from './screens/Dashboard/Settings';
import Manager from './screens/Dashboard/Manager';
import Campus from './screens/Dashboard/Campus';
import Product from './screens/Product';

createRoot(document.getElementById('root')).render(
 <BrowserRouter>

  <Navbar />

 <Routes>

 <Route path = '*' element={<h1>Page Not Found</h1>} />
 <Route index element={<Home />} />
 <Route path = 'About' element = {<About />} />
 <Route path = 'Contact' element = {<Contact />} />
 <Route path = 'Services' element = {<Services />} />
 <Route path= 'Product/:id' element={<Product/>}/>

 <Route path = 'Dashboard' element = {<Dashboard />}>

 <Route index element = {<Student />}/>
 <Route path = 'Campus' element = {<Campus />}/>
 <Route path = 'Settings' element = {<Settings />}/>
 <Route path = 'Manager' element = {<Manager />}/>

 </Route>

 </Routes>

 </BrowserRouter>
)
