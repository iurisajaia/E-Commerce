import React, { Component } from 'react';
import { MyContext } from "../../State";
class CreateHoodie extends Component {
    static contextType = MyContext;

    state = {}
    changeBackground = e => {
        var dragContainer = document.getElementById('drag-container');
        var value = e.target.value;
        if (value == 0) {
            dragContainer.style.backgroundImage = "url('/img/grey-hoodie.png')";
        }
        if (value == 1) {
            dragContainer.style.backgroundImage = "url('/img/darkred-hoodie.jpg')";
        }
        if (value == 2) {
            dragContainer.style.backgroundImage = "url('/img/blue-hoodie.jpg')";
        }
        if (value == 3) {
            dragContainer.style.backgroundImage = "url('/img/black-hoodie.jpg')";
        }
    }

    chooseOrder = e => {
        e.preventDefault()
        const data = {
            user: e.target.creatoruser.value,
            hoodie: e.target.chooseHoodie.value,
            logo: e.target.chooseLogo.value
        }
        fetch("/create-custom-hoodie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
            })
            .catch(error => {
                console.error(error);
            });
    }
    render() {
        return (
            <MyContext.Consumer>
                {context => (
                    <>
                        <div className="container">
                            <div className="text-center">
                                <h3 className="section-title">Create Hoodie</h3>
                            </div>
                            <div className="choose-create-box flex">
                                <select id="selectHoodie" onChange={this.changeBackground} className="custom-select">
                                    <option value="0">Grey</option>
                                    <option value="1">DarkRed</option>
                                    <option value="2">Blue</option>
                                    <option value="3">Black</option>
                                </select>
                            </div>
                            <div className="drag-container" id="drag-container">
                                <div id="drag-2" className="draggable">
                                    <img src="/img/cat-logo.png" className="drag-logo" alt="black-cat" />
                                </div>
                                <div id="drag-1" className="draggable">
                                    <img src="/img/monkey-logo.png" className="drag-logo" alt="monkey" />
                                </div>
                                <div id="drag-3" className="draggable">
                                    <img src="/img/code-logo.png" className="drag-logo" alt="code-logo" />
                                </div>
                                <div id="drag-4" className="draggable">
                                    <img src="/img/bayern-logo.png" className="drag-logo" alt="bayern-logo" />
                                </div>
                                <div id="drag-6" className="draggable">
                                    <img src="/img/smiley-logo.png" className="drag-logo" alt="smiley-logo" />
                                </div>
                                <div id="drag-7" className="draggable">
                                    <img src="/img/music-logo.png" className="drag-logo" alt="music-logo" />
                                </div>
                            </div>

                            {context.state.user ? (


                                <div className="mt-3 mb-3">

                                    <form className="order-custom-hoodie" onSubmit={this.chooseOrder}>
                                        <input type="hidden" value={context.state.user._id} id="creatoruser" />
                                        <select name="" id="chooseHoodie" className="custom-select">
                                            <option value="Grey">Grey</option>
                                            <option value="Darkred">Darkred</option>
                                            <option value="Blue">Blue</option>
                                            <option value="Black">Black</option>
                                        </select>
                                        <select name="" id="chooseLogo" className="custom-select ml-3">
                                            <option value="Black Cat & White Cat">Black Cat & White Cat</option>
                                            <option value="Arctic monkey">Arctic monkey</option>
                                            <option value="Code">Code</option>
                                            <option value="Bayern">Bayern</option>
                                            <option value="Smiley">Smiley</option>
                                            <option value="Music">Music</option>
                                        </select>
                                        <button className="btn btn-success ml-3">Order</button>
                                    </form>
                                </div>
                            ) : null}
                        </div>

                    </>
                )}
            </MyContext.Consumer>
        );
    }
}

export default CreateHoodie;