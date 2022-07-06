import React from "react";
import {connect} from "react-redux";
import Sound from "react-sound";
import {playStopBeep, playStopBeepError} from "../../actions";

function SoundFeedback({ beep, beepError, playStopBeep, playStopBeepError }) {
    return (
        <>
            <Sound
                url="beep.mp3"
                playStatus={beep}
                onFinishedPlaying={() => playStopBeep('STOPPED')}
                playFromPosition={0}
            />
            <Sound
                url="error.mp3"
                playStatus={beepError}
                onFinishedPlaying={() => playStopBeepError('STOPPED')}
                playFromPosition={0}
            />
        </>
    );
}

export default connect(state => state, { playStopBeep, playStopBeepError })(SoundFeedback);