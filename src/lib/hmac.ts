import { createHmac } from 'crypto';
const secret = process.env.HMAC_SECRET!;

export function signScore(score: number): string {
    const hmac = createHmac('sha256', secret);
    hmac.update(score.toString());
    return hmac.digest('hex');
}

export function verifyScore(score: number, signature: string): boolean {
    const hmac = createHmac('sha256', secret);
    hmac.update(score.toString());
    const expectedSignature = hmac.digest('hex');
    return expectedSignature === signature;
}