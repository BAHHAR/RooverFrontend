import React, { Suspense, useEffect, useState } from "react";
import Login from "./pages/Login";
import Spin from "./components/Ui/Spin";
import { getAuth } from "./util/handleAuthStorage";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setCurrentAuth } from "./store/slices/auth";
import ChangePassword from "./pages/ChangePassword";
const Admin = React.lazy(() => import("./pages/Admin/index"));
const Accueil =React.lazy(()=>import("./pages/Accueil/index"))
function App() {
  const [loading, setLoading] = useState(true);
  const auth = useAppSelector((state) => state.auth.user);
  
  const dispatche = useAppDispatch();
  const url=window.location.href
  useEffect(() => {
    const res = getAuth();
    if (res) dispatche(setCurrentAuth(res));
    setLoading(false);
  }, []);
  if (loading) return <Spin />;
  else if(url.includes("ChangePassword"))
    return <ChangePassword/>
  else if(url.includes("admin"))
      return (
        <div className="App">
          <Suspense fallback={<Spin />}>{auth ? <Admin /> : <Login />}</Suspense>
        </div>
      )
  else
  return( 
  
  <div>
    <Suspense fallback={<Spin/>}><Accueil/></Suspense>
      </div>
      )
}

export default App;
