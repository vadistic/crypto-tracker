import styled from 'styled-components'

import { Theme } from '../../theme'

export interface StyledTextProps {
  size?: keyof Theme['text']['size']
  color?: keyof Theme['text']['color']
  align?: 'left' | 'center'
}

export const StyledText = styled.p<StyledTextProps>`
  color: ${p => p.theme.text.color[p.color ?? 'base']};
  font-size: ${p => p.theme.text.size[p.size ?? 'md']};
  text-align: ${p => p.align || 'inital'};
  margin: 0;
`

export interface StyledHeadingProps {
  size?: keyof Theme['heading']['size']
  color?: keyof Theme['text']['color']
}

export const StyledHeading = styled.h3<StyledHeadingProps>`
  color: ${p => p.theme.text.color[p.color ?? 'base']};
  font-size: ${p => p.theme.heading.size[p.size ?? 'md']};
  margin: 0;
`

export const StyledLink = styled.a`
  color: ${p => p.theme.text.color.brand};
  text-decoration: none;
`
