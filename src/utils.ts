import FlutterwaveVASBase from "./base";
import { VALIDATE_CUSTOMER_URL, TRANSACTION_QUERY_URL } from "./constants";
import { ValidateCustomerIDOptions, Responses } from "./types";

export class FlutterwaveVASUtils {
    private fwBase: FlutterwaveVASBase;
    private validateEndpoint: string;
    private transactionQueryEndpoint: string;

    constructor(fwBase: FlutterwaveVASBase) {
        this.fwBase = fwBase;
        this.validateEndpoint = this.fwBase.buildEndpoint(VALIDATE_CUSTOMER_URL);
        this.transactionQueryEndpoint = this.fwBase.buildEndpoint(TRANSACTION_QUERY_URL);
    }

    /**
     * Generate a transaction reference
     * @param {number} length
     * @returns {string} 
     */
    transactionReference(length: number): string {
        let s = '';
        const randomchar = function() {
          var n = Math.floor(Math.random() * 62);
          if (n < 10) return n; //1-10
          if (n < 36) return String.fromCharCode(n + 55); //A-Z
          return String.fromCharCode(n + 61); //a-z
        }
        while (s.length < length) s += randomchar();
        return s.toLowerCase();
    }
    
    /**
     * Validate a customer ID (phone number)
     * @param {ValidateCustomerIDOptions} options 
     * @returns {Promise<Responses.ValidateCustomerResponse>}
     */
    async validateCustomerID(options: ValidateCustomerIDOptions): Promise<Responses.ValidateCustomerResponse> {
        if (!options) throw new Error("No parameters provided");
        return this.fwBase.post<Responses.ValidateCustomerResponse>(this.validateEndpoint, options);
    }

    /**
     * Query for a transaction status
     * @param {string} ref
     * Transaction Reference
     * @returns {Promise<Responses.TransactionQueryResponse>} 
     */
    async transactionRequery(ref: string): Promise<Responses.TransactionQueryResponse> {
        if (!ref) throw new Error("Transaction reference not provided");
        const uri = `${this.transactionQueryEndpoint}/${ref}`;
        return this.fwBase.get<Responses.TransactionQueryResponse>(uri);
    }
}