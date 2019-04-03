import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.div`
  background: ${colors.white};
  position: fixed;
  z-index: 999998;
  overflow: scroll;
  width: 350px;
  left: 20px;
  top: 20px;
  bottom: 20px;
  padding: 20px;

  @media (max-width: 600px) {
    top: 10px
    left: 10px;
    right: 10px;
    bottom: unset;
    width: auto;
    max-height: 32%;
  }
`;

export const Empty = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const Dev = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${colors.borders};
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

export const Infos = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 10px;
`;

export const Name = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.textColor};
`;

export const User = styled.span`
  font-size: 14px;
  color: ${colors.textColor};
`;

const Button = styled.button`
  background: transparent;
  border: 0;
  margin: 0 5px;

  svg {
    font-size: 18px;
    cursor: pointer;
  }
`;

export const Remove = styled(Button)`
  svg {
    color: ${colors.error};
  }
`;

export const GoTo = styled(Button)`
  svg {
    color: ${colors.background};
  }
`;
