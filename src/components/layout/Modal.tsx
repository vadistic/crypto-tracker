import React from 'react'
import styled from 'styled-components'

import { IconClose, IconProps } from '../icons/Icon'

export const StyledModal = styled.div`
  z-index: 999;
  position: fixed;

  left: 24px;
  right: 24px;

  top: 128px;
  bottom: 128px;

  min-height: 400px;
  padding: 24px;

  @media (min-width: ${p => p.theme.breakpoints.md}) {
    position: absolute;

    min-width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${p => p.theme.bg.white};

  border: none;
  border-radius: ${p => p.theme.border.radii};

  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.2);
`

export const StyledCloseBox = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  line-height: 0;
`

export interface ModalProps {
  actions?: React.ReactNode
  onClose?: () => void
  closeIcon?: React.FC<IconProps>
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose: handleClose,
  closeIcon: Icon = IconClose,
}) => {
  return (
    <StyledModal>
      <StyledCloseBox>
        <Icon className="icon" size="lg" onClick={handleClose} />
      </StyledCloseBox>
      {children}
    </StyledModal>
  )
}
