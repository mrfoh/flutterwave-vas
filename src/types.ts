import { AnySchema } from "joi";

export type JoiSchema<T> = { [P in NonNullable<keyof T>]: AnySchema };

export interface FlutterwaveVASOptions {
    /**
     * Set the Flutterwave API URL to sandbox
     * 
     * @type {boolean}
     * @memberOf FlutterwaveOptions
     */
    sandbox: boolean;
    /**
     * Specify custom endpoint
     * 
     * @type {string}
     * @memberOf FlutterwaveOptions
     */
    endpoint: string;
}

export interface ValidateCustomerIDOptions {
    customerid: string;
    billercode: string;
    productcode: string;
}

export interface BillPaymentOptions {
    amount: number;
    customerid: string;
    transactionreference: string;
    billercode: string;
    productcode: string;
}

export interface USSDPaymentOptions {
    amount: number;
    customerid: string;
    transactionreference: string;
}
/**
 * Currently available services on Flutterwave VAS platform
 */
export enum FlutterwaveVASServiceCodes {
    AIRTIME = "AIRTIME",
    MOBILE_DATA = "MOBILEDATA",
    CABLE_BILL = "CABLEBILLS",
    INTERNET_SERVICE = "INTSERVICE",
    UTILITY_BILLS = "UTILITYBILLS",
    TAX = "TAX",
    DONATIONS = "DONATIONS",
    DEALER_PAYMENTS = "DEALPAY",
    TRANSPORT_LOGISTICS = "TRANSLOG"
}

export namespace Responses {
    export interface Metadata {
        field: string;
        description: string;
        optional: boolean;
        type: string;
        title: string;
    }

    export interface Product {
        amount: string;
        code: string;
        name: string;
        description?: any;
    }

    export interface Biller {
        code: string;
        name: string;
    }

    export interface ServiceBillersData {
        responsecode: string;
        servicecode: string;
        responsemessage: string;
        billers: Biller[];
    }

    export interface ServiceBillersResponse {
        data: ServiceBillersData;
        message: string;
        status: string;
    }

    export interface BillerProductsData {
        responsecode: string;
        metadata: Metadata[];
        responsemessage: string;
        billercode: string;
        products: Product[];
    }

    export interface BillerProductsResponse {
        data: BillerProductsData;
        message: string;
        status: string;
    }

    export interface USSDPaymentData {
        date: string;
        amount: number;
        balance: string;
        transaction_reference: string;
        network: string;
        response_code: string;
        response_message: string;
        flw_reference: string;
    }

    export interface USSDPayment {
        data: USSDPaymentData;
        description: string;
        status: string;
    }

    export interface BillPayemntData {
        date: string;
        amount: number;
        balance: string;
        transaction_reference: string;
        response_code: string;
        response_message: string;
        flw_reference: string;
        biller_code: string;
        product_code: string;
    }

    export interface BillPaymentResponse {
        data: BillPayemntData;
        description: string;
        status: string;
    }

    export interface ValidateCustomerData {
        response_code: string;
        address: string;
        response_message: string;
        name: string;
        biller_code: string;
        customer_id: string;
        product_code: string;
        email?: any;
    }

    export interface ValidateCustomerResponse {
        data: ValidateCustomerData;
        description: string;
        status: string;
    }

    export interface TransactionQueryData {
        responsecode: string;
        amount: string;
        responsemessage: string;
        flwreference: string;
        transactionreference: string;
        status: string;
    }

    export interface TransactionQueryResponse {
        data: TransactionQueryData;
        description: string;
        status: string;
    }
}