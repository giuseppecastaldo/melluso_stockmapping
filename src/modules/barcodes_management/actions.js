import {getBarcodes, getSeasons} from "./api";
import {db} from "../../db";

export default function () {
    return {
        downloadBarcodes: (seasons) => getBarcodes(seasons),
        getSelection: () => db.selectedSeasons.toArray(),
        setSelection: (payload) => payload,
        getSeasons: () => getSeasons()
    }
}