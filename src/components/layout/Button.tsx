import styled from 'styled-components'

export const StyledButton = styled.button`
  text-transform: uppercase;
  font-weight: 600;

  font-size: ${p => p.theme.text.size.md};
  padding: 12px 18px;

  background: ${p => p.theme.bg.brand};
  color: ${p => p.theme.text.color.inverted};

  border: none;
  border-radius: ${p => p.theme.border.radii};
`
