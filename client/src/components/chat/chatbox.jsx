import React, { Component } from 'react';
class Chatbox extends Component {
    state = {}
    render() {
        return (
            <>
                <div className="container">
                    <div className="jumbotron">
                        <h1 className="display-4">Send Message</h1>
                    </div>
                    <input id="chatname" className="form-control" placeholder="name" />
                    <input id="chatmessage" className="form-control" />
                    <button className="btn btn succes" id="send">Send</button>
                    <div id="chatmessages"></div>
                </div>

            </>
        );
    }
}

export default Chatbox;