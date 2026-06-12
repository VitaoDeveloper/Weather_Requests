export const CounterButton = (label: string, fun: void) => {
    return <button type="button" className="counter" onClick={fun}>{label}</button>
}