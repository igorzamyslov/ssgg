import "./style.css";

import { Component } from "react";
import MainTemplate from "templates/MainTemplate";
import ShareBlock from "components/ShareBlock";

class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 10,
      shownGames: [],
    };
  }

  render() {
    return (
      <MainTemplate>
        <div className="score-block">
          <h2>Your score:</h2>
          <h1>{this.state.score}</h1>
          <button className="play-again-button glow-on-hover">
            Play again
          </button>
          <div>
            <ShareBlock/>            
          </div>
          <div className="flex-container-result">
            <h2>Your games:</h2>
            <ul>
              {this.state.shownGames.map(({ appName, url }) => (
                <a href={url} target="_blank" rel="noreferrer">
                  <li className="shown-game">{appName}</li>
                </a>
              ))}
              <a href={"/"} target="_blank" rel="noreferrer">
                <li className="shown-game">Factorio</li>
              </a>
              <a href={"/"} target="_blank" rel="noreferrer">
                <li className="shown-game">Original Sin 2</li>
              </a>
            </ul>
          </div>
        </div>
      </MainTemplate>
    );
  }
}

export default ResultPage;
