import FlutterwaveVASBase from "./base";
import { FlutterwaveVASOptions } from "./types";
import FlutterwaveVASAirtime from "./airtime";
import { FlutterwaveVASUtils } from "./utils";
import { FlutterwaveVASPayment } from "./pay";

const defaults: FlutterwaveVASOptions = {
    sandbox: false,
    endpoint: ''
}

/**
 * Flutterwave VAS
 */
class FlutterwaveVAS {
    private flutterwave: FlutterwaveVASBase;
    Airtime: FlutterwaveVASAirtime;
    Utils: FlutterwaveVASUtils;
    BillPayment: FlutterwaveVASPayment;

    constructor(merchant_key: string, options?: Partial<FlutterwaveVASOptions>) {
        if (!merchant_key) throw new Error("merchant_key not provided");

        const fwOptions: FlutterwaveVASOptions = {
            ...defaults,
            ...options
        }

        this.flutterwave = new FlutterwaveVASBase(merchant_key, fwOptions);
        this.Airtime = new FlutterwaveVASAirtime(this.flutterwave);
        this.Utils = new FlutterwaveVASUtils(this.flutterwave);
        this.BillPayment = new FlutterwaveVASPayment(this.flutterwave);
    }
}

module.exports = FlutterwaveVAS;
export default FlutterwaveVAS;