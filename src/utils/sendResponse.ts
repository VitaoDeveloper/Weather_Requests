export class SendResponse {
    private static genSerial(result: 'SUCCESS' | 'ERROR'): string {
        const serial = `${result}-` + crypto.randomUUID()
            .replace(/-/g, "")
            .slice(0, 5)
            .toUpperCase();
        
        return serial;
    }

    static send(result:'SUCCESS' | 'ERROR', value: string): void {
        localStorage.setItem(this.genSerial(result), value);
    }
}