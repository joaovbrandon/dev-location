import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.div`
  background: ${colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  height: 100%;
  min-height: 100%;
  width: 100%;
  min-width: 100%;
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.8s;

  form {
    background: ${colors.white};
    width: 300px;
    padding: 20px;
    border-radius: 4px;
    text-align: center;

    span {
      color: ${colors.textColor};
      font-weight: bold;
      font-size: 18px;
    }

    input {
      height: 35px;
      width: 100%;
      margin: 12px 0 8px 0;
      padding: 0 20px;
      font-size: 16px;
      color: ${colors.textColor};
      border-radius: 4px;
      transition: border 0.5s;
      border: ${props => (props.error ? `2px solid ${colors.error}` : `1px solid ${colors.borders}`)};
    }

    button {
      height: 35px;
      width: calc(50% - 5px);
      font-size: 15px;
      border-radius: 4px;
      outline: none;
      border: 0;
      color: ${colors.white};
      font-weight: bold;
      transition: background 0.2s;

      &[type='button'] {
        background: ${colors.btnCancel};
        margin-right: 5px;
        opacity: ${props => (props.loading ? 0.5 : 1)};
        cursor: ${props => (props.loading ? 'not-allowed' : 'pointer')};

        &:hover {
          background: ${colors.btnCancelHover};
        }
      }

      &[type='submit'] {
        background: ${colors.btnSuccess};
        margin-left: 5px;
        cursor: pointer;

        &:hover {
          background: ${colors.btnSuccessHover};
        }
      }
    }
  }
`;
