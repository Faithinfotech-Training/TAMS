import { Deserializable } from './deserializable';

//export class Resourcemaster implements Deserializable {

export interface Resourcemaster {
       resourceTypeId: number;
       resourceType: string;

    /*
        deserialize(input: any): this {
            return Object.assign(this, input);
            //throw new Error("Method not implemented.");
        }
    */

}
