import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Resource from "./components/Resource";
import Search from "./components/Search";
import Login from "./components/Login";
import { AuthContext } from "./utility/authContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Login />
      {user && (
        <div>
          <Search />
          <Resource />
        </div>
      )}
    </div>
  );
};

export default App;
