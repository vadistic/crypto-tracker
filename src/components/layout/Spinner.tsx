import styled, { keyframes } from 'styled-components'

const clip = keyframes`
	0% { transform: rotate(0); }
	100% { transform: rotate(360deg); }
`

export const Spinner = styled.div`
  border: 4px solid ${p => p.theme.text.color.brand};
  border-left: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-radius: 100%;

  width: calc(${p => p.theme.spacing.xl} - ${p => p.theme.spacing.sm});
  height: calc(${p => p.theme.spacing.xl} - ${p => p.theme.spacing.sm});

  margin: ${p => p.theme.spacing.sm};

  align-self: center;
  background: transparent !important;
  box-sizing: border-box;
  display: inline-block;

  animation: ${clip} 1s linear infinite;
  animation-fill-mode: both;
`
