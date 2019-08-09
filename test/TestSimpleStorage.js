
const SupplyChain = artifacts.require('SupplyChain')
const truffleAssert = require('truffle-assertions');

contract('SupplyChain', function (accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    const sku = 1;
    const name = "Endocrine";
    const currentOwner = accounts[0]
    const hospital = accounts[1]
    const hospitalName = "John Doe";
    const consentInfo = "day 1"
    const ICD10 = " E00-E89  "
    const PTconsentState = 0
    const symptom = web3.utils.toWei('.01', 'ether');
    const practitioner = accounts[2];
    const practitionerName = "John Doe"
    const patient = accounts[3]
    const patientName = "John Doe "
    const patientID = 108937979
    const patientCondtion = " pain"


    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Hospital: accounts[1] ", accounts[1])
    console.log("Practitioner: accounts[2] ", accounts[2])
    console.log("Patient: accounts[3] ", accounts[3])


    // 1st Test
    it("Testing smart contract function approvedHospital()", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Watch the emitted event Approved()
        await supplyChain.addhospital(hospital);        


        // calling function hospitalApproved()
        const result = await supplyChain.hospitalApproved(
            sku,
            name,
            hospital,
            hospitalName,
            consentInfo,
            ICD10,
            symptom
            )



        // Retrieve the just now saved consent from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchPTconsentBufferOne.call(sku)
        const resultBufferTwo = await supplyChain.fetchPTconsentBufferTwo.call(sku)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid consent SKU')
        assert.equal(resultBufferOne[1], name, 'Error: Missing or Invalid name')
        assert.equal(resultBufferOne[2], hospital, 'Error: Missing or Invalid currentOwner')
        assert.equal(resultBufferOne[3], hospital, 'Error: Missing or Invalid hospital address')
        assert.equal(resultBufferOne[4], hospitalName, 'Error: Missing or Invalid hospitalName')
        assert.equal(resultBufferOne[5], symptom, 'Error: Missing or Invalid symptom')
        assert.equal(resultBufferOne[6], consentInfo, 'Error: Missing or Invalid consentInfo')
        assert.equal(resultBufferOne[7], ICD10, 'Error: Missing or Invalid ICD10')
        assert.equal(resultBufferTwo[2], 0, 'Error: Invalid consent State')
        truffleAssert.eventEmitted(result, 'Approvedconsent', (ev) => {
            return (ev.sku) == sku;
        });


    })




    // 2nd Test
    it("Testing smart contract function Requestedconsent() ", async () => {
        const supplyChain = await SupplyChain.deployed()

        //  calling function reqPractitioner()
        const result = await supplyChain.reqPractitioner(
            sku,
            practitioner,
            practitionerName,
            patientCondtion,
            {from: hospital,
             value: symptom}
            )

        // Retrieve the just now saved consent from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchPTconsentBufferOne.call(sku)
        const resultBufferTwo = await supplyChain.fetchPTconsentBufferTwo.call(sku)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid consent SKU')
        assert.equal(resultBufferOne[2], practitioner, 'Error: Missing or Invalid ID ')
        assert.equal(resultBufferTwo[2], practitioner, 'Error: Missing or Invalid practitioner')
        assert.equal(resultBufferTwo[3], practitionerName, 'Error: Missing or Invalid practitionerName')
        assert.equal(resultBufferTwo[7], patientCondtion, 'Error: Missing or Invalid patientCondtion')
        assert.equal(resultBufferTwo[1], 1, 'Error: Invalid consent State')
        truffleAssert.eventEmitted(result, 'Requestedconsent', (ev) => {
            return (ev.sku) == sku;
        });
    
    })

    // 3th Test
    it("Testing smart contract function Signedconsent() ", async () => {
        const supplyChain = await SupplyChain.deployed()

        //  calling function prSigned()
        const result = await supplyChain.prSigned(
            sku,
            { from: practitioner })

        // Retrieve the just now saved consent from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchPTconsentBufferTwo.call(sku)

        // Verify the result set
        assert.equal(resultBufferTwo[1], 2, 'Error: Invalid consent State')
        truffleAssert.eventEmitted(result, 'Signedconsent', (ev) => {
            return (ev.sku) == sku;
        });
    })

    // 4th Test
    it("Testing smart contract function PtSigned() ", async () => {
        const supplyChain = await SupplyChain.deployed()


        //  calling function ptSignConsent()
        const result =  await supplyChain.ptSignConsent(
            sku,
            patient,
            patientName,
            patientID ,
            { from: practitioner })

        // Retrieve the just now saved consent from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchPTconsentBufferOne.call(sku)
        const resultBufferTwo = await supplyChain.fetchPTconsentBufferTwo.call(sku)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid consent SKU')
        assert.equal(resultBufferOne[2], patient, 'Error: Missing or Invalid ID ')
        assert.equal(resultBufferTwo[4], patient, 'Error: Missing or Invalid patient')
        assert.equal(resultBufferTwo[5], patientName, 'Error: Missing or Invalid patient')
        assert.equal(resultBufferTwo[6], patientID, 'Error: Missing or Invalid patient')
        assert.equal(resultBufferTwo[1], 3, 'Error: Invalid consent State')
        truffleAssert.eventEmitted(result, 'PtSignedconsent', (ev) => {
            return (ev.sku) == sku;
        });
    })

    // 5th Test
    it("Testing smart contract function fetchPTconsentBufferOne() that allows anyone to fetch consent details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed()
        const resultBufferOne = await supplyChain.fetchPTconsentBufferOne.call(sku)

        // Verify the result set:
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], name, 'Error: Missing or Invalid name')
        assert.equal(resultBufferOne[3], hospital, 'Error: Missing or Invalid hospital address')
        assert.equal(resultBufferOne[4], hospitalName, 'Error: Missing or Invalid hospitalName')
        assert.equal(resultBufferOne[5], symptom, 'Error: Missing or Invalid symptom')
        assert.equal(resultBufferOne[6], consentInfo, 'Error: Missing or Invalid consentInfo')
        assert.equal(resultBufferOne[7], ICD10, 'Error: Missing or Invalid ICD10')

    })

    // 6th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch consent details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved consent from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchPTconsentBufferTwo.call(sku)

        // Verify the result set:
        assert.equal(resultBufferTwo[0], sku, 'Error: Invalid consent SKU')
        assert.equal(resultBufferTwo[2], practitioner, 'Error: Missing or Invalid practitioner')
        assert.equal(resultBufferTwo[3], practitionerName, 'Error: Missing or Invalid practitionerName')
        assert.equal(resultBufferTwo[4], patient, 'Error: Missing or Invalid patient')
        assert.equal(resultBufferTwo[5], patientName, 'Error: Missing or Invalid patient')
        assert.equal(resultBufferTwo[6], patientID, 'Error: Missing or Invalid patient')
        assert.equal(resultBufferTwo[7], patientCondtion, 'Error: Missing or Invalid patientCondtion')


    })

});
















