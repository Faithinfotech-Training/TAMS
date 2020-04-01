import { Resourcedetails } from './shared/resourcedetails';

export class Bookingdetails {
    bookingId: number;
    resourceDetails: Resourcedetails;
    custName: string;
    custAddress: string;
    phoneNumber: string;
    email: string;
    startDate: Date;
    endDate: Date;
    purpose: string;
    bookingStatus: string;
    pending: string;
}
