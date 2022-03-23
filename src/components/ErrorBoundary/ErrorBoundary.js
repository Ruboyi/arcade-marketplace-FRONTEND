import React from 'react';
// import ErrorImg from '../../assets/error-app.png';
import ErrorImg from '../../assets/gameover.png';
import './ErroBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('ERROR: ', error, errorInfo);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-Boundary'>
          <h1 className='error-Boundary-title'>Algo ha ido Mal .</h1>
          <img className='img-Boundary' src={ErrorImg} alt='img-error' />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
