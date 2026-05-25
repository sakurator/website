import { APILetter } from "@server/routes/api/letters.js";
import { APIRow } from "@server/routes/api/rows.js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

type LettersQueryData = {
    row: APIRow,
    letters: APILetter[],
}

export function useLettersQuery() {
    const { alphabet, slug } = useParams();

    const {
        data,
        isPending,
        error,
    } = useQuery<LettersQueryData>({
        queryKey: ['letters'],
        queryFn: () => fetch(`/api/row/${alphabet}/${slug}`).then(r => r.json()),
    });

    return {
        row: data?.row,
        letters: data?.letters,
        isPending,
        error
    } as const;
}
