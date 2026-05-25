import { useRowsQuery } from "@client/hooks/queries/rows.js";
import { APIRow } from "@server/routes/api/rows.js";
import RowCard from "./RowCard.js";
import '@sass/components/index/menu/RowsContainer.sass';
import { TransitionCircleContextProvider } from "@client/contexts/index/transition-circle.js";
import TransitionCircle from "./TransitionCircle.js";


export default function RowsContainer() {
    const { rows } = useRowsQuery();
    return (
        <TransitionCircleContextProvider>
            <div id="rows-container">
                {rows?.map((row: APIRow) => <RowCard row={row} />)}
            </div>
            <TransitionCircle />
        </TransitionCircleContextProvider>
    );
}
