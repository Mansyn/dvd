import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';
/**
 * Pipe to transform a string to a date
 */
@Pipe({name: 'stringToDate', standalone: true})
export class StringToDatePipe implements PipeTransform {
    /**
     * Constructor
     */
    constructor() {
    }
    /**
     * Transform a date that is passed as string into a date
     * @param value The date passed as string
     * @returns {String} The Date object
     */
    transform(value: string): String {
        return format(parseISO(value), 'yyyy-MM-dd HH:mm:ss');
    }
}