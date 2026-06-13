import { TypeConvert } from "../modules/TypeConvert";
import type { ModalInput } from "../types/ModalInput";

export class FormatInputType {
    static format(input: ModalInput, v: Record<string, string>) {
        const convert = TypeConvert[input.type]
        const value = v[input.label]
        
        return convert ? convert(value) : value; 
    }
}