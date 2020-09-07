import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <ErrorStyled>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </ErrorStyled>
      );
    }

    return this.props.children;
  }
}

const ErrorStyled = styled.div`

`

ErrorBoundary.propTypes = {
  children: PropTypes.object
}