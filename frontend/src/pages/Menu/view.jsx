import "@/styles/style.css";
import "./style.css"
import {Component} from "react";
import {createNavigationHandler, routes} from "@/Router";

import ShareBlock from "@/components/ShareBlock";
import LocalStorageService from "@/services/LocalStorageService";

class MenuPage extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSaveNick = this.handleSaveNick.bind(this);

        //preload nick from local storage
        const userInfo = LocalStorageService.getUserInfo()

        this.state = {
            nick: ""
        };

        this.navigateToMain = createNavigationHandler(
            props.history,
            routes.mainPage
        );
        this.navigateToLeaderboard = createNavigationHandler(
            props.history,
            routes.leaderboardPage
        );
    }

    handleChange(event) {
        this.setState({nick: event.target.value});
    }

    handleSaveNick() {
        const nick = this.state.nick
        if (!nick || nick.length === 0) {
            return;
        }
        LocalStorageService.saveUserInfo({
            nick: nick
        });
    }

    render() {
        return (
            <div className="main-template">
                <div className="menu-block">
                    <div className="logo-container">
                        <h1 className="logo-title">STEAM</h1>
                        <h1 className="logo-title">SCREENSHOT</h1>
                        <h1 className="logo-title">GUESSING</h1>
                        <h1 className="logo-title">GAME</h1>
                    </div>
                    <div className="text-block">
                        <div className="nick-form">
                            <input
                                placeholder="Your nickname"
                                className="nick-input"
                                type="text"
                                maxLength="24"
                                value={this.state.nick}
                                onChange={this.handleChange}/>
                            <button
                                onClick={this.handleSaveNick}
                                className="save-nick-button primary-button"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <div>
                        <button className="play-again-button glow-on-hover" onClick={this.navigateToMain}>
                            Play
                        </button>
                    </div>
                    <div className="leader-board-block">
                        <button className="primary-button" onClick={this.navigateToLeaderboard}>
                            Leaderboard
                        </button>
                    </div>
                    <ShareBlock/>
                </div>
            </div>
        );
    }
}

export default MenuPage;
