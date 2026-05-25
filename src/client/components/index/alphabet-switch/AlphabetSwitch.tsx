import useAlphabetQueryState from "@client/hooks/query-states/alphabet.js"
import { play } from "@client/support/play.js";
import "@sass/components/index/alphabet-switch/AlphabetSwitch.sass"
import clsx from 'clsx';
import { useEffect } from "react";


export default function AlphabetSwitch() {
    const { alphabet, switchAlphabet } = useAlphabetQueryState();

    useEffect(() => {
        play(`alphabet_switch_${alphabet}`);
    }, [alphabet]);

    return (
        <div id="alphabet-switch-container">
            <div id="alphabet-switch-panel" className={clsx(alphabet)} onClick={switchAlphabet}>
                <span
                    className={clsx('alphabet-switch-title', alphabet === 'hiragana' && 'enabled')}
                    id="hiragana-alphabet-switch-title"
                >
                    Hiragana
                </span>

                <div id="alphabet-switch">
                    <input type="checkbox" id="alphabet-switch-checkbox" checked={alphabet === 'katakana'} />
                    <span id="alphabet-switch-slider"></span>
                </div>

                <span
                    className={clsx('alphabet-switch-title', alphabet === 'katakana' && 'enabled')}
                    id="katakana-alphabet-switch-title"
                >
                    Katakana
                </span>
            </div>
        </div>
    )
}
