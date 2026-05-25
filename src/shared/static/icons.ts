import getStaticPath from "./static.js";

export default function getIconPath(name: string) {
    return getStaticPath(`images/icons/${name}.svg`);
}
