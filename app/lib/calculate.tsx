// generates random transaction id for firestore
export function generateTransactionId(): string {
    return  Math.random().toString(36).slice(2, 6);
}