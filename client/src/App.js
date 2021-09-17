import Landing from "components/layout/Landing";
import AuthContextProvider from "context/AuthContext";
import PostContextProvider from "context/PostContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProtectedRoute from "routing/ProtectedRoute";
import About from "views/About";
import Auth from "views/Auth";
import Dashboard from "views/Dashboard";
import "./App.css";

function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <Router>
                    <Route exact path="/" component={Landing} />
                    <Route
                        exact
                        path="/login"
                        render={(props) => (
                            <Auth {...props} authRoute="login" />
                        )}
                    />
                    <Route
                        exact
                        path="/register"
                        render={(props) => (
                            <Auth {...props} authRoute="register" />
                        )}
                    />
                    <ProtectedRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                    <ProtectedRoute exact path="/about" component={About} />
                </Router>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
