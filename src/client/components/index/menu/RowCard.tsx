import useAlphabetQueryState from "@client/hooks/query-states/alphabet.js";
import { APIRow } from "@server/routes/api/rows.js";
import '@sass/components/index/menu/RowCard.sass'
import useProgress from "@client/hooks/sakurator/progress.js";
import getParticlePath from "@shared/static/particles.js";
import clsx from "clsx";
import { play } from "@client/support/play.js";
import { useTransitonCircleContext } from "@client/contexts/index/transition-circle.js";
import sleep from "@shared/support/promises/sleep.js";
import { useNavigate } from "react-router";
import { getRowThumbnailImagePath } from "@shared/static/letters.js";

type Props = {
    row: APIRow;
};

export default function RowCard({ row }: Props) {
    const { alphabet, particle } = useAlphabetQueryState();
    const { points } = useProgress(alphabet, row);
    const { transitAt } = useTransitonCircleContext();
    const navigate = useNavigate();

    const startLesson = async (event: React.MouseEvent<HTMLDivElement>) => {
        play("click");
        transitAt(event.clientX, event.clientY);
        await sleep(2000);
        await navigate(`/learn/${alphabet}/${row.slug}`);
    };

    const onMouseEnter = () => play('hover');

    return (
        <div
            key={row.letter}
            className={`row-card ${alphabet.toLowerCase()}`}
            id={`row-${row.letter}`}
            onMouseEnter={onMouseEnter}
            onClick={startLesson}
        >
            <div className="row-title-container">
                <img
                    className="row-completed-icon"
                    src="/images/icons/completed.svg"
                />
                <span className="row-title">{row.name}</span>
            </div>

            <img
                className="row-kana"
                src={getRowThumbnailImagePath(alphabet, row)}
            />

            <div className="row-progress">
                <div className="row-progress-full">
                    <div
                        className={clsx("row-progress-completed", alphabet)}
                        style={{ width: `${points / row.petalsToComplete * 100}%` }}
                    />
                </div>
            </div>

            <div className="row-description">
                <span
                    className="row-subtitle"
                >
                    <span>{points} / {row.petalsToComplete}</span>
                    <img src={getParticlePath(particle)} />
                </span>
            </div>
        </div>

    );
}
