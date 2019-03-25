import React, { Component, Fragment } from 'react';
import MapGL, { FlyToInterpolator } from 'react-map-gl';
import { MAPBOX_API_ACCESS_TOKEN } from '../../config';
import { Loader } from './styles';

class Map extends Component {
  state = {
    mapLoading: true,
    requestingUserLocation: true,
    viewport: {
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000,
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: 0,
      longitude: 0,
      zoom: 1.5,
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.requestUserLocation();
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
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        this.setState({ requestingUserLocation: false });
      },
      () => {
        this.setState({ requestingUserLocation: false });
      },
    );
  };

  goToViewport = ({ latitude, longitude }) => {
    this.onViewportChange({
      longitude,
      latitude,
      zoom: 12,
    });
  };

  onViewportChange = (newViewport) => {
    const { viewport } = this.state;
    this.setState({ viewport: { ...viewport, ...newViewport } });
  };

  onMapLoad = () => {
    this.setState({ mapLoading: false });
  };

  handleMapClick = (event) => {
    const [latitude, longitude] = event.lngLat;
    // eslint-disable-next-line no-console
    console.log(`Latitude: ${latitude} \nLongitude: ${longitude}`);
  };

  render() {
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
          onLoad={this.onMapLoad}
          onClick={this.handleMapClick}
          onViewportChange={this.onViewportChange}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={MAPBOX_API_ACCESS_TOKEN}
        />
      </Fragment>
    );
  }
}

export default Map;
