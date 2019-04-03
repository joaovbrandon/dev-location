import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';
import { colors } from '../../styles';

export const Loader = styled.div`
  background: ${colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 999999;
  top: 0;
  left: 0;
  height: 100%;
  min-height: 100%;
  width: 100%;
  min-width: 100%;
  pointer-events: ${({ mapLoading, requestingUserLocation }) => (mapLoading || requestingUserLocation ? 'all' : 'none')};
  opacity: ${({ mapLoading, requestingUserLocation }) => {
    if (mapLoading) return 1;
    if (requestingUserLocation) return 0.8;
    return 0;
  }};
  transition: opacity 1s;

  .pulse {
    display: inline-block;
    position: relative;
    width: 128px;
    height: 128px;
  }

  .pulse span {
    position: absolute;
    border: 4px solid ${colors.white};
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  .pulse span:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes lds-ripple {
    0% {
      top: 56px;
      left: 56px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 116px;
      height: 116px;
      opacity: 0;
    }
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  border: 3px solid ${colors.background};

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
`;
