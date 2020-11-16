import React from 'react'
import styled from 'styled-components'

import { IconClose, IconProps } from '../icons/Icon'

export const CardWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: ${p => p.theme.spacing.md};

  background-color: ${p => p.theme.bg.white};

  border: none;
  border-radius: ${p => p.theme.border.radii};

  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.15);
`

export const CardTop = styled.div`
  flex: 0 1 auto;
  min-height: ${p => p.theme.spacing.lg};

  text-transform: capitalize;
  font-weight: 600;
`

export const CardBody = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: ${p => p.theme.spacing.md} 0;
`

export const CardBottom = styled.div`
  flex: 0 1 auto;
  min-height: ${p => p.theme.spacing.lg};
`

export const CardAction = styled.div`
  position: absolute;
  right: ${p => p.theme.spacing.sm};
  top: ${p => p.theme.spacing.md};
  line-height: 0;

  cursor: pointer;
`

export interface CardProps {
  top?: React.ReactNode
  bottom?: React.ReactNode
  onClose?: () => void
  closeIcon?: React.FC<IconProps>
}

export const Card: React.FC<CardProps> = ({
  top,
  children,
  bottom,
  onClose: handleClick,
  closeIcon: Icon = IconClose,
}) => {
  return (
    <CardWrapper>
      {handleClick && Icon && (
        <CardAction>
          <Icon onClick={handleClick} size="lg" />
        </CardAction>
      )}
      <CardTop>{top}</CardTop>
      <CardBody>{children}</CardBody>
      <CardBottom>{bottom}</CardBottom>
    </CardWrapper>
  )
}
