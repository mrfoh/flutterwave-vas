import FlutterwaveVASBase from "./base";
import { SERVICE_BILLERS_URL, BILLER_PRODUCTS_URL, USSD_PAYMENT_URL } from "./constants";
import { FlutterwaveVASServicCodes, USSDPaymentOptions, Responses } from "./types";

export default class FlutterwaveVASAirtime {
    private fwBase: FlutterwaveVASBase;
    private billersEndpoint: string;
    private billerProductsEndpoint: string;
    private USSDPayEndpoint: string;

    /**
     * Create base class instance
     * @param fwBase 
     */
    constructor(fwBase: FlutterwaveVASBase) {
        this.fwBase = fwBase;
        this.billersEndpoint = this.fwBase.buildEndpoint(SERVICE_BILLERS_URL);
        this.billerProductsEndpoint = this.fwBase.buildEndpoint(BILLER_PRODUCTS_URL);
        this.USSDPayEndpoint = this.fwBase.buildEndpoint(USSD_PAYMENT_URL);
    }

    /**
     * Get Airtime Billers
     * @returns {Promise<Responses.ServiceBillersResponse>}
     */
    async getBillers(): Promise<Responses.ServiceBillersResponse> {
        return this.fwBase.get<Responses.ServiceBillersResponse>(`${this.billersEndpoint}/${FlutterwaveVASServicCodes.AIRTIME}`);
    }

    /**
     * Get products from a biller
     * @param {string} billercode
     * @returns {Promise<Responses.BillerProductsResponse>} 
     */
    async getBillerProducts(billercode: string): Promise<Responses.BillerProductsResponse> {
        const url = `${this.billerProductsEndpoint}/${billercode}`;
        return this.fwBase.get<Responses.BillerProductsResponse>(url);
    }

    /**
     * Purchase Airtime directly via USSD
     * @param {USSDPaymentOptions} options
     * @returns {Promise<Responses.USSDPayment>}
     */
    async USSDPay(options: USSDPaymentOptions): Promise<Responses.USSDPayment> {
        if (!options) throw new Error("Parameters not provided");
        return this.fwBase.post<Responses.USSDPayment>(this.USSDPayEndpoint, options);
    }
}