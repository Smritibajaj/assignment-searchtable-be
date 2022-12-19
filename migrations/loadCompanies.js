var fs = require("fs");
var XmlStream = require("xml-stream");
async function up(db) {
    console.log(db.s.client)
  const stream = fs.createReadStream(
    "/Users/simmybajaj/Downloads/public_split_1_10/20221214_Public01.xml"
  );
  let array = [];
  const collection = db.s.client('testdb').collection("companies");;
  var xml = await new XmlStream(stream);
  xml.on("endElement: ABR", function (ABR) {
    console.log(ABR, array.length);
    const formattedObj = {
      company: {
        name: ABR?.MainEntity?.NonIndividualName?.NonIndividualNameText,
        legalPersonName: ABR?.LegalEntity?.IndividualName,
        address: ABR?.BusinessAddress?.AddressDetails,
        companyType: ABR?.BusinessAddress?.AddressDetails,
        gst: ABR?.GST,
        others: ABR?.OtherEntity,
        status: ABR?.ABN,
        asic: ABR?.ASICNumber,
        recordLastUpdatedDate: ABR?.recordLastUpdatedDate,
      },
    };
    array.push(formattedObj);
  });

  xml.on("end", function () {
    console.log("end event received, done");
  });
  return await collection.insertMany(array, (err, res) => {
    if (err) throw err;
    console.log(`Inserted ${res.insertedCount} documents`);
    client.close();
  });
}
function down(db) {
  return Promise.resolve("ok");
}
module.exports = {
  up: (db) => up(db),
  down: (db) => down(db),
};
