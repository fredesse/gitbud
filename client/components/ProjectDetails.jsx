import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import {Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import UserList from './UserList';

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper style={ {width: '95%', margin: 'auto', marginTop: 12, padding: 12 } }>
        <Card style={ { marginBottom: 12 } }>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="Project Name (with description)" />
            </ToolbarGroup>
            <ToolbarGroup lastChild={ true }>
              <RaisedButton secondary={ true } label="See on GitHub"/>
            </ToolbarGroup>
          </Toolbar>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </CardText>
        </Card>
        <Paper>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="Interested in Project Name?" />
            </ToolbarGroup>
            <ToolbarGroup lastChild={ true }>
              <RaisedButton primary={ true } label="I like this project!"/>
            </ToolbarGroup>
          </Toolbar>
          <UserList {...this.props}/>
        </Paper>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(ProjectDetails);
