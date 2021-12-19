import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation
} from "react-router-dom";
import {
    PendingRequest,
    LoginSignUp,
    Users,
    ApprovedRequests,
    NotFound,
    SearchRequests

} from "../containers/index.js";
import { 
    NavBar 
} from "../components/index.js"
import { 
    auth, 
    onAuthStateChanged, 
    db, 
    collection, 
    query, 
    where, 
    onSnapshot 
} from './Firebase.js';
import { 
    useState, 
    useEffect, 
    Component
} from "react";

function PrivateRoute({component:Component,auth, ...rest}){
    return <Route {...rest}
        component={({location})=>
            auth?
            <Component/>
            :
            <Redirect to={{
                pathname:"/",
                state:{
                    from:location.pathname,
                }
            }}
            />
        }
    />
}

function PublicRoute({component:Component,auth, ...rest}){
    const location = useLocation();
    return <Route
        {...rest}
        component={()=>
        !auth?
        <Component/>
        :
        <Redirect
        to={location.state?.from?location.state.from:"/"}
        />
        }
    />
}
function AppRouter() {
    const [userName, setUserName] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
                const q = query(collection(db, "users"), where("userId", "==", user.uid));
                onSnapshot(q, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setUserName(doc.data().companyName)
                    });
                });
            } else {
                setIsAuth(false);
            }
        })
    }, [])
    return (
        <Router>
            <Switch>
                <PublicRoute auth={isAuth} exact path="/">
                    <NavBar user={userName}><LoginSignUp/></NavBar>
                </PublicRoute>
                <PrivateRoute auth={isAuth} exact path="/pendingrequest">
                    <NavBar user={userName}><PendingRequest /></NavBar>
                </PrivateRoute>
                <PrivateRoute auth={isAuth} exact path="/users">
                    <NavBar user={userName}><Users /></NavBar>
                </PrivateRoute>
                <PrivateRoute auth={isAuth} exact path="/approved">
                    <NavBar user={userName}><ApprovedRequests /></NavBar>
                </PrivateRoute>
                <PrivateRoute auth={isAuth} exact path="/searchrequest">
                    <NavBar user={userName}><SearchRequests /></NavBar>
                </PrivateRoute>
                {/* <Route path="*" exact component={NotFound} /> */}
            </Switch>
        </Router>
    )
}

export default AppRouter;