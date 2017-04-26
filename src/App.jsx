import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';



import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';

//todo: components for user, this need to be refactor in the future
import UserHome from './components/UserHome.jsx';
import CurrentMenu from './components/CurrentMenu.jsx';
import FutureMenu from './components/FutureMenu.jsx';

//todo: Components for kitchen staff, this need to be refactor
import AdminHome from './components/admin/AdminHome.jsx';
import CreateMeal from './components/CreateMeal.jsx';
import CreateMenu from './components/admin/CreateMenu.jsx';
import OrderSummary from './components/admin/OrderSummary.jsx';

import Meals from './components/Meals.jsx';



//todo: mock data for front-end development, will remove this after we connect api
import currentWeek from './mock_data/currentWeek.json';
import futureWeek from './mock_data/futureWeek.json';

//CSS library
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            currentWeek: {},
            futureWeek: {},
            version: 1
        };
    }

    componentWillMount() {
        {/* load data*/}
        let currentWeekData = currentWeek;
        let futureWeekData = futureWeek;

        this.setState({
            currentWeek: currentWeekData,
            futureWeek: futureWeekData,
            version: 2
        });
    }

    render() {

        let renderCurrentMenu = (matchParams) => {
            let newMatchParams = matchParams;

            newMatchParams.currentWeek = this.state.currentWeek;

            return (
                <CurrentMenu {...newMatchParams}/>
            );
        };

        let renderFutureMenu = (matchParams) => {
            let newMatchParams = matchParams;

            newMatchParams.futureWeek = this.state.futureWeek;

            return (
                <FutureMenu {...newMatchParams}/>
            );
        };

        return (
            <HashRouter>
                <div className="container">
                    <Header/>
                        <div>
                            <Switch>
                                {/* todo: default router is set for user home, we need refactor this later */}
                                <Route exact path="/" component={UserHome}/>

                                {/* Route for users  */}
                                <Route exact path="/user" component={UserHome}/>
                                <Route path="/current" render={renderCurrentMenu} />
                                <Route path="/next" render={renderFutureMenu}/>

                                {/* Route for admin  */}
                                <Route exact path="/admin" component={AdminHome}/>
                                <Route exact path="/createmeal" component={CreateMeal}/>
                                <Route exact path="/createmenu" component={CreateMenu}/>
                                <Route exact path="/meals" component={Meals}/>
                                <Route exact path="/summary" component={OrderSummary}/>

                                {/* error handling */}
                                <Route render={() => <h1>Page NOT Found</h1>} />
                            </Switch>
                        </div>
                    <Footer/>
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(<App />,  document.getElementById('app'));
