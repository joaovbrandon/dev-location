import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Creators as DevsActions } from '../../store/ducks/devs';
import { Creators as NewDevFormActions } from '../../store/ducks/newDevForm';
import { Container } from './styles';

class AddNewDev extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    cordinates: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number,
    }).isRequired,
    requesting: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    hideNewDevForm: PropTypes.func.isRequired,
    addDevRequest: PropTypes.func.isRequired,
  };

  state = {
    githubUser: '',
  };

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (prevProps.visible && !visible) this.cleanInput();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  cleanInput = () => {
    setTimeout(() => {
      this.setState({ githubUser: '' });
    }, 800);
  };

  onCancelClick = (event) => {
    event.preventDefault();
    const { requesting, hideNewDevForm } = this.props;

    if (requesting) return;

    hideNewDevForm();
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { cordinates, requesting, addDevRequest } = this.props;
    const { githubUser } = this.state;

    if (requesting) return;

    addDevRequest(githubUser, cordinates);
  };

  render() {
    const { visible, requesting, error } = this.props;
    const { githubUser } = this.state;

    return (
      <Container visible={visible} loading={requesting} error={error}>
        <form onSubmit={this.onSubmit}>
          <span>Add New Dev</span>

          <input
            type="text"
            placeholder="GitHub user"
            value={githubUser}
            onChange={event => this.setState({ githubUser: event.target.value })}
          />

          <button type="button" onClick={this.onCancelClick} disabled={requesting}>
            Cancel
          </button>

          <button type="submit">
            {requesting ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Save'}
          </button>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.newDevForm.visible,
  cordinates: state.newDevForm.cordinates,
  requesting: state.devs.requesting,
  error: state.devs.error,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...DevsActions,
    ...NewDevFormActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddNewDev);
