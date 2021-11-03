import React from "react";

import { connect } from "react-redux";
import { signIn, signOut } from "../actions/index";

class GoogleAuth extends React.Component {
    // state = {
    //     isSignedIn: null,
    // };

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "570988313163-nus9mr091pul49klhnph9kkuuvbn19au.apps.googleusercontent.com",
                    scope: "email",
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                    this.onAuthChange(this.auth.isSignedIn.get());

                    this.auth.isSignedIn.listen(this.onAuthChange.bind(this));
                });
        });
    }

    onAuthChange(isSignedIn) {
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        if (isSignedIn) {
            // this.props.signIn();
            this.props.signIn(this.auth.currentUser.get().getId());
        } else this.props.signOut();
    }

    onSignInClick() {
        this.auth.signIn();
    }

    onSignOutClick() {
        this.auth.signOut();
    }

    renderAuthButton() {
        // if (this.state.isSignedIn === null) {
        if (this.props.isSignedIn === null) {
            return null;
            // } else if (this.state.isSignedIn) {
        } else if (this.props.isSignedIn) {
            return (
                <button
                    className="ui blue google button"
                    onClick={this.onSignOutClick.bind(this)}
                >
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    className="ui red google button"
                    onClick={this.onSignInClick.bind(this)}
                >
                    <i className="google icon"></i>
                    Sign in with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

/* 
    in browser console
    > gapi
    > gapi.load
    > gapi.load("client:auth2")
    > gapi
    > gapi.client.init({clientId: "clientId"})
    > window.gapi.auth2.getAuthInstance()
    > window.gapi.auth2.getAuthInstance().signIn()
    > window.gapi.auth2.getAuthInstance().signOut()
    > window.gapi.auth2.getAuthInstance().isSignedIn.get()
    > window.gapi.auth2.getAuthInstance().currentUser
    > window.gapi.auth2.getAuthInstance().currentUser.get().getId()
*/

// Client-ID
// 570988313163-nus9mr091pul49klhnph9kkuuvbn19au.apps.googleusercontent.com

// Client-Secret
// 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
