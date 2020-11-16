import styled from 'styled-components'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 400px;

  & > * {
    flex: 1 1 auto;

    margin: 16px;
  }
`

export const StyledFormRow = styled.div``

export const StyledFormLabel = styled.label`
  color: ${p => p.theme.text.color.base};
  font-size: ${p => p.theme.text.size.lg};
  display: block;
  margin: 0;
  margin-bottom: 8px;
`

export const StyledFormError = styled.p`
  color: ${p => p.theme.semantic.error};
  font-size: ${p => p.theme.text.size.lg};
  margin: 0;
  margin-top: 8px;
`
