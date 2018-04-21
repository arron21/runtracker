import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
@Pipe({name: 'topScore'})
export class TopScorePipe implements PipeTransform {
    transform(value: any, arg1: any, arg2: any): any {

        // console.log('top score')
        // console.log(value)

        let pr;
        _.each(value, (e) => {

            const compareArray = _.map(value, (i) => {
                return i.score;
            });

            if (!this.isNumber(compareArray[0])) {
                // return ''
            }
            // check if value is a timestamp
            if (!this.isNumber(compareArray[0])) {

                console.log('we think its a timestamp');
                console.log(compareArray[0]);
                if (compareArray[0].indexOf(':') > -1) {
                    console.log('this is a time.');
                    const timeArray = compareArray[0].split(/:|\./);
                    console.log(timeArray);
                    console.log(timeArray.length);
                    const minuteMilliseconds = timeArray[0] * 60 * 1000;
                    const secondMilliseconds = timeArray[1] * 1000;
                    const milliseconds = timeArray[2];
                    console.log(minuteMilliseconds, secondMilliseconds, milliseconds);
                    const totalMilliseconds = Number(minuteMilliseconds) + Number(secondMilliseconds) + Number(milliseconds);
                    console.log(totalMilliseconds);

                    // return totalMilliseconds;
                    pr = totalMilliseconds;
                }
                // return ''
            }
            pr = _.reduce(compareArray, function(a, b){ return a > b ? a : b; });  // return 'ac'


            // for (let key in this.eventList) {
            //     console.log(key);
            //
            //     // TODO: finish the funciton to uppdate the athletes PR
            //     this.athlete.pr[key] = pr;
            //
            //
            // }

            // this.athlete = this.db.doc('/team', 'id', '==', Number(this.athleteId))
            // console.log(this.athlete);
            // this.db.collection('/team').doc(this.athleteId).set(athleteObj);

            // for (let [key, value] of Object.entries(this.eventList)) {
            //     console.log(key);
            //     console.log(value);
            // }

            // return pr;

        });
        // console.log('THE PR IS');
        // console.log(pr);
        console.log(pr);
        return pr;

        // return '';
    }

    isNumber(n) {
        // console.log(Date.parse(n));
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
