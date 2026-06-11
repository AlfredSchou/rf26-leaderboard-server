import { createHmac } from 'crypto';
const secret = process.env.HMAC_SECRET!;

export function signScore(score: number): string {
    const hmac = createHmac('sha256', secret);
    hmac.update(score.toString());
    return hmac.digest('hex');
}

export function verifyScore(score: number, signature: string, nonce: string): boolean {
    const hmac = createHmac('sha256', secret);
    hmac.update(`${score}:${nonce}`);
    const expectedSignature = hmac.digest('hex');
    return expectedSignature === signature;
}