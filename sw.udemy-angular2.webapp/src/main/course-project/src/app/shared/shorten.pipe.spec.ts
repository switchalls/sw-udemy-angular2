import { ShortenPipe } from './shorten.pipe'

describe('ShortenPipe', () => {
    it('should shorten string', () => {
        let testSubject = new ShortenPipe();
        expect(testSubject.transform('Hello', 1)).toBe('H...');
    });

    it('should not shorten string', () => {
        let testSubject = new ShortenPipe();
        expect(testSubject.transform('Hello', 6)).toBe('Hello');
    });
})