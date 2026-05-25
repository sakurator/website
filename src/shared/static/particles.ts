import getStaticPath from "./static.js";

export default function getParticlePath(name: string, variation: number = 1) {
    return getStaticPath(`images/particles/${name}_${variation}.svg`);
}
