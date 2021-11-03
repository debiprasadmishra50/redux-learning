import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchStreams } from "./../../actions";

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    // Edit and Delete Buttons
    renderAdminButtons(stream) {
        if (this.props.currentUser && stream.userId === this.props.currentUser)
            return (
                <div className="right floated content">
                    <Link
                        to={`/streams/edit/${stream.id}`}
                        className="ui button grey"
                    >
                        EDIT
                    </Link>
                    <Link
                        to={`/streams/delete/${stream.id}`}
                        className="ui button negative"
                    >
                        DELETE
                    </Link>
                </div>
            );
    }

    renderList() {
        return this.props.streams.map((stream) => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdminButtons(stream)}
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }

    renderCreateStreamButtton() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link to="/streams/new" className="ui button positive">
                        Create Stream
                    </Link>
                </div>
            );
        } else {
            return (
                <div style={{ textAlign: "right" }}>
                    <p className="ui button positive">
                        Login in to Create a Stream
                    </p>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreateStreamButtton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUser: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
