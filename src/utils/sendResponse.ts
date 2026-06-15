export function sendResponse(item: string, serial: string): void {
    localStorage.setItem(item, serial)
}