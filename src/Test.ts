import * as csvParse from "csv-parser";
import * as fs from "fs";

export class Test {

    public show(): void {
        console.log('Hello ...');
    }

    public parseCSV(): void {
        console.log("........ Going to parse the CSV ......");
        const filepath = 'data.csv';
        let results: any[] = [];

        fs.createReadStream("data.csv")
            .pipe(csvParse())
            .on('data', (data: any) => results.push(data))
            .on('end', () => {
                // console.log(results);

            });

        console.log(results);
    }

    public async parseCSV1(): Promise<any> {
        let results: any[] = [];
        const csvPromise = new Promise((resolve, reject) => {
            fs.createReadStream("data.csv")
                .pipe(csvParse())
                .on('data', (data: any) => results.push(data))
                .on('end', () => {
                    // console.log(results);
                    resolve(results);
                });
            /*fs.readFile('path/to/file.csv', (err, fileData) => {
                parse(fileData, {}, function(err, rows) {
                    console.log('rows', rows, err)
                    resolve(rows);
                });
            });*/
        })

        //console.log(results);

        return csvPromise;
    }

    public async process(): Promise<void> {
        let results: any[] = await test.parseCSV1();
        let csvJson = JSON.stringify(results);
        //        console.log("Actual Buyer Name : ", csvJson["BUYER NAME"]);
                console.log(results);
        console.log(typeof results);
//        for (let i = 0; i < results.length; i++) {
//            console.log("Printing ===>", results[i].name)
//            console.log("Buyer Name ====", JSON.stringify(results[i]))
//        }
        results.forEach((obj)=>console.log(obj['BUYER NAME']));
        console.log("==================================");
        results.map(result => result['BUYER NAME']).forEach(buyer => console.log(buyer));
        console.log("==================================");
        for (let i = 0; i < results.length; i++) {
            let obj: any = results[i];
            console.log("Now=====>",obj['BUYER NAME']);
        }
    }
}

const test = new Test();
test.show();
test.process();

