import Dexie from 'dexie';

export const db = new Dexie('barcodes');

db.version(1).stores({
    barcodes: '++barcode, product, variation, size',
    selectedSeasons: '++season'
});