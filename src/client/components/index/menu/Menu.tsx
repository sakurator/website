import { WithChildren } from "../../../types/with-children.js"
import "@sass/components/index/menu/Menu.sass";

type Props = WithChildren<{
    //
}>;


export default function Menu({ children }: Props) {
    return (
        <div id="content-container">
            {children}
        </div>
    )
}
