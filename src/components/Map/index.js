import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapGL, { Marker } from 'react-map-gl';
import { MAPBOX_API_ACCESS_TOKEN } from '../../config';
import { Creators as MapActions } from '../../store/ducks/map';
import { Creators as NewDevFormActions } from '../../store/ducks/newDevForm';
import { Loader, Avatar } from './styles';

class Map extends Component {
  static propTypes = {
    viewport: PropTypes.shape({
      transitionInterpolator: PropTypes.object.isRequired,
      transitionDuration: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
    }).isRequired,
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
    moveMapTo: PropTypes.func.isRequired,
    mapViewportChange: PropTypes.func.isRequired,
    showNewDevForm: PropTypes.func.isRequired,
  };

  state = {
    mapLoading: true,
    requestingUserLocation: true,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.requestUserLocation();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { mapViewportChange } = this.props;

    mapViewportChange({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  requestUserLocation = () => {
    const { moveMapTo } = this.props;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        moveMapTo({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });

        this.setState({ requestingUserLocation: false });
      },
      () => {
        this.setState({ requestingUserLocation: false });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  onMapClick = (event) => {
    const [longitude, latitude] = event.lngLat;
    const { showNewDevForm } = this.props;
    showNewDevForm({ longitude, latitude });
  };

  render() {
    const { viewport, devs, mapViewportChange } = this.props;
    const { mapLoading, requestingUserLocation } = this.state;

    return (
      <Fragment>
        <Loader mapLoading={mapLoading} requestingUserLocation={requestingUserLocation}>
          <div className="pulse">
            <span />
            <span />
          </div>
        </Loader>

        <MapGL
          {...viewport}
          onClick={this.onMapClick}
          onLoad={() => this.setState({ mapLoading: false })}
          onViewportChange={mapViewportChange}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={MAPBOX_API_ACCESS_TOKEN}
          minZoom={1.5}
          dragRotate={false}
          touchRotate={false}
        >
          {devs.map(dev => (
            <Marker
              longitude={dev.cordinates.longitude}
              latitude={dev.cordinates.latitude}
              key={dev.id}
              offsetLeft={-15}
              offsetTop={-20}
            >
              <Avatar alt={dev.name} src={dev.avatar_url} />
            </Marker>
          ))}
        </MapGL>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  viewport: state.map.viewport,
  devs: state.devs.data,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...MapActions,
    ...NewDevFormActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
