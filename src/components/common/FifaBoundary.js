import React from 'react';

class FifaBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch( error, errorInfo ) {
        console.warn("ERROR CAUGHT", error );
        console.warn("ERROR INFO", errorInfo );
    }

    static getDerivedStateFromError( error ) {
        return {
            hasError: true
        }
    }

    render() {
        if ( this.state.hasError ) {
            return (
                <h3>FIFA WC Stats: Boundary broken!</h3>
            )
        }

        return this.props.children;
    }
}

export default FifaBoundary;
