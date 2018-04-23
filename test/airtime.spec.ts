import FlutterwaveVAS from "../src/index";

describe("FlutterwaveVAS Airtime spec", () => {
    const fw = new FlutterwaveVAS("tk_hmzRdpMe2U", { 
        sandbox: true
    });
    const Airtime = fw.Airtime;
    const Utils = fw.Utils;

    it("should get list of billers", () => {
        Airtime.getBillers()
            .then(response => {
                expect(response).toBeDefined();
                expect(response).toHaveProperty("data");
                expect(response).toHaveProperty("data.billers");
            }, error => {
                expect(error).not.toBeDefined();
            })
    });

    it("should get a biller's products", () => {
        Airtime.getBillerProducts("BIL099")
            .then(response => {
                expect(response).toBeDefined();
                expect(response).toHaveProperty("data.products");
            }, error => {
                expect(error).not.toBeDefined();
            })
    })

    it("make an airtime purchase over USSD", () => {
        Airtime.USSDPay({
            amount: 100,
            customerid: "2347084903012",
            transactionreference: Utils.transactionReference(12)
        })
        .then(response => {
            expect(response).toBeDefined();
        }, error => {
            expect(error).not.toBeDefined();
        })
    });
})