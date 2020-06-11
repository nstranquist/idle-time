import styled from 'styled-components'


export const FormItemStyled = styled.p`
  &.form-item {
    margin-top: 0;
    margin-bottom: 0 !important;
  }
  &.form-item:not(:first-child) {
    margin-top: .6666em;
  }

  .form-input {
    color: #363636;
    line-height: 1.125;
    font-family: montserrat, sans-serif;
    font-style: normal;
    display: block;
    width: 100%;

    &.input-error {
      border-color: rgba(255,0,0,.82); // or use bulmaColors.danger

    }
    &.form-h3 {
      font-size: 1.5rem !important;
      font-weight: 600;
    }
    &.form-p {
      font-size: 1rem !important;
      font-weight: 400;
    }
  }
  &.form-p {

    input {
      font-size: 20px;
      line-height: 24px;
      color: #000;
      font-weight: normal;
    }
  }
`