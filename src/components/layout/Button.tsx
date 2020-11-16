import styled from 'styled-components'

export interface StyledButtonProps {
  color: 'brand' | 'inverted'
}

export const StyledButton = styled.button`
  text-transform: uppercase;
  font-weight: 600;

  font-size: ${p => p.theme.text.size.md};
  padding: 12px 18px;

  border: none;
  border-radius: ${p => p.theme.border.radii};

  background: ${p => p.theme.bg.brand};
  color: ${p => p.theme.text.color.inverted};
`

export const StyledInvertedEmptyButton = styled.button`
  text-transform: uppercase;
  font-weight: 600;

  font-size: ${p => p.theme.text.size.md};
  padding: 12px 18px;

  border: none;
  border-radius: ${p => p.theme.border.radii};

  background: unset;
  color: ${p => p.theme.text.color.inverted};
`
