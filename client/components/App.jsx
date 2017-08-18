import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import { fullWhite } from 'material-ui/styles/colors';

import Nav from './Nav';
import AppDrawer from './AppDrawer';
import Landing from './Landing';
import UserDetails from './UserDetails';
import ProjectDetails from './ProjectDetails';
import ProjectList from './ProjectList';
import Questionnaire from './Questionnaire';
import NotFound from './NotFound';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      loggedIn: false,
    }

    this.getProjects();
    this.navTap = this.navTap.bind(this);
    this.checkAuthenticated = this.checkAuthenticated.bind(this);
  }

  getProjects() {
    axios.get('/API/projects/')
      .then((project) => {
        this.props.addProjectsList(project.data);
      })
      .catch(console.error);
  }

  navTap() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  checkAuthenticated() {
    axios.get('/auth/authenticated')
      .then(res => this.setState({ loggedIn: res.data }));
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <BrowserRouter>
          <div>
            <AppBar title='GitBud' onLeftIconButtonTouchTap={ this.navTap } iconElementRight={ <Link to='/'><IconButton><ActionHome color={ fullWhite }/></IconButton></Link> }/>
            <AppDrawer open={ this.state.drawerOpen } changeOpenState={ open => this.setState({ drawerOpen: open }) } closeDrawer={ () => this.setState({ drawerOpen: false}) }/>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/signup" component={Questionnaire} />
              <Route exact path="/projects" component={ProjectList} />
              <Route path="/projects/:id" component={ProjectDetails} />
              <Route path="/user/:id" component={UserDetails} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
    return <Landing checkAuth={ this.checkAuthenticated } />;
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeString: () => dispatch({
      type: 'CHANGE_STRING',
      text: 'some other message'
    }),
    addProjectsList: (projects) => dispatch({
      type: 'LIST_PROJECTS',
      projects: projects,
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
