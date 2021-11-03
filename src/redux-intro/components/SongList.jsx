import React from "react";

import { connect } from "react-redux";
import { selectSong } from "../actions";

class SongList extends React.Component {
    renderList() {
        return this.props.songs.map((song, index) => {
            return (
                <div className="item" key={index}>
                    <div className="right floated content">
                        <button
                            className="ui button primary"
                            onClick={this.props.selectSong.bind(this, song)}
                        >
                            Select
                        </button>
                    </div>
                    <div className="content">{song.title}</div>
                </div>
            );
        });
    }

    render() {
        // console.log("Props: ", this.props);
        return <div className="ui divided list">{this.renderList()}</div>;
    }
}

const mapStateToProps = (state) => {
    // console.log(state);

    return { songs: state.songs };
    // now this.props === {songs: state.songs}
};

// export default SongList;
export default connect(mapStateToProps, { selectSong })(SongList);
