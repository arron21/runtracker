import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
@Pipe({name: 'topScore'})
export class TopScorePipe implements PipeTransform {
    transform(value: any, arg1: any, arg2: any): any {

        console.log('top score')
        console.log(value)

        let pr;
        _.each(value, (e) => {

            const compareArray = _.map(value, (i) => {
                return i.score;
            });
            // check if value is a timestamp
            if (!this.isNumber(compareArray[0])) {
                if (compareArray[0].indexOf(':') > -1) {
                    console.log('this is a time.');
                    const timeArray = compareArray[0].split(/:|\./);
                    const minuteMilliseconds = timeArray[0] * 60 * 1000;
                    const secondMilliseconds = timeArray[1] * 1000;
                    const milliseconds = timeArray[2];
                    const totalMilliseconds = Number(minuteMilliseconds) + Number(secondMilliseconds) + Number(milliseconds);
                    pr = totalMilliseconds;
                }
            }
            pr = _.reduce(compareArray, function(a, b){ return a > b ? a : b; });  // return 'ac'
        });

        console.log(pr);
        return pr;
    }

    isNumber(n) {
        // console.log(Date.parse(n));
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
