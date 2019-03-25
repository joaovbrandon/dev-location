import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.white};
  height: 80vh;
  line-height: 1.6;

  h1 {
    font-size: 40px;
    opacity: 0.8;
  }

  h2 {
    opacity: 0.7;
  }

  a {
    color: ${colors.white};
    opacity: 0.6;
  }
`;
