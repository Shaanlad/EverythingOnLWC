import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';

const ACCOUNT_FIELDS = [
    'Account.Name',
    'Account.Rating',
    'Account.Industry'
];

export default class AllFeatures extends LightningElement {

    @api
    recordId;

    name = '';
    rating = '';
    industry = '';

    @wire(getRecord, {recordId: "$recordId", fields: ACCOUNT_FIELDS})
    wireAccount({error, data}) {
        if(data) {

            console.log('data >> ', data);
            if(data.fields.Name.value != null) {
                this.name = data.fields.Name.value;
            }
            if(data.fields.Industry.value != null) {
                this.industry = data.fields.Industry.value;
            }
            if(data.fields.Rating.value != null) {
                this.rating = data.fields.Rating.value;
            }

            this.dispatchEvent(
                new ShowToastEvent({
                title: 'Success',
                message : 'Data Found',
                variant: 'success'
            })
            );
        }
        else if (error) {
            console.log('error >> ', error);
        }
    }
}