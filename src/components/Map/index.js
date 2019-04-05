import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import { MAPBOX_API_ACCESS_TOKEN } from '../../config';
import { Creators as NewDevFormActions } from '../../store/ducks/newDevForm';
import { Loader, Avatar } from './styles';

class Map extends Component {
  static propTypes = {
    moveMapToCordinates: PropTypes.shape({
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      timestamp: PropTypes.number,
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
    showNewDevForm: PropTypes.func.isRequired,
  };

  state = {
    mapLoading: true,
    requestingUserLocation: true,
    viewport: {
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      longitude: 0,
      latitude: 0,
      zoom: 1.5,
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.requestUserLocation();
  }

  shouldComponentUpdate(nextProps) {
    const { moveMapToCordinates: prevCordinates } = this.props;
    const { moveMapToCordinates: nextCordinates } = nextProps;

    if (prevCordinates.timestamp !== nextCordinates.timestamp) {
      this.goToViewport(nextCordinates);
    }

    return true;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => this.onViewportChange({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  requestUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.goToViewport({
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

  goToViewport = ({ longitude, latitude }) => {
    this.onViewportChange({
      transitionDuration: 3000,
      longitude,
      latitude,
      zoom: 11,
    });
  };

  onViewportChange = (newViewport) => {
    const { viewport } = this.state;
    this.setState({ viewport: { ...viewport, ...newViewport } });
  };

  onMapClick = (event) => {
    const [longitude, latitude] = event.lngLat;
    const { showNewDevForm } = this.props;
    showNewDevForm({ longitude, latitude });
  };

  render() {
    const { devs } = this.props;
    const { mapLoading, requestingUserLocation, viewport } = this.state;

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
          onViewportChange={this.onViewportChange}
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
  moveMapToCordinates: state.map.moveMapToCordinates,
  devs: state.devs.data,
});

const mapDispatchToProps = dispatch => bindActionCreators(NewDevFormActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
