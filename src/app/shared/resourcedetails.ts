import { Resourcemaster } from './resourcemaster';
import { Deserializable } from './deserializable';

//export class Resourcedetails implements Deserializable  {
    
export class Resourcedetails {
    
    resourceId: number;
    resource: Resourcemaster;
    //resourceTypeId: number;
    // resourceType: string;
    resourceCapacity: number;
    noOfSystems: number;
    projector: string;
    whiteBoard: string;
    picturePath: string;
    resourceRate: number;
    typeOfUse: string;
    isAccepted: string;
    isBooked: string;
    isActive: string;

    /*
        deserialize(input: any): this {
            Object.assign(this, input);
            this.resource = input.resource.map(res => new Resourcemaster().deserialize(res));
            return this;
            //throw new Error("Method not implemented.");
        }
    */
}
