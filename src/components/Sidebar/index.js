import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCompass } from '@fortawesome/free-solid-svg-icons';
import { Creators as DevsActions } from '../../store/ducks/devs';
import { Creators as MapActions } from '../../store/ducks/map';
import {
  Container, Empty, Dev, Avatar, Infos, Name, User, Remove, GoTo,
} from './styles';

const Sidebar = ({ devs, removeDev, moveMapTo }) => (
  <Container>
    {!devs.length && (
      <Empty>There are no registered developers yet! Click in the map to add new devs.</Empty>
    )}
    {devs.map(dev => (
      <Dev key={dev.id}>
        <Avatar src={dev.avatar_url} alt={dev.name} />
        <Infos href={dev.html_url} target="_blank">
          <Name>{dev.name}</Name>
          <User>{dev.login}</User>
        </Infos>
        <Remove type="button" onClick={() => removeDev(dev)}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </Remove>
        <GoTo type="button" onClick={() => moveMapTo(dev.cordinates)}>
          <FontAwesomeIcon icon={faCompass} />
        </GoTo>
      </Dev>
    ))}
  </Container>
);

Sidebar.propTypes = {
  devs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired,
      cordinates: PropTypes.shape({
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  removeDev: PropTypes.func.isRequired,
  moveMapTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  devs: state.devs.data,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...DevsActions,
    ...MapActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
