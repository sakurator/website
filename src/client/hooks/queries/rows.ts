import { APIRow } from "@server/routes/api/rows.js";
import { useQuery } from "@tanstack/react-query";

export function useRowsQuery() {
    const {
        data: rows,
        isPending,
        error,
    } = useQuery<APIRow[]>({
        queryKey: ['rows'],
        queryFn: () => fetch('/api/rows').then(r => r.json()),
    });

    return { rows, isPending, error } as const;
}
