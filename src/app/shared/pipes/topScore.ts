import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

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
            console.log('checking type of value is NUMB')
            console.log(compareArray[0]);
            console.log(this.isNumber(compareArray[0]));

            if (!this.isNumber(compareArray[0])) {
                return ''
            }
            // check if value is a timestamp
            if (!this.isNumber(compareArray[0])) {
                return ''
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
        console.log('THE PR IS');
        console.log(pr);
        return pr;

        // return '';
    }

    isNumber(n) {
        console.log(Date.parse(n));
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
