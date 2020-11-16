import styled, { css } from 'styled-components'

import { Theme } from '../../theme'

export interface SvgProps {
  size?: keyof Theme['spacing']
  color?: keyof Theme['semantic']
}

export const Svg = styled.svg.attrs(p => ({
  tabIndex: (p.onClick ? 0 : -1) as number,
}))<SvgProps>(p => {
  const size = p.theme.spacing[p.size ?? 'md']
  const color = p.theme.semantic[p.color ?? 'brand']

  return css`
    width: ${size};
    height: ${size};

    path,
    polygon,
    rect {
      fill: ${color};
    }

    circle {
      stroke: ${color};
      stroke-width: 1;
    }

    ${!!p.onClick &&
    css`
      cursor: pointer;
    `}
  `
})
