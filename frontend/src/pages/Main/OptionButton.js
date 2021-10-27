import { Component } from "react";
import Button from "react-bootstrap/Button";

class OptionButton extends Component {
    constructor(props) {
        super(props)
        console.log("Props ", props)
        this.state = {
            btnClass: "base",
        }
        this.blinkInterval = null
    }

    componentDidMount() {
        this.updateBlink({}, this.props)
    }

    componentDidUpdate(prevProps) {
        this.updateBlink(prevProps, this.props)
    }

    updateBlink = (prevProps, props) => {
        const { blink: prevBlink } = prevProps;
        const { blink, btnClass } = this.props;
        console.log(btnClass, blink)
        if (!prevBlink && blink) {
            // create blinking interval
            if (props.answer.correct) {
                this.blinkInterval = setInterval(() => {
                    this.setState({ btnClass: this.state.btnClass ? null : btnClass })
                }, 300)
            }
        } else if (prevBlink && !blink) {
            // remove blinking interval
            clearInterval(this.blinkInterval)
        }
    }

    render() {
        const { answer } = this.props;
        const { btnClass } = this.state;
        return (
            <Button
                className={"option-btn " + btnClass}
            >
                {answer.appName}
            </Button>
        )
    }
}

export default OptionButton;