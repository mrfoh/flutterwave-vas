import FlutterwaveVASBase from "./base";
import { BILL_PAYMENT_URL } from "./constants";
import { BillPaymentOptions, Responses } from "./types";

export class FlutterwaveVASPayment {
    private base: FlutterwaveVASBase;
    private endpoint: string;

    constructor(base: FlutterwaveVASBase) {
        this.base = base;
        this.endpoint = this.base.buildEndpoint(BILL_PAYMENT_URL);
    }

    /**
     * Make a bill payment
     * @param {BillPaymentOptions} options 
     * @returns {Promise<Responses.BillPaymentResponse>}
     */
    async pay(options: BillPaymentOptions): Promise<Responses.BillPaymentResponse> {
        return this.base.post<Responses.BillPaymentResponse>(this.endpoint, options);
    }
}