// ==UserScript==
// @name         Project Mimir
// @namespace    http://tampermonkey.net/
// @version      2024-06-17
// @description  Ask an AI to generate a report for you!
// @author       Ty Wark
// @match        https://lightspeedanalytics.net/app/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @run-at document-idle
// ==/UserScript==


/* globals jQuery, $, waitForKeyElements */


/* Global Vars*/

const timer = ms => new Promise(res => setTimeout(res, ms))
var BaseComplete = new Boolean

/*____________*/





var resp = new String
var box1 = new String
var box2 = new String
var Base_LikelyBase = new String
var Base_BackupBase = new String
var Base_Justify = new String
var Base_Override = new String
var table
var DataArray = new Array



var baseReportFindGuardRails = `"Here are the Data Points for the Sales Report Base

""[Date Point Cannot Filter? Company Name FALSE Ls Account ID FALSE City FALSE State FALSE Street Address 1 FALSE Street Address 2 FALSE Zip FALSE Archived (Yes / No) FALSE Company FALSE Country FALSE Customer ID FALSE Date of birth FALSE Email FALSE First Name FALSE Full Name FALSE Last Name FALSE Home Phone FALSE Mobile Phone FALSE Work Phone FALSE Title FALSE Type FALSE Website FALSE Category (Filter) FALSE Quantity on Hand (Filter) FALSE Archived (Yes / No) FALSE Brand FALSE Category TRUE Top Level Category FALSE Avg Cost FALSE Default Cost FALSE Default Vendor FALSE Description FALSE Custom SKU FALSE Default Vendor ID FALSE EAN FALSE Manufacturer SKU FALSE System ID FALSE UPC FALSE Item Type FALSE Attribute 1 FALSE Attribute 2 FALSE Attribute 3 FALSE Manufacturer SKU FALSE Matrix FALSE Matrix Tag FALSE Price FALSE Single Tag FALSE # of Items TRUE Avg Default Price TRUE Quantity on Hand TRUE Quantity on Order TRUE Desired Inventory Level TRUE Reorder Point TRUE Store FALSE Channel FALSE Date FALSE Day of Month (Not Supported, use Date) FALSE Day of Week (Not Supported, use Date) FALSE Hour of Day (Not Supported, use Date) FALSE Month (Not Supported, use Date) FALSE Month Name FALSE Quarter of Year (Not Supported, use Date) FALSE Time (Not Supported, use Date) FALSE Week (Not Supported, use Date) FALSE Week of Year FALSE Year (Not Supported, use Date) FALSE Employee FALSE Employee Hours FALSE Employee Role FALSE Register FALSE Sale ID FALSE # of Sales TRUE Average Sale Quantity TRUE Avg Basket Size TRUE Avg Basket Value TRUE Margin (Filter) FALSE Quantity Sold (Filter) FALSE Total (Filter) FALSE Discount Name FALSE Employee FALSE Employee Hours FALSE Employee Role FALSE Sale Line ID FALSE Tax Class FALSE # of Sale Lines TRUE Avg Discount TRUE Avg Quantity TRUE Avg Unit Price TRUE Margin TRUE Profit TRUE Total TRUE Cost TRUE Quantity Sold TRUE Subtotal TRUE]""

Here are the Data Points for the Items Report Base

""[Date Point Cannot Filter? Company Name FALSE Ls Account ID FALSE Average Lead Time FALSE Forecast Period TRUE Trailing Sales Period TRUE Days of Cover TRUE Dynamic Reorder Level TRUE Dynamic Reorder Point TRUE Quantity to Order TRUE Trailing Average Daily Sales TRUE Category FALSE Include Archived FALSE Brand FALSE Category TRUE Top Level Category TRUE Avg Cost FALSE Default Cost FALSE Default Vendor FALSE Description FALSE Custom SKU FALSE Default Vendor ID FALSE EAN FALSE Manufacturer SKU FALSE System ID FALSE UPC FALSE Item Type FALSE Attribute 1 FALSE Attribute 2 FALSE Attribute 3 FALSE Manufacturer SKU FALSE Matrix FALSE Matrix Tag FALSE Single Tag FALSE Tax Class FALSE # of Items TRUE Days Since Counted FALSE Days Since Received FALSE Days Since Sold FALSE Days To Sell Out FALSE Last Received Date FALSE Last Sold Date FALSE Quantity on Order FALSE Quantity to Order FALSE Quantity on Hand FALSE Desired Inventory Level FALSE Reorder Point FALSE Lifetime Quantity Sold FALSE Lifetime Sales FALSE Tag Collection FALSE 365 Day GMROI FALSE 365 Day Turns FALSE Last Year GMROI FALSE Last Year Turns FALSE Date (first_received_date_date) FALSE Is Dusty (Yes / No) FALSE Is Included (Yes / No) FALSE On Order (Yes / No) FALSE On Transfer (Yes / No) FALSE Price FALSE Days Since Counted TRUE Days Since First Received TRUE Days Since Received TRUE Days Since Sold TRUE Days to Sell Out TRUE Avg Default Price TRUE 365 Day Avg Inventory TRUE Last Year Avg Inventory TRUE Quantity on Hand TRUE Total Cost TRUE Total Retail Value TRUE Cost on Order TRUE Lifetime Received Quantity TRUE Quantity on Order TRUE Desired Inventory Level TRUE Reorder Point TRUE Lifetime Quantity Sold TRUE Lifetime Sales TRUE 365 Day GMROI TRUE 365 Day Turns TRUE Last Month GMROI TRUE Last Month Turns TRUE Last Year GMROI TRUE Last Year Turns TRUE Days Since PO Received FALSE Days Since Transfer Received FALSE Store FALSE Days Since PO Received TRUE Days Since Transfer Received TRUE Completed Date FALSE Register FALSE # of Lines TRUE # of Sales TRUE Avg Basket Size TRUE Avg Discount Percent TRUE Avg Price TRUE Cost TRUE Margin TRUE Profit TRUE Quantity Sold TRUE Total TRUE Total Discounts TRUE]""

Here are the Data Points for the Tax Report Base

""[Date Point Cannot Filter? Company Name FALSE Ls Account ID FALSE City FALSE State FALSE Street Address 1 FALSE Street Address 2 FALSE Zip FALSE Country FALSE Full Name FALSE Type FALSE Store FALSE Channel FALSE Date FALSE Day of Month FALSE Day of Week FALSE Month FALSE Month Name FALSE Quarter of Year FALSE Week FALSE Week of Year FALSE Year FALSE Employee FALSE Register FALSE Sale ID FALSE Tax 1 Rate FALSE Tax 2 Rate FALSE Tax Name FALSE # of Sales TRUE Avg Basket Size TRUE Avg Basket Value TRUE Total Tax 1 TRUE Total Tax 2 TRUE Total Tax Paid TRUE Margin FALSE Quantity Sold FALSE Discount Name FALSE Is Layaway (Yes / No) FALSE Is Miscellaneous (Yes / No) FALSE Is Special Order (Yes / No) FALSE Is Taxed (Yes / No) FALSE Is Workorder (Yes / No) FALSE Tax Class FALSE Tax Class 1 Rate FALSE Tax Class 2 Rate FALSE # of Sale Lines TRUE Avg Discount TRUE Avg Quantity TRUE Avg Unit Price TRUE Margin TRUE Profit TRUE Cost TRUE Quantity Sold TRUE Subtotal TRUE Total Discount TRUE Total with Tax TRUE City FALSE State FALSE Street Address 1 FALSE Street Address 2 FALSE Zip FALSE Country FALSE]""

Here are the Data Points for the On Order Report Base

""[Company Name FALSE Ls Account ID FALSE Category FALSE Brand FALSE Category FALSE Top Level Category FALSE Custom SKU FALSE EAN FALSE Manufacturer SKU FALSE System ID FALSE UPC FALSE Attribute 1 FALSE Attribute 2 FALSE Attribute 3 FALSE Manufacturer SKU FALSE Matrix FALSE Price FALSE Quantity on Hand TRUE Receiving Shop FALSE Sending Shop FALSE Archived (Yes / No) FALSE Complete (Yes / No) FALSE Date FALSE Day of Month FALSE Day of Week FALSE Month FALSE Month Name FALSE Quarter of Year FALSE Week FALSE Week of Year FALSE Year FALSE Date FALSE On Order (Yes / No) FALSE Order ID FALSE Date FALSE Week of Year FALSE Year FALSE Date FALSE Day of Month FALSE Day of Week FALSE Month FALSE Month Name FALSE Quarter of Year FALSE Week FALSE Week of Year FALSE Year FALSE Transfer ID FALSE Type FALSE Vendor FALSE # of Items TRUE Cost of Ordered TRUE Cost of Received TRUE Order Discounts TRUE Original Order Quantity TRUE Quantity on Order TRUE Retail Value on Order TRUE Retail Value Received TRUE Total Received Quantity TRUE]""

Here are the Data Points for the Payments Report Base

""[Company Name FALSE Ls Account ID FALSE Full Name FALSE Type FALSE Store FALSE Channel FALSE Date FALSE Day of Month FALSE Day of Week FALSE Month FALSE Month Name FALSE Quarter of Year FALSE Week FALSE Week of Year FALSE Year FALSE Employee FALSE Register FALSE Sale ID FALSE # of Sales TRUE Avg Basket Size TRUE Avg Basket Value TRUE Margin FALSE Quantity Sold FALSE Discount Name FALSE Is Layaway (Yes / No) FALSE Is Miscellaneous (Yes / No) FALSE Is Special Order (Yes / No) FALSE Is Workorder (Yes / No) FALSE Tax Class FALSE # of Sale Lines TRUE Avg Discount TRUE Avg Quantity TRUE Avg Unit Price TRUE Margin TRUE Profit TRUE Cost TRUE Quantity Sold TRUE Payment Type FALSE Amount TRUE]""

Here are the Data Points for the Customers Report Base

""[Date Point Cannot Filter? Company Name FALSE Ls Account ID FALSE Days Between Purchases FALSE Days Since Last Purchase FALSE Historic Lifetime Value FALSE Address FALSE Date of birth FALSE Days Between Sales Tiered FALSE Email FALSE First Employee FALSE First Sale Date FALSE Is Repeat (Yes / No) FALSE First Name FALSE Full Name FALSE Last Name FALSE On Do Not Call List (Yes / No) FALSE On Do Not Email List (Yes / No) FALSE Phone Number FALSE Single Tag TRUE Status TRUE Type TRUE # of Customers FALSE Avg Lifetime Value FALSE Days Between Purchases FALSE Days Since Last Purchase FALSE Historic Lifetime Value FALSE Brand FALSE Category FALSE Top Level Category FALSE Avg Cost TRUE Default Vendor TRUE Description TRUE # of Items TRUE Store TRUE Date TRUE Day of Month TRUE Day of Week TRUE Month FALSE Month Name TRUE Quarter of Year FALSE Week FALSE Week of Year FALSE Year FALSE Register FALSE Sale ID FALSE # of Sales FALSE Avg Basket Value FALSE Total FALSE # of Sale Lines FALSE Avg Discount FALSE Avg Quantity FALSE Avg Unit Price FALSE Margin FALSE Profit FALSE Total FALSE Cost FALSE Quantity Sold FALSE]""

Here is a list of Overrides. This List will override any finds you make from here. ALWAYS RESPECT AND USE THE OVERRIDE TABLE.

[Report Base / Does Include / Doesnt Include (Forbidden Data Types) Customer / Customer, first employee with customer, items, Stores, sales / item metrics, employee information, item info

Items / Item details, aging details / customers, employees, payment types

On Order / Item, order, multi-shop, Ordered Date, Received Date / customer, sales

Payments / Customer, multi-shop, sale, employee, account receivable, accounts receivable / items, taxes

Sales / Customers, items, sales and sales dates / payments, taxes, or inventory for items that did not sell yet, incomplete Layaways, incomplete Special Orders, incomplete workorders, account receivable, accounts receivable

Tax / Customer, sale, taxes / item, payment method, item information, item info, sale lines

]

DO NOT MIX DATA POINTS FROM 1 REPORT TO ANOTHER. EACH REPORT EXCLUSIVELY CAN ONLY SEE WHAT IS LISTED UNDER THEM. SALES REPORT CANNOT SEE TAX RATES ONLY TAX CLASS. ANYTHING REFERING TO TAXES IS ALWAYS THE TAX REPORT, WITH THE SINGLE AND ONLY EXCEPTION BEING TAX CLASS.

Forbidden Table:

[ Special Orders do not appear on the Sales report unless its 100% complete,

Work Orders do not appear on the Sales report unless its 100% complete,

Layaways do not appear on the Sales report unless its 100% complete,

Deposits only appear on the Payments report,

Accounts Receivable is ALWAYS THE PAYMENTS BASE REPORT,

Account Receivable is ALWAYS THE PAYMENTS BASE REPORT,

THE SALES REPORT CANNOT SEE INCOMPLETE SALES, LAYAWAYS, WORKORDERS, SPECIAL ORDERS OR DEPOSITS,

The Sales report cannot report on items that have never been sold or involved in a sale,

The Sales report cannot see incomplete sales of any kind no matter what,

The Customers report cannot see Sales Details including Status,

The Customer report cannot see Workorders/Layaways/Special Orders at all,

The Tax report cannot see Item Information or Item Details at all,

The Tax Report can only see the Sale ID and it cannot see specific info about things on the sale,

There are no Notes of any kind on any report. Always ignore requests for notes,

No report can see Inventory Counts,

No report can see Shrinkage Reports,

No report can see Inventory Changes over a range,

No report can see Item or Customer ""Custom Fields"",

No Report can view the customers ""Deposits or Account Balance"",

No Report can view Gift Cards and their usage except the Payments report,

No Report can see shipping costs,

No report can see ""Lightspeed Payments Fees"",

No report can see cash register activity,

]

When you recieve a question, the first thing you will do is extract all the Data Points you can find. Then for each Base Report Type, find the Data Point that matches Data Point you found in the question. In the response below, sub out [Match%] with the list of Data Points you found that are exact matches with Data Points under that Report types Data Point Table. Then sub out [List out Data Points the question asked for] for the list of Data Points you extracted for each Report Base.

Then sub out [base] with the report base that would make the most sense to use in this case, you should typically pick the option that has the most matches and makes the most sense to use via context clues and the report base name. Make sure it does not conflict with the Override Table and Forbidden Table. Replace [base2] with your second best match.

The Override Table and Forbidden Table Table hold priority over all, even if you find a better match, but either of those 2 tables prevent or force another base report, you must obey the tables.

When you respond to a question, do it in the following json format:

"{ Base Reports: { Sales : [Match%], Items : [Match%], Tax : [Match%], On Order : [Match%], Payments : [Match%], Customers : [Match%] },

Extracted Data Points : [List out Data Points the question asked for]

Most Likely Report : [base] , Second Most Likely : [base2]

Justification : [reason]

Override : [IS/IS NOT], [reportbase]

Impossible/Incomplete : [yes/no]

}"

Substitute out [reason] with a justification for your findings. Always include this portion, even if blank. Make sure the justification does not conflict with the Override Table and SForbidden Table Table. Always provide a second option if you know the suggested report cannot provide all the requests. If the report ends up being impossible due to missing some Data Points, please make sure to state that, along with what you were unable to complete.

If there is an Override from the Override Table, substitute [reportbase] with the report in question. Replace [IS/IS NOT] with IS or IS NOT. Replace with IS if there is an Override or Consideration saying the report must be a specific base. Replace with IS NOT if you find a Forbidden Table or Override forbidding a report base to use a specific Data Point or type of Data.

If the question is asking for an impossible report based on the guidelines and Data Points + Base Reports ive given you, substitute [yes/no] with Yes. If the report in question can be 100% built with no missing data, substitute [yes/no] with No. You can also replace [yes/no] with Yes if there is anything on the Forbidden table that conflicts with the question.

ALWAYS RESPECT AND USE THE OVERRIDE TABLE AND THE FORBIDDEN TABLE. Refer to the Forbidden Table Table to make sure there are no conflicts that may take place. Make sure to always fill in the justification section. DO NOT MAKE STUFF UP. ONLY USE INFORMATION PROVIDED TO YOU. DO NOT MIX DATA POINTS FROM 1 REPORT TO ANOTHER."`




function Right(text, length) {
    return text.split("").reverse().join("").substring(0, text.length - length + 1).split("").reverse().join("");
}

//Gets the left most X characters from string.
function Left(text, length) {
    return text.substring(0, length);
}



async function getBaseReport(vaguerequest, finetune) {




    let openAiRequestPlusGuardRails = baseReportFindGuardRails + ". " + vaguerequest + ". " + finetune + ". " + finetune
console.log(openAiRequestPlusGuardRails)
    let data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": openAiRequestPlusGuardRails}],
        "temperature": 0
    };


    var response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", //
        cache: "no-cache",
        Authorization: "Bearer sk-proj-WZwjOpTw4RuuGYDMgJkoT3BlbkFJdy209Tb2GnPG2KYp1MeA",
        contentType: 'application/json',
        n : 1,
        response_format : { "type": "json_object" },
        max_tokens : 600,

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer sk-proj-WZwjOpTw4RuuGYDMgJkoT3BlbkFJdy209Tb2GnPG2KYp1MeA",
        },
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(response=>response.json()).then(data=>{resp = (data)});
    ;


    console.log(resp['choices'][0]['message']['content'])
    console.log("Total Token Usage: "+resp["usage"]["total_tokens"])
    resp = resp['choices'][0]['message']['content']

}






function replaceButton() {
   document.querySelector("body > #__next > div > div > div.css-1yeu6ln-Box-Flex.e1rqh3k81 > div.css-xkdgzs-Box-Flex.e1rqh3k81").addEventListener("click", Engine, false)
    }




function textFix(){

    document.querySelector("body > div:nth-child(26) > div > div > div.css-16t8i6y-Container.etqmmgu0 > div.css-obt5hl-Content.etqmmgu1").innerText = "Generate Report"
    document.querySelector("body > div:nth-child(26) > div > div > div.css-1bkr611-ModalBody.egkbfm10 > p.fl-text.css-w9gp5e-Text.e4p1v731").innerText = "What report are they looking for?"
    document.querySelector("body > div:nth-child(26) > div > div > div.css-1bkr611-ModalBody.egkbfm10 > div:nth-child(3) > textarea").placeholder = "Id like a report to show my bike sales for the last month"
    document.querySelector("body > div:nth-child(26) > div > div > div.css-1bkr611-ModalBody.egkbfm10 > p.fl-text.css-sbsf6w-Text.e4p1v731").innerText = "Fine Tuning?"
    document.querySelector("body > div:nth-child(26) > div > div > div.css-1bkr611-ModalBody.egkbfm10 > div:nth-child(5) > textarea").placeholder = "Sales means Sales Total not Number of Sales"



}


function CleansetheUnholy(){


    try{document.querySelector("body > div:nth-child(26) > div > div > div.css-1ou1w9z-ModalFooter.eblor9z0 > div > button").remove()}catch{null}
    let zNode = document.createElement('div');
    zNode.innerHTML = '<button id="myButton" type="button">'+ 'Get Suggested Base Report </button>';
    zNode.setAttribute('id', 'myContainer');
    document.querySelector("body > div:nth-child(26) > div > div > div.css-1ou1w9z-ModalFooter.eblor9z0 > div").append(zNode);
    //--- Activate the newly added button.
    document.getElementById("myButton").addEventListener("click", Enginev2, false);


}


async function Engine(){
    console.log("Click Found")
    await timer(250)
    textFix()
    CleansetheUnholy()


}

async function Enginev2(){
    document.querySelector("#myButton").disabled = true
    try{document.querySelector("#maintable").remove()}catch{null}
    box1 = document.querySelector("body > div:nth-child(26) > div > div > div.css-1bkr611-ModalBody.egkbfm10 > div:nth-child(3) > textarea").innerHTML
    box2 = document.querySelector("body > div:nth-child(26) > div > div > div.css-1bkr611-ModalBody.egkbfm10 > div:nth-child(5) > textarea").innerHTML
    console.log("Fire Base Request")
    await getBaseReport(box1,box2)
    getcutouts()
}



function getcutouts(){

let LikelyBase = resp.indexOf("Most Likely Report")
let Justification = resp.indexOf("Justification")
let Override = resp.indexOf("Override")
let Impossible = resp.indexOf("Impossible/Incomplete") // Used only to mark next segment

LikelyBase = resp.substring(LikelyBase, Justification)
Justification = resp.substring(Justification, Override)
Override = resp.substring(Override, Impossible)
LikelyBase = LikelyBase.split(":")[1]


try{LikelyBase = LikelyBase.split(",")[0]}catch{try{LikelyBase = LikelyBase.split('"')[0]}catch{null}}




let BackupBase = new String
try{BackupBase = LikelyBase.split(":")[3]}
catch{BackupBase = null}

Justification = Justification.split(":")[1]
Override = Override.split(":")[1]

Base_LikelyBase = LikelyBase
Base_BackupBase = BackupBase
Base_Justify = Justification
Base_Override = Override
PushtoArray()

}

function PushtoArray(){
DataArray.push(["Recommended Base" , Base_LikelyBase])
DataArray.push(["Backup Base", Base_BackupBase])
DataArray.push(["Justification", Base_Justify])
DataArray.push(["Override", Base_Override])

BuildTable(DataArray)

}



function BuildTable(array) {
    //setup our table array
    var tableArr = array
    //create a Table Object
    table = document.createElement('table');
    //iterate over every array(row) within tableArr
    for (let row of tableArr) {
        //Insert a new row element into the table element
        table.insertRow();
        //Iterate over every index(cell) in each array(row)
        for (let cell of row) {
            //While iterating over the index(cell)
            //insert a cell into the table element
            let newCell = table.rows[table.rows.length - 1].insertCell();
            //add text to the created cell element
            newCell.textContent = cell;
        }
    }
    table.style.border = "1px solid red"
    table.setAttribute("id", "maintable")
    document.querySelector("body > div:nth-child(26) > div > div > div.css-1bkr611-ModalBody.egkbfm10").appendChild(table);
    BaseComplete = true



    //Fires Part 2
    Afterburner()
}






await timer(1000)
document.querySelector("#__next > div > div > div.css-1yeu6ln-Box-Flex.e1rqh3k81 > div.css-xkdgzs-Box-Flex.e1rqh3k81 > button > span > span").innerText = "Generate Report"
replaceButton()



$("head").append(`
    <style>
        #maintable {
        font-family: "Lato",Helvetica,Arial,Verdana,sans-serif;
        border-spacing: 10px;
        border-collapse: collapse;
        box-sizing: border-box;
        padding: 5px 6px;
        font-size: .875rem;
        color: #000;
        text-align: left;
        border: 1px solid;
        td{
        border: 2px solid #000;
        background-color: #afdbd5;
        height: 25px;
        width: 200px;
        padding-left: 7px;
        padding-right: 7px;
        }
    </style>
`);










/*


  ______ _   _ _____     ____  ______   ____           _____ ______   _____  ______ _____   ____  _____ _______    _____ ______ _   _
 |  ____| \ | |  __ \   / __ \|  ____| |  _ \   /\    / ____|  ____| |  __ \|  ____|  __ \ / __ \|  __ \__   __|  / ____|  ____| \ | |
 | |__  |  \| | |  | | | |  | | |__    | |_) | /  \  | (___ | |__    | |__) | |__  | |__) | |  | | |__) | | |    | |  __| |__  |  \| |
 |  __| | . ` | |  | | | |  | |  __|   |  _ < / /\ \  \___ \|  __|   |  _  /|  __| |  ___/| |  | |  _  /  | |    | | |_ |  __| | . ` |
 | |____| |\  | |__| | | |__| | |      | |_) / ____ \ ____) | |____  | | \ \| |____| |    | |__| | | \ \  | |    | |__| | |____| |\  |
 |______|_| \_|_____/   \____/|_|      |____/_/    \_\_____/|______| |_|  \_\______|_|     \____/|_|  \_\ |_|     \_____|______|_| \_|





*/







const ReportTypes = ["Sales","Items","Customers","Tax","OnOrder","Payment"]

const FullReportGuardRails = `Now based on the knowledge ive given you, and the request to feed me back information in the following format: Data Points: {}/, Filters:{}/, Pivots-{}/, Sorting Column-{}.


For Date Based filtering, you can only explain how you are using it to filter by using the following filter types:[IS IN THE LAST,IS ON THE DAY,IS IN RANGE,IS BEFORE (RELATIVE),IS BEFORE (ABSOLUTE),IS ON OR AFTER (RELATIVE),IS ON OR AFTER (ABSOLUTE),IS IN THE YEAR,IS IN THE MONTH,IS THIS,IS NEXT,IS PREVIOUS,IS NULL,IS ANY TIME,IS NOT NULL].


Here is the data for how Date Filter Types are described.
{IS IN THE LAST,,[NUMVAL],+,[DATETYPE1]
IS ON THE DAY,,YEAR/,MONTH/,DAY
IS IN RANGE,,[NUMVAL],+to+,YEAR/MONTH/DAY
IS BEFORE (RELATIVE),before+,NUMVAL,+,[DATETYPE2]
IS BEFORE (ABSOLUTE),before+,YEAR/,MONTH/,DAY
IS ON OR AFTER (RELATIVE),after+,[NUMVAL],+,[DATETYPE2]
IS ON OR AFTER (ABSOLUTE),after+,YEAR/,MONTH/,DAY
IS IN THE YEAR,,YEAR,null,
IS IN THE MONTH,,YEAR,-,MONTH
IS THIS,this,,+,[DATESCHEM]
IS NEXT,,next,+,[DATESCHEM]
IS PREVIOUS,,last,+,[DATESCHEM]
IS NULL,,NULL,,
IS ANY TIME,,,,
IS NOT NULL,,-NULL,,}.

This is in the format of {Date Filter Type, Prefix, Value 1 ,Value 2, Value 3} then a new line seperates the different entries of Date Filter Type. If you would show Value 1: null, Value 2:null, Value 3: null, instead do not include that part. Anything between [] are variables. NUMVAL is equal to the value you are filtering for. As an example, if you want the last 25 days, NUMVAL is 25, as that is the value you are filtering by. If NUMVAL is undefined by the question, substitute it out with ""1"".


DATETYPE1 can be any of the following options: {Seconds,Minutes,Hours,Days,Weeks,Months,Quarters,Years,Complete Seconds,Complete Minutes,Complete Hours,Complete Days,Complete Weeks,Complete Months,Complete Quarters,Complete Years}.

DATETYPE2 can be any of the following options: {seconds ago,minutes ago,hours ago,days ago,weeks ago,months ago,quarters ago,years ago,seconds from now,minutes from now,hours from now,days from now,weeks from now,months from now,quarters from now,years from now}.

DATESCHEM can be any of the following options {MONTH,YEAR,DAY,QUARTER,WEEK}.

Month is in 2 digit notation (Example June is 06, and December is 12), Year is in 4 digit notation (Example 2002,2023) Day is in 2 digit notation (Example 2,5,23), Quarter is either Q1 or Q2 or Q3 or Q4, with each quarter being a 3 month segment. Quarter cannot also filter for the year, if you want to filter by year you must have an extra date filter for year set. QUARTER CANNOT BE IN THE SAME FILTER AS YEAR, THEY MUST BE 100% SEPERATE ENTRIES.  IS IN THE QUARTER LAST YEAR IS NOT VALID.  Week is Week of Year in 2 digit notation between 1 and 53 (Example the first week of the year is 1, where the 5th it 5)"""".

You may include extra data for the purposes of Date Filters. YEAR, MONTH and DAY must be intepretted from the question, if it cannot, default to 2000/01/01.




For Non-Date Based Filters you can only explain how you are using it to filter by using the following filter types: [IS,CONTAINS,STARTS WITH,ENDS WITH,IS BLANK,IS NULL,IS NOT,DOESNT CONTAIN,DOESNT START WITH,DOESNT END WITH,ISNT BLANK,ISNT NULL].

For Number Comparision filters you can only explain how you are using it to filter by using the following filter types: [IS,IS >,IS >=,IS <,IS <=,IS BETWEEN (INCLUSIVE),IS BETWEEN (EXCLUSIVE),IS NULL,IS NOT,IS NOT BETWEEN (INCLUSIVE),IS NOT BETWEEN (EXCLUSIVE),IS NOT NULL].

For all Filter Types you must also include the data point that is being filtered alongside the filtering type. You can only use up to 10 data points and 3 filters. When displaying Filters back to me, please use the following format: Filter(arg1,arg2,arg3...). If a filter is undefined by the question, leave the value of what is being used to filter by blank ( for example, when asking to filter for a specific category, but no category is fed, still define the filter type, but leave the value blank).

When ""Item"" is specificed in a request, that is referring to Description, always be sure to include Description if items are present and do not list it as not found.

Always include the Filters, Pivots and Sorting Column even if they are blank.

Pivots and Sorts must ALWAYS BE PRESENT IN THE DATA POINTS, IF THEY ARE NOT, ADD THEM AS A DATA POINT.

FILTERS MUST BE PRESENTED IN THE FORMAT OF {What is being Filtered ,Filter Type, Value 1, Value 2, Value 3}

Date Filter Types CAN ONLY BE USED FOR DATES.

If a Filter is blank or if its array is empty, do not include it in the Array.

NEVER USE MORE THAN 10 data points and 3 filters.

REMEMBER TO PIVOT ON DATES/YEARS IF THE QUESTION ASKS FOR COMPARISIONS.

DATE FILTER TYPE names must always be fully included. Example: IS ON OR AFTER (RELATIVE), not IS ON OR AFTER

Value 1, Value 2 and Value 3 must be included as Keys in the Filter arrays even if blank

YOU CAN ONLY USE 1 FILTER TYPE PER FILTER (For Example, you cannot stack IS NOT and IS IN THE LAST.

DO NOT INCLUDE EXTRA FILTERS THAT WERE NOT ASKED FOR IN THE QUESTION

Try not to include NOT NULL or NULL filters unless explicitly asked for

Do not include the following filters ever: Item Type

Please order the Data Points from top to bottom in the order of most likely wanted vs least likely wanted by the asker

USE IS BEFORE (RELATIVE) INSTEAD OF IS NOT + IS IN THE LAST

When the question is asking for sales, always add the Sale ID Dimension

If you are generating a list of Transfers or Purchase Orders, always use the Filter ""Type"" set to the type. For example, if they want details on Transfers, Filter ""Type"" to Transfer. If they want Purchase Orders, Filter ""Type"" to Purchase Orders

The following Array of Data Points is for Customers only. The following array of Data Points DO NOT WORK for locations, stores and employees. ONLY INCLUDE THE FOLLOWING DATA POINTS AS IT RELATES TO CUSTOMERS. DO NOT ADD THE FOLLOWING DATA POINTS IF THE QUESTION DOES NOT MENTION CUSTOMERS:

{City
State
Street Address 1
Street Address 2
Zip
Archived (Yes / No)
Company
Country
Customer ID
Date of birth
Email
First Name
Full Name
Last Name
Home Phone
Mobile Phone
Work Phone
Type
Website}.


Here is an example of a good filter

"Filters: {
    Category: {
      Filter Type: IS NOT,
      Value 1: Grocery
    }
  }"



If you would use the same filter multiple times, create a seperate array entry for each. For example



"Filters: {
    Category: [
        Filter Type: IS,
        Value 1: ACCESSORIES
      },
      Category:  {
        Filter Type: IS,
        Value 1: FITNESS
      },
      Category:  {
        Filter Type: IS,
        Value 1: TURBO COMPONENTS
      }
    }
  }"


  Do not do this though when filtering the same thing multiple times

  "Filters: {
    Category: [
      {
        Filter Type: IS,
        Value 1"": ACCESSORIES
      },
      {
        Filter Type: IS,
        Value 1"": FITNESS
      },
      {
        Filter Type: ""IS,
        Value 1: TURBO COMPONENTS
      }
    ]
  }"

Could you determine the following for use with Google Looker report building and ONLY EXPLICITLY USE DATA POINTS IVE GIVEN YOU. DO NOT ADD YOUR OWN. ALWAYS FOLLOW THE FORMATS GIVEN TO YOU:"""`

const DataPoint_Sales = `"Date Point Cannot Filter?
Company Name FALSE
Ls Account ID FALSE
City FALSE
State FALSE
Street Address 1 FALSE
Street Address 2 FALSE
Zip FALSE
Archived (Yes / No) FALSE
Company FALSE
Country FALSE
Customer ID FALSE
Date of birth FALSE
Email FALSE
First Name FALSE
Full Name FALSE
Last Name FALSE
Home Phone FALSE
Mobile Phone FALSE
Work Phone FALSE
Title FALSE
Type FALSE
Website FALSE
Category (Filter) FALSE
Quantity on Hand (Filter) FALSE
Archived (Yes / No) FALSE
Brand FALSE
Category TRUE
Top Level Category FALSE
Avg Cost FALSE
Default Cost FALSE
Default Vendor FALSE
Description FALSE
Custom SKU FALSE
Default Vendor ID FALSE
EAN FALSE
Manufacturer SKU FALSE
System ID FALSE
UPC FALSE
Item Type FALSE
Attribute 1 FALSE
Attribute 2 FALSE
Attribute 3 FALSE
Manufacturer SKU FALSE
Matrix FALSE
Matrix Tag FALSE
Price FALSE
Single Tag FALSE
# of Items TRUE
Avg Default Price TRUE
Quantity on Hand TRUE
Quantity on Order TRUE
Desired Inventory Level TRUE
Reorder Point TRUE
Store FALSE
Channel FALSE
Date FALSE
Day of Month (Not Supported, use Date) FALSE
Day of Week (Not Supported, use Date) FALSE
Hour of Day (Not Supported, use Date) FALSE
Month (Not Supported, use Date) FALSE
Month Name FALSE
Quarter of Year (Not Supported, use Date) FALSE
Time (Not Supported, use Date) FALSE
Week (Not Supported, use Date) FALSE
Week of Year FALSE
Year (Not Supported, use Date) FALSE
Employee FALSE
Employee Hours FALSE
Employee Role FALSE
Register FALSE
Sale ID FALSE
# of Sales TRUE
Average Sale Quantity TRUE
Avg Basket Size TRUE
Avg Basket Value TRUE
Margin (Filter) FALSE
Quantity Sold (Filter) FALSE
Total (Filter) FALSE
Discount Name FALSE
Employee FALSE
Employee Hours FALSE
Employee Role FALSE
Is Layaway (Yes / No) FALSE
Is Miscellaneous (Yes / No) FALSE
Is Special Order (Yes / No) FALSE
Is Workorder (Yes / No) FALSE
Sale Line ID FALSE
Tax Class FALSE
# of Sale Lines TRUE
Avg Discount TRUE
Avg Quantity TRUE
Avg Unit Price TRUE
Margin TRUE
Profit TRUE
Total TRUE
Cost TRUE
Quantity Sold TRUE
Subtotal TRUE"`


const DataPoint_Items = `"Date Point Cannot Filter?
Company Name FALSE
Ls Account ID FALSE
Average Lead Time FALSE
Forecast Period TRUE
Trailing Sales Period TRUE
Days of Cover TRUE
Dynamic Reorder Level TRUE
Dynamic Reorder Point TRUE
Quantity to Order TRUE
Trailing Average Daily Sales TRUE
Category FALSE
Include Archived FALSE
Brand FALSE
Category TRUE
Top Level Category TRUE
Avg Cost FALSE
Default Cost FALSE
Default Vendor FALSE
Description FALSE
Custom SKU FALSE
Default Vendor ID FALSE
EAN FALSE
Manufacturer SKU FALSE
System ID FALSE
UPC FALSE
Item Type FALSE
Attribute 1 FALSE
Attribute 2 FALSE
Attribute 3 FALSE
Manufacturer SKU FALSE
Matrix FALSE
Matrix Tag FALSE
Single Tag FALSE
Tax Class FALSE
# of Items TRUE
Days Since Counted FALSE
Days Since Received FALSE
Days Since Sold FALSE
Days To Sell Out FALSE
Last Received Date FALSE
Last Sold Date FALSE
Quantity on Order FALSE
Quantity to Order FALSE
Quantity on Hand FALSE
Desired Inventory Level FALSE
Reorder Point FALSE
Lifetime Quantity Sold FALSE
Lifetime Sales FALSE
Tag Collection FALSE
365 Day GMROI FALSE
365 Day Turns FALSE
Last Year GMROI FALSE
Last Year Turns FALSE
Date (first_received_date_date) FALSE
Is Dusty (Yes / No) FALSE
Is Included (Yes / No) FALSE
On Order (Yes / No) FALSE
On Transfer (Yes / No) FALSE
Price FALSE
Days Since Counted TRUE
Days Since First Received TRUE
Days Since Received TRUE
Days Since Sold TRUE
Days to Sell Out TRUE
Avg Default Price TRUE
365 Day Avg Inventory TRUE
Last Year Avg Inventory TRUE
Quantity on Hand TRUE
Total Cost TRUE
Total Retail Value TRUE
Cost on Order TRUE
Lifetime Received Quantity TRUE
Quantity on Order TRUE
Desired Inventory Level TRUE
Reorder Point TRUE
Lifetime Quantity Sold TRUE
Lifetime Sales TRUE
365 Day GMROI TRUE
365 Day Turns TRUE
Last Month GMROI TRUE
Last Month Turns TRUE
Last Year GMROI TRUE
Last Year Turns TRUE
Days Since PO Received FALSE
Days Since Transfer Received FALSE
Store FALSE
Days Since PO Received TRUE
Days Since Transfer Received TRUE
Completed Date FALSE
Register FALSE
# of Lines TRUE
# of Sales TRUE
Avg Basket Size TRUE
Avg Discount Percent TRUE
Avg Price TRUE
Cost TRUE
Margin TRUE
Profit TRUE
Quantity Sold TRUE"`


const DataPoint_Customers = `"Date Point Cannot Filter?
Company Name FALSE
Ls Account ID FALSE
Days Between Purchases TRUE
Days Since Last Purchase TRUE
Historic Lifetime Value FALSE
Address FALSE
Date of birth FALSE
Days Between Sales Tiered FALSE
Email FALSE
First Employee FALSE
First Sale Date FALSE
Is Repeat (Yes / No) FALSE
First Name FALSE
Full Name FALSE
Last Name FALSE
On Do Not Call List (Yes / No) FALSE
On Do Not Email List (Yes / No) FALSE
Phone Number FALSE
Single Tag FALSE
Status FALSE
Type FALSE
# of Customers TRUE
Avg Lifetime Value TRUE
Days Between Purchases TRUE
Days Since Last Purchase TRUE
Historic Lifetime Value TRUE
Brand TRUE
Category TRUE
Top Level Category TRUE
Avg Cost TRUE
Default Vendor TRUE
Description TRUE
# of Items TRUE
Store FALSE
Date FALSE
Day of Month FALSE
Day of Week FALSE
Month FALSE
Month Name FALSE
Quarter of Year FALSE
Week FALSE
Week of Year FALSE
Year FALSE
Register FALSE
Sale ID FALSE
# of Sales TRUE
Avg Basket Value TRUE
Total TRUE
# of Sale Lines TRUE
Avg Discount TRUE
Avg Quantity TRUE
Avg Unit Price TRUE
Margin TRUE
Profit TRUE
Total TRUE
Cost TRUE
Quantity Sold TRUE"`


const DataPoint_Tax = `"Date Point Cannot Filter?
Company Name FALSE
Ls Account ID FALSE
City FALSE
State FALSE
Street Address 1 FALSE
Street Address 2 FALSE
Zip FALSE
Country FALSE
Full Name FALSE
Type FALSE
Store FALSE
Channel FALSE
Date FALSE
Day of Month FALSE
Day of Week FALSE
Month FALSE
Month Name FALSE
Quarter of Year FALSE
Week FALSE
Week of Year FALSE
Year FALSE
Employee FALSE
Register FALSE
Sale ID FALSE
Tax 1 Rate FALSE
Tax 2 Rate FALSE
Tax Name FALSE
# of Sales TRUE
Avg Basket Size TRUE
Avg Basket Value TRUE
Total Tax 1 TRUE
Total Tax 2 TRUE
Total Tax Paid TRUE
Margin FALSE
Quantity Sold FALSE
Discount Name FALSE
Is Layaway (Yes / No) FALSE
Is Miscellaneous (Yes / No) FALSE
Is Special Order (Yes / No) FALSE
Is Taxed (Yes / No) FALSE
Is Workorder (Yes / No) FALSE
Tax Class FALSE
Tax Class 1 Rate FALSE
Tax Class 2 Rate FALSE
# of Sale Lines TRUE
Avg Discount TRUE
Avg Quantity TRUE
Avg Unit Price TRUE
Margin TRUE
Profit TRUE
Cost TRUE
Quantity Sold TRUE
Subtotal TRUE
Total Discount TRUE
Total with Tax TRUE
City FALSE
State FALSE
Street Address 1 FALSE
Street Address 2 FALSE
Zip FALSE
Country FALSE"`


const DataPoint_OnOrder = `"Date Point Cannot Filter?
Company Name FALSE
Ls Account ID FALSE
Category FALSE
Brand FALSE
Category FALSE
Top Level Category FALSE
Custom SKU FALSE
EAN FALSE
Manufacturer SKU FALSE
System ID FALSE
UPC FALSE
Attribute 1 FALSE
Attribute 2 FALSE
Attribute 3 FALSE
Manufacturer SKU FALSE
Matrix FALSE
Price FALSE
Quantity on Hand TRUE
Receiving Shop FALSE
Sending Shop FALSE
Archived (Yes / No) FALSE
Complete (Yes / No) FALSE
Date FALSE
Day of Month FALSE
Day of Week FALSE
Month FALSE
Month Name FALSE
Quarter of Year FALSE
Week FALSE
Week of Year FALSE
Year FALSE
Date FALSE
On Order (Yes / No) FALSE
Order ID FALSE
Date FALSE
Week of Year FALSE
Year FALSE
Date FALSE
Day of Month FALSE
Day of Week FALSE
Month FALSE
Month Name FALSE
Quarter of Year FALSE
Week FALSE
Week of Year FALSE
Year FALSE
Transfer ID FALSE
Type FALSE
Vendor FALSE
# of Items TRUE
Cost of Ordered TRUE
Cost of Received TRUE
Order Discounts TRUE
Original Order Quantity TRUE
Quantity on Order TRUE
Retail Value on Order TRUE
Retail Value Received TRUE
Total Received Quantity TRUE"`


const DataPoint_Payment = `"Date Point Cannot Filter?
Company Name FALSE
Ls Account ID FALSE
Full Name FALSE
Type FALSE
Store FALSE
Channel FALSE
Date FALSE
Day of Month FALSE
Day of Week FALSE
Month FALSE
Month Name FALSE
Quarter of Year FALSE
Week FALSE
Week of Year FALSE
Year FALSE
Employee FALSE
Register FALSE
Sale ID FALSE
# of Sales TRUE
Avg Basket Size TRUE
Avg Basket Value TRUE
Margin FALSE
Quantity Sold FALSE
Discount Name FALSE
Is Layaway (Yes / No) FALSE
Is Miscellaneous (Yes / No) FALSE
Is Special Order (Yes / No) FALSE
Is Workorder (Yes / No) FALSE
Tax Class FALSE
# of Sale Lines TRUE
Avg Discount TRUE
Avg Quantity TRUE
Avg Unit Price TRUE
Margin TRUE
Profit TRUE
Cost TRUE
Quantity Sold TRUE
Payment Type FALSE
Amount TRUE"`


const DataPoints = [DataPoint_Sales,DataPoint_Items,DataPoint_Customers,DataPoint_Tax,DataPoint_OnOrder,DataPoint_Payment]






var full_resp = new String
var menu = document.createElement('select');
var DataPointMap = new Map
var resparray = new Array





function MapfromArrays(KeyArray,ValueArray){


for (var i = 0; i < ReportTypes.length; ++i) {
    DataPointMap.set(KeyArray[i],ValueArray[i])
}
}


function Afterburner(){

    MapfromArrays(ReportTypes,DataPoints)
    document.querySelector("#myButton").remove()
    let zNode = document.createElement('div');
    zNode.innerHTML = '<button id="myButton" type="button">'+ 'Generate Report </button>';
    zNode.setAttribute('id', 'myContainer');
    document.querySelector("body > div:nth-child(26) > div > div > div.css-1ou1w9z-ModalFooter.eblor9z0 > div").append(zNode);
    document.getElementById("myButton").addEventListener("click", Enginev3, false);
    GenDropdown(ReportTypes)
    //auto select the suggested base
    menu.selectedIndex = ReportTypes.indexOf(Base_LikelyBase.replaceAll(" ",""))

}


function GenDropdown(array){


    var markers = [];
    for (var i = 0; i < array.length; ++i) {
        markers[i] = document.createElement('option');
        markers[i].innerText = array[i]
        menu.appendChild(markers[i])
    }



    document.querySelector("body > div:nth-child(26) > div > div > div.css-1ou1w9z-ModalFooter.eblor9z0 > div").appendChild(menu);


}


async function Enginev3(){
console.log(ReportTypes[menu.selectedIndex])

await getFullReport(DataPointMap.get(ReportTypes[menu.selectedIndex],document.querySelector("body > div:nth-child(26) > div > div > div.css-1bkr611-ModalBody.egkbfm10 > div:nth-child(3) > textarea").innerHTML))


//placeholder to prevent a bunch of calls
/* full_resp = `Data Points: {Days Between Purchases, Days Since Last Purchase, # of Customers, Avg Lifetime Value, Historic Lifetime Value, Brand, Category, Top Level Category, Avg Cost, Default Vendor, Description}
Filters: {Days Between Purchases: IS IN THE LAST, Value 1: 1, Value 2: Days, # of Customers: IS >, Value 1: 100}
Pivots: {}
Sorting Column: {}` */

Chop(full_resp)

}








async function getFullReport(datapoint, vaguerequest, finetune) {


    let completeguardrails = datapoint +". "+ FullReportGuardRails
    let openAiRequestPlusGuardRails = completeguardrails  + ". " + vaguerequest + ". " + finetune + ". " + finetune

    let data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": openAiRequestPlusGuardRails}],
        "temperature": 0
    };


    var response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", //
        cache: "no-cache",
        Authorization: "Bearer sk-proj-WZwjOpTw4RuuGYDMgJkoT3BlbkFJdy209Tb2GnPG2KYp1MeA",
        contentType: 'application/json',
        n : 1,
        response_format : { "type": "json_object" },
        max_tokens : 600,

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer sk-proj-WZwjOpTw4RuuGYDMgJkoT3BlbkFJdy209Tb2GnPG2KYp1MeA",
        },
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(response=>response.json()).then(data=>{full_resp = (data)});
    ;


    full_resp = full_resp['choices'][0]['message']['content']
    console.log(full_resp)

}

function Chop(string){

   resparray = string.split("\n")
   if(string.length === 1)
   {resparray = string.split(",")}
   console.log(resparray)




}




/*


_______        _     _______      _____                       _      _____                           _   _
|__   __|      | |   |__   __|    |  __ \                     | |    / ____|                         | | (_)
   | | _____  _| |_     | | ___   | |__) |___ _ __   ___  _ __| |_  | |  __  ___ _ __   ___ _ __ __ _| |_ _  ___  _ __
   | |/ _ \ \/ / __|    | |/ _ \  |  _  // _ \ '_ \ / _ \| '__| __| | | |_ |/ _ \ '_ \ / _ \ '__/ _` | __| |/ _ \| '_ \
   | |  __/>  <| |_     | | (_) | | | \ \  __/ |_) | (_) | |  | |_  | |__| |  __/ | | |  __/ | | (_| | |_| | (_) | | | |
   |_|\___/_/\_\\__|    |_|\___/  |_|  \_\___| .__/ \___/|_|   \__|  \_____|\___|_| |_|\___|_|  \__,_|\__|_|\___/|_| |_|
                                             | |
                                             |_|
 */








//Data Tab listing
var fullloadedDataPointLookML = new Array //Data A:E
var fullloadedDataPointNoFilterOnly = new Array //Data H:J
var fullloadedDataPointNoUnfilterable = new Array //Data M:O
var fullloadedDataPointNumType = new Array //Data T:V
var fullloadedDataPointFilterTable = new Array //Data Y:Z

































































































































































/*
const DataLookML =
const DataNoFilterOnly =
const DataNoUnfilterable =
const DataNumType =
const DataFilterTable =


 */






const SalesDataLookML = [["Company Name","${cl_companies.company_name}","cl_companies.company_name","FALSE"],["Ls Account ID","${sales.ls_account_id}","sales.ls_account_id","FALSE"],["City","${contact_addresses.city}","contact_addresses.city","FALSE"],["State","${contact_addresses.state}","contact_addresses.state","FALSE"],["Street Address 1","${contact_addresses.address1}","contact_addresses.address1","FALSE"],["Street Address 2","${contact_addresses.address2}","contact_addresses.address2","FALSE"],["Zip","${contact_addresses.zip}","contact_addresses.zip","FALSE"],["Archived (Yes / No)","${customers.archived}","customers.archived","FALSE"],["Company","${customers.company}","customers.company","FALSE"],["Country","${contact_addresses.country}","contact_addresses.country","FALSE"],["Customer ID","${customers.customer_id}","customers.customer_id","FALSE"],["Date of birth","${customers.dob}","customers.dob","FALSE"],["Email","${contact_emails.address}","contact_emails.address","FALSE"],["First Name","${customers.first_name}","customers.first_name","FALSE"],["Full Name","${customers.full_name}","customers.full_name","FALSE"],["Last Name","${customers.last_name}","customers.last_name","FALSE"],["Home Phone","${contact_home_phones.number}","contact_home_phones.number","FALSE"],["Mobile Phone","${contact_mobile_phones.number}","contact_mobile_phones.number","FALSE"],["Work Phone","${contact_work_phones.number}","contact_work_phones.number","FALSE"],["Title","${customers.title}","customers.title","FALSE"],["Type","${customer_types.name}","customer_types.name","FALSE"],["Website","${contact_websites.url}","contact_websites.url","FALSE"],["Category (Filter)","FILTER ONLY","cl_category_parents.parent_category","FALSE"],["Quantity on Hand (Filter)","FILTER ONLY","cl_item_facts.quantity_on_hand_filter","FALSE"],["Archived (Yes / No)","${items.archived}","items.archived","FALSE"],["Brand","${manufacturers.name}","manufacturers.name","FALSE"],["Category","${categories.full_path_name}","categories.full_path_name","TRUE"],["Top Level Category","${cl_category_tops.top_level_category}","cl_category_tops.top_level_category","FALSE"],["Avg Cost","${items.avg_cost}","items.avg_cost","FALSE"],["Default Cost","${items.default_cost}","items.default_cost","FALSE"],["Default Vendor","${vendors.name}","vendors.name","FALSE"],["Description","${items.description}","items.description","FALSE"],["Custom SKU","${items.custom_sku}","items.custom_sku","FALSE"],["Default Vendor ID","${cl_item_vendor_nums.default_vendor_number}","cl_item_vendor_nums.default_vendor_number","FALSE"],["EAN","${items.EAN}","items.EAN","FALSE"],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku","FALSE"],["System ID","${items.system_sku}","items.system_sku","FALSE"],["UPC","${items.UPC}","items.UPC","FALSE"],["Item Type","${items.item_type}","items.item_type","FALSE"],["Attribute 1","${item_attributes.attribute1}","item_attributes.attribute1","FALSE"],["Attribute 2","${item_attributes.attribute2}","item_attributes.attribute2","FALSE"],["Attribute 3","${item_attributes.attribute3}","item_attributes.attribute3","FALSE"],["Manufacturer SKU","${item_matrices.manufacturer_sku}","item_matrices.manufacturer_sku","FALSE"],["Matrix","${item_matrices.description}","item_matrices.description","FALSE"],["Matrix Tag","${matrix_tags.name}","matrix_tags.name","FALSE"],["Price","${item_prices.amount}","item_prices.amount","FALSE"],["Single Tag","${tags.name}","tags.name","FALSE"],["# of Items","${items.count}","items.count","TRUE"],["Avg Default Price","${item_prices.avg_price}","item_prices.avg_price","TRUE"],["Quantity on Hand","${cl_item_facts.quantity_on_hand}","cl_item_facts.quantity_on_hand","TRUE"],["Quantity on Order","${cl_item_facts.quantity_on_order}","cl_item_facts.quantity_on_order","TRUE"],["Desired Inventory Level","${cl_item_facts.reorder_level}","cl_item_facts.reorder_level","TRUE"],["Reorder Point","${cl_item_facts.reorder_point}","cl_item_facts.reorder_point","TRUE"],["Store","${shops.name}","shops.name","FALSE"],["Channel","${cl_ecom_sales.sale_channel}","cl_ecom_sales.sale_channel","FALSE"],["Date","${sales.time_stamp_date}","sales.time_stamp_date","FALSE"],["Day of Month (Not Supported, use Date)","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month","FALSE"],["Day of Week (Not Supported, use Date)","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week","FALSE"],["Hour of Day (Not Supported, use Date)","${sales.time_stamp_hour_of_day}","sales.time_stamp_hour_of_day","FALSE"],["Month (Not Supported, use Date)","${sales.time_stamp_month}","sales.time_stamp_month","FALSE"],["Month Name ","${sales.time_stamp_month_name}","sales.time_stamp_month_name","FALSE"],["Quarter of Year (Not Supported, use Date)","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year","FALSE"],["Time (Not Supported, use Date)","${sales.time_stamp_time}","sales.time_stamp_time","FALSE"],["Week (Not Supported, use Date)","${sales.time_stamp_week}","sales.time_stamp_week","FALSE"],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year","FALSE"],["Year (Not Supported, use Date)","${sales.time_stamp_year}","sales.time_stamp_year","FALSE"],["Employee","${employees.full_name}","employees.full_name","FALSE"],["Employee Hours","${sale_employee_hours.hours_worked}","sale_employee_hours.hours_worked","FALSE"],["Employee Role","${employee_roles.name}","employee_roles.name","FALSE"],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop","FALSE"],["Sale ID","${sales.sale_id}","sales.sale_id","FALSE"],["# of Sales","${sale_lines.count_sales}","sale_lines.count_sales","TRUE"],["Average Sale Quantity","${sales.sale_average_quantity}","sales.sale_average_quantity","TRUE"],["Avg Basket Size","${sales.avg_basket_size}","sales.avg_basket_size","TRUE"],["Avg Basket Value","${sales.average_sale_no_tax}","sales.average_sale_no_tax","TRUE"],["Margin (Filter)","FILTER ONLY","sale_lines.margin_filter","FALSE"],["Quantity Sold (Filter)","FILTER ONLY","sale_lines.quantity_sold_filter","FALSE"],["Total (Filter)","FILTER ONLY","sale_lines.total_filter","FALSE"],["Discount Name","${discounts.name}","discounts.name","FALSE"],["Employee","${line_employees.full_name}","line_employees.full_name","FALSE"],["Employee Hours","${sale_line_employee_hours.hours_worked}","sale_line_employee_hours.hours_worked","FALSE"],["Employee Role","${line_employee_roles.name}","line_employee_roles.name","FALSE"],["Is Layaway (Yes / No)","${sale_lines.is_layaway}","sale_lines.is_layaway","FALSE"],["Is Miscellaneous (Yes / No)","${sale_lines.is_miscellaneous}","sale_lines.is_miscellaneous","FALSE"],["Is Special Order (Yes / No)","${sale_lines.is_special_order}","sale_lines.is_special_order","FALSE"],["Is Workorder (Yes / No)","${sale_lines.is_workorder}","sale_lines.is_workorder","FALSE"],["Sale Line ID","${sale_lines.sale_line_id}","sale_lines.sale_line_id","FALSE"],["Tax Class","${tax_classes.name}","tax_classes.name","FALSE"],["# of Sale Lines","${sale_lines.count}","sale_lines.count","TRUE"],["Avg Discount","${sale_lines.discount_avg}","sale_lines.discount_avg","TRUE"],["Avg Quantity","${sale_lines.unit_avg}","sale_lines.unit_avg","TRUE"],["Avg Unit Price","${sale_lines.price_avg}","sale_lines.price_avg","TRUE"],["Margin","${sale_lines.margin}","sale_lines.margin","TRUE"],["Profit","${sale_lines.profit}","sale_lines.profit","TRUE"],["Total","${sale_lines.total_sales_no_tax}","sale_lines.total_sales_no_tax","TRUE"],["Cost","${sale_lines.total_cost}","sale_lines.total_cost","TRUE"],["Quantity Sold","${sale_lines.unit_total}","sale_lines.unit_total","TRUE"],["Subtotal","${sale_lines.total_subtotal}","sale_lines.total_subtotal","TRUE"]]
const SalesDataNoFilterOnly = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${sales.ls_account_id}","sales.ls_account_id",""],["City","${contact_addresses.city}","contact_addresses.city",""],["State","${contact_addresses.state}","contact_addresses.state",""],["Street Address 1","${contact_addresses.address1}","contact_addresses.address1",""],["Street Address 2","${contact_addresses.address2}","contact_addresses.address2",""],["Zip","${contact_addresses.zip}","contact_addresses.zip",""],["Archived (Yes / No)","${customers.archived}","customers.archived",""],["Company","${customers.company}","customers.company",""],["Country","${contact_addresses.country}","contact_addresses.country",""],["Customer ID","${customers.customer_id}","customers.customer_id",""],["Date of birth","${customers.dob}","customers.dob",""],["Email","${contact_emails.address}","contact_emails.address",""],["First Name","${customers.first_name}","customers.first_name",""],["Full Name","${customers.full_name}","customers.full_name",""],["Last Name","${customers.last_name}","customers.last_name",""],["Home Phone","${contact_home_phones.number}","contact_home_phones.number",""],["Mobile Phone","${contact_mobile_phones.number}","contact_mobile_phones.number",""],["Work Phone","${contact_work_phones.number}","contact_work_phones.number",""],["Title","${customers.title}","customers.title",""],["Type","${customer_types.name}","customer_types.name",""],["Website","${contact_websites.url}","contact_websites.url",""],["Archived (Yes / No)","${items.archived}","items.archived",""],["Brand","${manufacturers.name}","manufacturers.name",""],["Category","${categories.full_path_name}","categories.full_path_name",""],["Top Level Category","${cl_category_tops.top_level_category}","cl_category_tops.top_level_category",""],["Avg Cost","${items.avg_cost}","items.avg_cost",""],["Default Cost","${items.default_cost}","items.default_cost",""],["Default Vendor","${vendors.name}","vendors.name",""],["Description","${items.description}","items.description",""],["Custom SKU","${items.custom_sku}","items.custom_sku",""],["Default Vendor ID","${cl_item_vendor_nums.default_vendor_number}","cl_item_vendor_nums.default_vendor_number",""],["EAN","${items.EAN}","items.EAN",""],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku",""],["System ID","${items.system_sku}","items.system_sku",""],["UPC","${items.UPC}","items.UPC",""],["Item Type","${items.item_type}","items.item_type",""],["Attribute 1","${item_attributes.attribute1}","item_attributes.attribute1",""],["Attribute 2","${item_attributes.attribute2}","item_attributes.attribute2",""],["Attribute 3","${item_attributes.attribute3}","item_attributes.attribute3",""],["Manufacturer SKU","${item_matrices.manufacturer_sku}","item_matrices.manufacturer_sku",""],["Matrix","${item_matrices.description}","item_matrices.description",""],["Matrix Tag","${matrix_tags.name}","matrix_tags.name",""],["Price","${item_prices.amount}","item_prices.amount",""],["Single Tag","${tags.name}","tags.name",""],["# of Items","${items.count}","items.count",""],["Avg Default Price","${item_prices.avg_price}","item_prices.avg_price",""],["Quantity on Hand","${cl_item_facts.quantity_on_hand}","cl_item_facts.quantity_on_hand",""],["Quantity on Order","${cl_item_facts.quantity_on_order}","cl_item_facts.quantity_on_order",""],["Desired Inventory Level","${cl_item_facts.reorder_level}","cl_item_facts.reorder_level",""],["Reorder Point","${cl_item_facts.reorder_point}","cl_item_facts.reorder_point",""],["Store","${shops.name}","shops.name",""],["Channel","${cl_ecom_sales.sale_channel}","cl_ecom_sales.sale_channel",""],["Date","${sales.time_stamp_date}","sales.time_stamp_date",""],["Day of Month (Not Supported, use Date)","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month",""],["Day of Week (Not Supported, use Date)","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week",""],["Hour of Day (Not Supported, use Date)","${sales.time_stamp_hour_of_day}","sales.time_stamp_hour_of_day",""],["Month (Not Supported, use Date)","${sales.time_stamp_month}","sales.time_stamp_month",""],["Month Name ","${sales.time_stamp_month_name}","sales.time_stamp_month_name",""],["Quarter of Year (Not Supported, use Date)","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year",""],["Time (Not Supported, use Date)","${sales.time_stamp_time}","sales.time_stamp_time",""],["Week (Not Supported, use Date)","${sales.time_stamp_week}","sales.time_stamp_week",""],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year",""],["Year","${sales.time_stamp_year}","sales.time_stamp_year",""],["Employee","${employees.full_name}","employees.full_name",""],["Employee Hours","${sale_employee_hours.hours_worked}","sale_employee_hours.hours_worked",""],["Employee Role","${employee_roles.name}","employee_roles.name",""],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop",""],["Sale ID","${sales.sale_id}","sales.sale_id",""],["# of Sales","${sale_lines.count_sales}","sale_lines.count_sales",""],["Average Sale Quantity","${sales.sale_average_quantity}","sales.sale_average_quantity",""],["Avg Basket Size","${sales.avg_basket_size}","sales.avg_basket_size",""],["Avg Basket Value","${sales.average_sale_no_tax}","sales.average_sale_no_tax",""],["Discount Name","${discounts.name}","discounts.name",""],["Employee","${line_employees.full_name}","line_employees.full_name",""],["Employee Hours","${sale_line_employee_hours.hours_worked}","sale_line_employee_hours.hours_worked",""],["Employee Role","${line_employee_roles.name}","line_employee_roles.name",""],["Is Layaway (Yes / No)","${sale_lines.is_layaway}","sale_lines.is_layaway",""],["Is Miscellaneous (Yes / No)","${sale_lines.is_miscellaneous}","sale_lines.is_miscellaneous",""],["Is Special Order (Yes / No)","${sale_lines.is_special_order}","sale_lines.is_special_order",""],["Is Workorder (Yes / No)","${sale_lines.is_workorder}","sale_lines.is_workorder",""],["Sale Line ID","${sale_lines.sale_line_id}","sale_lines.sale_line_id",""],["Tax Class","${tax_classes.name}","tax_classes.name",""],["# of Sale Lines","${sale_lines.count}","sale_lines.count",""],["Avg Discount","${sale_lines.discount_avg}","sale_lines.discount_avg",""],["Avg Quantity","${sale_lines.unit_avg}","sale_lines.unit_avg",""],["Avg Unit Price","${sale_lines.price_avg}","sale_lines.price_avg",""],["Margin","${sale_lines.margin}","sale_lines.margin",""],["Profit","${sale_lines.profit}","sale_lines.profit",""],["Total","${sale_lines.total_sales_no_tax}","sale_lines.total_sales_no_tax",""],["Cost","${sale_lines.total_cost}","sale_lines.total_cost",""],["Quantity Sold","${sale_lines.unit_total}","sale_lines.unit_total",""],["Subtotal","${sale_lines.total_subtotal}","sale_lines.total_subtotal",""],["City","${shipping_addresses.city}","shipping_addresses.city",""],["State","${shipping_addresses.state}","shipping_addresses.state",""],["Street Address 1","${shipping_addresses.address1}","shipping_addresses.address1",""],["Street Address 2","${shipping_addresses.address2}","shipping_addresses.address2",""]]
const SalesDataNoUnfilterable = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${sales.ls_account_id}","sales.ls_account_id",""],["City","${contact_addresses.city}","contact_addresses.city",""],["State","${contact_addresses.state}","contact_addresses.state",""],["Street Address 1","${contact_addresses.address1}","contact_addresses.address1",""],["Street Address 2","${contact_addresses.address2}","contact_addresses.address2",""],["Zip","${contact_addresses.zip}","contact_addresses.zip",""],["Archived (Yes / No)","${customers.archived}","customers.archived",""],["Company","${customers.company}","customers.company",""],["Country","${contact_addresses.country}","contact_addresses.country",""],["Customer ID","${customers.customer_id}","customers.customer_id",""],["Date of birth","${customers.dob}","customers.dob",""],["Email","${contact_emails.address}","contact_emails.address",""],["First Name","${customers.first_name}","customers.first_name",""],["Full Name","${customers.full_name}","customers.full_name",""],["Last Name","${customers.last_name}","customers.last_name",""],["Home Phone","${contact_home_phones.number}","contact_home_phones.number",""],["Mobile Phone","${contact_mobile_phones.number}","contact_mobile_phones.number",""],["Work Phone","${contact_work_phones.number}","contact_work_phones.number",""],["Title","${customers.title}","customers.title",""],["Type","${customer_types.name}","customer_types.name",""],["Website","${contact_websites.url}","contact_websites.url",""],["Category","FILTER ONLY","cl_category_parents.parent_category",""],["Quantity on Hand","FILTER ONLY","cl_item_facts.quantity_on_hand_filter",""],["Archived (Yes / No)","${items.archived}","items.archived",""],["Brand","${manufacturers.name}","manufacturers.name",""],["Top Level Category","${cl_category_tops.top_level_category}","cl_category_tops.top_level_category",""],["Avg Cost","${items.avg_cost}","items.avg_cost",""],["Default Cost","${items.default_cost}","items.default_cost",""],["Default Vendor","${vendors.name}","vendors.name",""],["Description","${items.description}","items.description",""],["Custom SKU","${items.custom_sku}","items.custom_sku",""],["Default Vendor ID","${cl_item_vendor_nums.default_vendor_number}","cl_item_vendor_nums.default_vendor_number",""],["EAN","${items.EAN}","items.EAN",""],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku",""],["System ID","${items.system_sku}","items.system_sku",""],["UPC","${items.UPC}","items.UPC",""],["Item Type","${items.item_type}","items.item_type",""],["Attribute 1","${item_attributes.attribute1}","item_attributes.attribute1",""],["Attribute 2","${item_attributes.attribute2}","item_attributes.attribute2",""],["Attribute 3","${item_attributes.attribute3}","item_attributes.attribute3",""],["Manufacturer SKU","${item_matrices.manufacturer_sku}","item_matrices.manufacturer_sku",""],["Matrix","${item_matrices.description}","item_matrices.description",""],["Matrix Tag","${matrix_tags.name}","matrix_tags.name",""],["Price","${item_prices.amount}","item_prices.amount",""],["Single Tag","${tags.name}","tags.name",""],["Store","${shops.name}","shops.name",""],["Channel","${cl_ecom_sales.sale_channel}","cl_ecom_sales.sale_channel",""],["Date","${sales.time_stamp_date}","sales.time_stamp_date",""],["Day of Month (Not Supported, use Date)","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month",""],["Day of Week (Not Supported, use Date)","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week",""],["Hour of Day (Not Supported, use Date)","${sales.time_stamp_hour_of_day}","sales.time_stamp_hour_of_day",""],["Month (Not Supported, use Date)","${sales.time_stamp_month}","sales.time_stamp_month",""],["Month Name ","${sales.time_stamp_month_name}","sales.time_stamp_month_name",""],["Quarter of Year (Not Supported, use Date)","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year",""],["Time (Not Supported, use Date)","${sales.time_stamp_time}","sales.time_stamp_time",""],["Week (Not Supported, use Date)","${sales.time_stamp_week}","sales.time_stamp_week",""],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year",""],["Year (Not Supported, use Date)","${sales.time_stamp_year}","sales.time_stamp_year",""],["Employee","${employees.full_name}","employees.full_name",""],["Employee Hours","${sale_employee_hours.hours_worked}","sale_employee_hours.hours_worked",""],["Employee Role","${employee_roles.name}","employee_roles.name",""],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop",""],["Sale ID","${sales.sale_id}","sales.sale_id",""],["Margin (Filter)","FILTER ONLY","sale_lines.margin_filter",""],["Quantity Sold (Filter)","FILTER ONLY","sale_lines.quantity_sold_filter",""],["Total (Filter)","FILTER ONLY","sale_lines.total_filter",""],["Discount Name","${discounts.name}","discounts.name",""],["Employee","${line_employees.full_name}","line_employees.full_name",""],["Employee Hours","${sale_line_employee_hours.hours_worked}","sale_line_employee_hours.hours_worked",""],["Employee Role","${line_employee_roles.name}","line_employee_roles.name",""],["Is Layaway (Yes / No)","${sale_lines.is_layaway}","sale_lines.is_layaway",""],["Is Miscellaneous (Yes / No)","${sale_lines.is_miscellaneous}","sale_lines.is_miscellaneous",""],["Is Special Order (Yes / No)","${sale_lines.is_special_order}","sale_lines.is_special_order",""],["Is Workorder (Yes / No)","${sale_lines.is_workorder}","sale_lines.is_workorder",""],["Sale Line ID","${sale_lines.sale_line_id}","sale_lines.sale_line_id",""],["Tax Class","${tax_classes.name}","tax_classes.name",""],["City","${shipping_addresses.city}","shipping_addresses.city",""],["State","${shipping_addresses.state}","shipping_addresses.state",""],["Street Address 1","${shipping_addresses.address1}","shipping_addresses.address1",""],["Street Address 2","${shipping_addresses.address2}","shipping_addresses.address2",""],["Zip","${shipping_addresses.zip}","shipping_addresses.zip",""],["Country","${shipping_addresses.country}","shipping_addresses.country",""],["Date","${sales.time_stamp_date}","sales.time_stamp_date",""],["Day of Month (Not Supported, use Date)","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month",""],["Day of Week (Not Supported, use Date)","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week",""],["Hour of Day (Not Supported, use Date)","${sales.time_stamp_hour_of_day}","sales.time_stamp_hour_of_day",""],["Month (Not Supported, use Date)","${sales.time_stamp_month}","sales.time_stamp_month",""],["Month Name ","${sales.time_stamp_month_name}","sales.time_stamp_month_name",""],["Quarter of Year (Not Supported, use Date)","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year",""],["Time (Not Supported, use Date)","${sales.time_stamp_time}","sales.time_stamp_time",""],["Week (Not Supported, use Date)","${sales.time_stamp_week}","sales.time_stamp_week",""],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year",""],["Year","${sales.time_stamp_year}","sales.time_stamp_year",""]]
const SalesDataNumType = [["Ls Account ID","${sales.ls_account_id}","sales.ls_account_id",""],["Customer ID","${customers.customer_id}","customers.customer_id",""],["Avg Cost","${items.avg_cost}","items.avg_cost",""],["Default Cost","${items.default_cost}","items.default_cost",""],["Price","${item_prices.amount}","item_prices.amount",""],["Employee Hours","${sale_employee_hours.hours_worked}","sale_employee_hours.hours_worked",""],["Margin","FILTER ONLY","sale_lines.margin_filter",""],["Quantity Sold","FILTER ONLY","sale_lines.quantity_sold_filter",""],["Total","FILTER ONLY","sale_lines.total_filter",""]]
const SalesDataFilterTable = [["Company Name","FALSE","",""],["Ls Account ID","FALSE","",""],["City","FALSE","",""],["State","FALSE","",""],["Street Address 1","FALSE","",""],["Street Address 2","FALSE","",""],["Zip","FALSE","",""],["Archived (Yes / No)","FALSE","",""],["Company","FALSE","",""],["Country","FALSE","",""],["Customer ID","FALSE","",""],["Date of birth","FALSE","",""],["Email","FALSE","",""],["First Name","FALSE","",""],["Full Name","FALSE","",""],["Last Name","FALSE","",""],["Home Phone","FALSE","",""],["Mobile Phone","FALSE","",""],["Work Phone","FALSE","",""],["Title","FALSE","",""],["Type","FALSE","",""],["Website","FALSE","",""],["Category (Filter)","FALSE","",""],["Quantity on Hand (Filter)","FALSE","",""],["Archived (Yes / No)","FALSE","",""],["Brand","FALSE","",""],["Category","TRUE","",""],["Top Level Category","FALSE","",""],["Avg Cost","FALSE","",""],["Default Cost","FALSE","",""],["Default Vendor","FALSE","",""],["Description","FALSE","",""],["Custom SKU","FALSE","",""],["Default Vendor ID","FALSE","",""],["EAN","FALSE","",""],["Manufacturer SKU","FALSE","",""],["System ID","FALSE","",""],["UPC","FALSE","",""],["Item Type","FALSE","",""],["Attribute 1","FALSE","",""],["Attribute 2","FALSE","",""],["Attribute 3","FALSE","",""],["Manufacturer SKU","FALSE","",""],["Matrix","FALSE","",""],["Matrix Tag","FALSE","",""],["Price","FALSE","",""],["Single Tag","FALSE","",""],["# of Items","TRUE","",""],["Avg Default Price","TRUE","",""],["Quantity on Hand","TRUE","",""],["Quantity on Order","TRUE","",""],["Desired Inventory Level","TRUE","",""],["Reorder Point","TRUE","",""],["Store","FALSE","",""],["Channel","FALSE","",""],["Date","FALSE","",""],["Day of Month (Not Supported, use Date)","FALSE","",""],["Day of Week (Not Supported, use Date)","FALSE","",""],["Hour of Day (Not Supported, use Date)","FALSE","",""],["Month (Not Supported, use Date)","FALSE","",""],["Month Name ","FALSE","",""],["Quarter of Year (Not Supported, use Date)","FALSE","",""],["Time (Not Supported, use Date)","FALSE","",""],["Week (Not Supported, use Date)","FALSE","",""],["Week of Year","FALSE","",""],["Year (Not Supported, use Date)","FALSE","",""],["Employee","FALSE","",""],["Employee Hours","FALSE","",""],["Employee Role","FALSE","",""],["Register","FALSE","",""],["Sale ID","FALSE","",""],["# of Sales","TRUE","",""],["Average Sale Quantity","TRUE","",""],["Avg Basket Size","TRUE","",""],["Avg Basket Value","TRUE","",""],["Margin (Filter)","FALSE","",""],["Quantity Sold (Filter)","FALSE","",""],["Total (Filter)","FALSE","",""],["Discount Name","FALSE","",""],["Employee","FALSE","",""],["Employee Hours","FALSE","",""],["Employee Role","FALSE","",""],["Is Layaway (Yes / No)","FALSE","",""],["Is Miscellaneous (Yes / No)","FALSE","",""],["Is Special Order (Yes / No)","FALSE","",""],["Is Workorder (Yes / No)","FALSE","",""],["Sale Line ID","FALSE","",""],["Tax Class","FALSE","",""],["# of Sale Lines","TRUE","",""],["Avg Discount","TRUE","",""],["Avg Quantity","TRUE","",""],["Avg Unit Price","TRUE","",""],["Margin","TRUE","",""],["Profit","TRUE","",""],["Total","TRUE","",""],["Cost","TRUE","",""],["Quantity Sold","TRUE","",""],["Subtotal","TRUE","",""]]

const ItemDataLookML = [["Company Name","${cl_companies.company_name}","cl_companies.company_name","FALSE"],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id","FALSE"],["Average Lead Time","${cl_dynamic_reorder_vendor.average_lead_time}","cl_dynamic_reorder_vendor.average_lead_time","FALSE"],["Forecast Period","${cl_dynamic_reorder_inventory.forecast_period}","cl_dynamic_reorder_inventory.forecast_period","TRUE"],["Trailing Sales Period","${cl_dynamic_reorder_inventory.trailing_sales_period}","cl_dynamic_reorder_inventory.trailing_sales_period","TRUE"],["Days of Cover","${cl_item_facts.days_to_sell_out_dynamic}","cl_item_facts.days_to_sell_out_dynamic","TRUE"],["Dynamic Reorder Level","${item_shops.dynamic_reorder_level}","item_shops.dynamic_reorder_level","TRUE"],["Dynamic Reorder Point","${item_shops.dynamic_reorder_point}","item_shops.dynamic_reorder_point","TRUE"],["Quantity to Order","${cl_item_facts.quantity_to_order}","cl_item_facts.quantity_to_order","TRUE"],["Trailing Average Daily Sales","${item_shops.trailing_avg_daily_sales}","item_shops.trailing_avg_daily_sales","TRUE"],["Category","${cl_category_parents.parent_category}","cl_category_parents.parent_category","FALSE"],["Include Archived","${items.archived}","items.archived","FALSE"],["Brand","${manufacturers.name}","manufacturers.name","FALSE"],["Category","FILTER ONLY","cl_category_parents.parent_category","TRUE"],["Top Level Category","FILTER ONLY","cl_item_facts.quantity_on_hand_filter","TRUE"],["Avg Cost","${items.avg_cost}","items.avg_cost","FALSE"],["Default Cost","${items.default_cost}","items.default_cost","FALSE"],["Default Vendor","${vendors.name}","vendors.name","FALSE"],["Description","${items.description}","items.description","FALSE"],["Custom SKU","${items.custom_sku}","items.custom_sku","FALSE"],["Default Vendor ID","${cl_item_vendor_nums.default_vendor_number}","cl_item_vendor_nums.default_vendor_number","FALSE"],["EAN","${items.EAN}","items.EAN","FALSE"],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku","FALSE"],["System ID","${items.system_sku}","items.system_sku","FALSE"],["UPC","${items.UPC}","items.UPC","FALSE"],["Item Type","${items.item_type}","items.item_type","FALSE"],["Attribute 1","${item_attributes.attribute1}","item_attributes.attribute1","FALSE"],["Attribute 2","${item_attributes.attribute2}","item_attributes.attribute2","FALSE"],["Attribute 3","${item_attributes.attribute3}","item_attributes.attribute3","FALSE"],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku","FALSE"],["Matrix","${item_matrices.description}","item_matrices.description","FALSE"],["Matrix Tag","${matrix_tags.name}","matrix_tags.name","FALSE"],["Single Tag","${tags.name}","tags.name","FALSE"],["Tax Class","${tax_classes.name}","tax_classes.name","FALSE"],["# of Items","${items.count}","items.count","TRUE"],["Days Since Counted","FILTER ONLY","cl_item_facts.days_since_counted_filter","FALSE"],["Days Since Received","FILTER ONLY","cl_item_facts.days_since_received_filter","FALSE"],["Days Since Sold","FILTER ONLY","cl_item_facts.days_since_sold_filter","FALSE"],["Days To Sell Out","FILTER ONLY","cl_item_facts.days_to_sell_out_filter","FALSE"],["Last Received Date","FILTER ONLY","cl_item_facts.last_received_date_filter","FALSE"],["Last Sold Date","FILTER ONLY","cl_item_facts.last_sold_date_filter","FALSE"],["Quantity on Order","FILTER ONLY","cl_item_facts.quantity_on_order_filter","FALSE"],["Quantity to Order","FILTER ONLY","cl_item_facts.quantity_to_order_filter","FALSE"],["Quantity on Hand","FILTER ONLY","cl_item_facts.quantity_on_hand_filter","FALSE"],["Desired Inventory Level","FILTER ONLY","cl_item_facts.desired_inventory_level_filter","FALSE"],["Reorder Point","FILTER ONLY","cl_item_facts.reorder_point_filter","FALSE"],["Lifetime Quantity Sold","FILTER ONLY","cl_item_facts.lifetime_quantity_sold_filter","FALSE"],["Lifetime Sales","FILTER ONLY","cl_item_facts.lifetime_sales_filter","FALSE"],["Tag Collection","FILTER ONLY","cl_item_facts.list_of_tag_filter","FALSE"],["365 Day GMROI","FILTER ONLY","cl_inventory_turns_and_gmroi.gmroi_365_filter","FALSE"],["365 Day Turns","FILTER ONLY","cl_inventory_turns_and_gmroi.three_hundred_sixty_five_day_turns_filter","FALSE"],["Last Year GMROI","FILTER ONLY","cl_inventory_turns_and_gmroi.gmroi_last_year_filter","FALSE"],["Last Year Turns","FILTER ONLY","cl_inventory_turns_and_gmroi.last_year_turns_filter","FALSE"],["Date (first_received_date_date)","${cl_item_facts.first_received_date_date}","cl_item_facts.first_received_date_date","FALSE"],["Is Dusty (Yes / No)","${cl_item_facts.is_dusty}","cl_item_facts.is_dusty","FALSE"],["Is Included (Yes / No)","${cl_item_facts.is_included}","cl_item_facts.is_included","FALSE"],["On Order (Yes / No)","${cl_item_facts.on_order}","cl_item_facts.on_order","FALSE"],["On Transfer (Yes / No)","${cl_item_facts.on_transfer}","cl_item_facts.on_transfer","FALSE"],["Price","${item_prices.amount}","item_prices.amount","FALSE"],["Days Since Counted","${cl_item_facts.days_since_counted}","cl_item_facts.days_since_counted","TRUE"],["Days Since First Received","${cl_item_facts.days_since_first_received}","cl_item_facts.days_since_first_received","TRUE"],["Days Since Received","${cl_item_facts.days_since_received}","cl_item_facts.days_since_received","TRUE"],["Days Since Sold","${cl_item_facts.days_since_sold}","cl_item_facts.days_since_sold","TRUE"],["Days to Sell Out","${cl_item_facts.days_to_sell_out}","cl_item_facts.days_to_sell_out","TRUE"],["Avg Default Price","${item_prices.avg_price}","item_prices.avg_price","TRUE"],["365 Day Avg Inventory","${cl_inventory_turns_and_gmroi.three_hundred_sixty_five_days_avg_inv}","cl_inventory_turns_and_gmroi.three_hundred_sixty_five_days_avg_inv","TRUE"],["Last Year Avg Inventory","${cl_inventory_turns_and_gmroi.last_year_avg_inv}","cl_inventory_turns_and_gmroi.last_year_avg_inv","TRUE"],["Quantity on Hand","${cl_item_facts.quantity_on_hand}","cl_item_facts.quantity_on_hand","TRUE"],["Total Cost","${cl_item_facts.cost_value}","cl_item_facts.cost_value","TRUE"],["Total Retail Value","${cl_item_facts.retail_value}","cl_item_facts.retail_value","TRUE"],["Cost on Order","${cl_item_facts.cost_on_order}","cl_item_facts.cost_on_order","TRUE"],["Lifetime Received Quantity","${cl_item_facts.lifetime_received_quantity}","cl_item_facts.lifetime_received_quantity","TRUE"],["Quantity on Order","${cl_item_facts.quantity_on_order}","cl_item_facts.quantity_on_order","TRUE"],["Desired Inventory Level","${cl_item_facts.reorder_level}","cl_item_facts.reorder_level","TRUE"],["Reorder Point","${cl_item_facts.reorder_point}","cl_item_facts.reorder_point","TRUE"],["Lifetime Quantity Sold","${cl_item_facts.lifetime_quantity_sold}","cl_item_facts.lifetime_quantity_sold","TRUE"],["Lifetime Sales","${cl_item_facts.lifetime_sales}","cl_item_facts.lifetime_sales","TRUE"],["365 Day GMROI","${cl_inventory_turns_and_gmroi.gmroi_365}","cl_inventory_turns_and_gmroi.gmroi_365","TRUE"],["365 Day Turns","${cl_inventory_turns_and_gmroi.three_hundred_sixty_five_days_turns}","cl_inventory_turns_and_gmroi.three_hundred_sixty_five_days_turns","TRUE"],["Last Month GMROI","${cl_inventory_turns_and_gmroi.gmroi_last_month}","cl_inventory_turns_and_gmroi.gmroi_last_month","TRUE"],["Last Month Turns","${cl_inventory_turns_and_gmroi.last_month_turns}","cl_inventory_turns_and_gmroi.last_month_turns","TRUE"],["Last Year GMROI","${cl_inventory_turns_and_gmroi.gmroi_last_year}","cl_inventory_turns_and_gmroi.gmroi_last_year","TRUE"],["Last Year Turns","${cl_inventory_turns_and_gmroi.last_year_turns}","cl_inventory_turns_and_gmroi.last_year_turns","TRUE"],["Days Since PO Received","FILTER ONLY","cl_item_facts.days_since_po_received_filter","FALSE"],["Days Since Transfer Received","FILTER ONLY","cl_item_facts.days_since_transferred_filter","FALSE"],["Store","${shops.name}","shops.name","FALSE"],["Days Since PO Received","${cl_item_facts.days_since_po_received}","cl_item_facts.days_since_po_received","TRUE"],["Days Since Transfer Received","${cl_item_facts.days_since_transferred}","cl_item_facts.days_since_transferred","TRUE"],["Completed Date","${cl_item_shop_sales.completed_date}","cl_item_shop_sales.completed_date","FALSE"],["Register","${cl_item_shop_sales.register_filter}","cl_item_shop_sales.register_filter","FALSE"],["# of Lines","${cl_item_shop_sales.sum_count_sale_lines}","cl_item_shop_sales.sum_count_sale_lines","TRUE"],["# of Sales","${cl_item_shop_sales.sum_count_sales}","cl_item_shop_sales.sum_count_sales","TRUE"],["Avg Basket Size","${cl_item_shop_sales.avg_basket_size}","cl_item_shop_sales.avg_basket_size","TRUE"],["Avg Discount Percent","${cl_item_shop_sales.avg_discount_percent}","cl_item_shop_sales.avg_discount_percent","TRUE"],["Avg Price","${cl_item_shop_sales.avg_price}","cl_item_shop_sales.avg_price","TRUE"],["Cost","${cl_item_shop_sales.total_avg_cost}","cl_item_shop_sales.total_avg_cost","TRUE"],["Margin","${cl_item_shop_sales.total_margin}","cl_item_shop_sales.total_margin","TRUE"],["Profit","${cl_item_shop_sales.total_profit}","cl_item_shop_sales.total_profit","TRUE"],["Quantity Sold","${cl_item_shop_sales.total_quantity}","cl_item_shop_sales.total_quantity","TRUE"],["Total","${cl_item_shop_sales.sum_total_no_tax}","cl_item_shop_sales.sum_total_no_tax","TRUE"],["Total Discounts","${cl_item_shop_sales.total_discounts}","cl_item_shop_sales.total_discounts","TRUE"]]
const ItemDataNoFilterOnly = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["Average Lead Time","${cl_dynamic_reorder_vendor.average_lead_time}","cl_dynamic_reorder_vendor.average_lead_time",""],["Forecast Period","${cl_dynamic_reorder_inventory.forecast_period}","cl_dynamic_reorder_inventory.forecast_period",""],["Trailing Sales Period","${cl_dynamic_reorder_inventory.trailing_sales_period}","cl_dynamic_reorder_inventory.trailing_sales_period",""],["Days of Cover","${cl_item_facts.days_to_sell_out_dynamic}","cl_item_facts.days_to_sell_out_dynamic",""],["Dynamic Reorder Level","${item_shops.dynamic_reorder_level}","item_shops.dynamic_reorder_level",""],["Dynamic Reorder Point","${item_shops.dynamic_reorder_point}","item_shops.dynamic_reorder_point",""],["Quantity to Order","${cl_item_facts.quantity_to_order}","cl_item_facts.quantity_to_order",""],["Trailing Average Daily Sales","${item_shops.trailing_avg_daily_sales}","item_shops.trailing_avg_daily_sales",""],["Category","${cl_category_parents.parent_category}","cl_category_parents.parent_category",""],["Include Archived","${items.archived}","items.archived",""],["Brand","${manufacturers.name}","manufacturers.name",""],["Avg Cost","${items.avg_cost}","items.avg_cost",""],["Default Cost","${items.default_cost}","items.default_cost",""],["Default Vendor","${vendors.name}","vendors.name",""],["Description","${items.description}","items.description",""],["Custom SKU","${items.custom_sku}","items.custom_sku",""],["Default Vendor ID","${cl_item_vendor_nums.default_vendor_number}","cl_item_vendor_nums.default_vendor_number",""],["EAN","${items.EAN}","items.EAN",""],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku",""],["System ID","${items.system_sku}","items.system_sku",""],["UPC","${items.UPC}","items.UPC",""],["Item Type","${items.item_type}","items.item_type",""],["Attribute 1","${item_attributes.attribute1}","item_attributes.attribute1",""],["Attribute 2","${item_attributes.attribute2}","item_attributes.attribute2",""],["Attribute 3","${item_attributes.attribute3}","item_attributes.attribute3",""],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku",""],["Matrix","${item_matrices.description}","item_matrices.description",""],["Matrix Tag","${matrix_tags.name}","matrix_tags.name",""],["Single Tag","${tags.name}","tags.name",""],["Tax Class","${tax_classes.name}","tax_classes.name",""],["# of Items","${items.count}","items.count",""],["Date (first_received_date_date)","${cl_item_facts.first_received_date_date}","cl_item_facts.first_received_date_date",""],["Is Dusty (Yes / No)","${cl_item_facts.is_dusty}","cl_item_facts.is_dusty",""],["Is Included (Yes / No)","${cl_item_facts.is_included}","cl_item_facts.is_included",""],["On Order (Yes / No)","${cl_item_facts.on_order}","cl_item_facts.on_order",""],["On Transfer (Yes / No)","${cl_item_facts.on_transfer}","cl_item_facts.on_transfer",""],["Price","${item_prices.amount}","item_prices.amount",""],["Days Since Counted","${cl_item_facts.days_since_counted}","cl_item_facts.days_since_counted",""],["Days Since First Received","${cl_item_facts.days_since_first_received}","cl_item_facts.days_since_first_received",""],["Days Since Received","${cl_item_facts.days_since_received}","cl_item_facts.days_since_received",""],["Days Since Sold","${cl_item_facts.days_since_sold}","cl_item_facts.days_since_sold",""],["Days to Sell Out","${cl_item_facts.days_to_sell_out}","cl_item_facts.days_to_sell_out",""],["Avg Default Price","${item_prices.avg_price}","item_prices.avg_price",""],["365 Day Avg Inventory","${cl_inventory_turns_and_gmroi.three_hundred_sixty_five_days_avg_inv}","cl_inventory_turns_and_gmroi.three_hundred_sixty_five_days_avg_inv",""],["Last Year Avg Inventory","${cl_inventory_turns_and_gmroi.last_year_avg_inv}","cl_inventory_turns_and_gmroi.last_year_avg_inv",""],["Quantity on Hand","${cl_item_facts.quantity_on_hand}","cl_item_facts.quantity_on_hand",""],["Total Cost","${cl_item_facts.cost_value}","cl_item_facts.cost_value",""],["Total Retail Value","${cl_item_facts.retail_value}","cl_item_facts.retail_value",""],["Cost on Order","${cl_item_facts.cost_on_order}","cl_item_facts.cost_on_order",""],["Lifetime Received Quantity","${cl_item_facts.lifetime_received_quantity}","cl_item_facts.lifetime_received_quantity",""],["Quantity on Order","${cl_item_facts.quantity_on_order}","cl_item_facts.quantity_on_order",""],["Desired Inventory Level","${cl_item_facts.reorder_level}","cl_item_facts.reorder_level",""],["Reorder Point","${cl_item_facts.reorder_point}","cl_item_facts.reorder_point",""],["Lifetime Quantity Sold","${cl_item_facts.lifetime_quantity_sold}","cl_item_facts.lifetime_quantity_sold",""],["Lifetime Sales","${cl_item_facts.lifetime_sales}","cl_item_facts.lifetime_sales",""],["365 Day GMROI","${cl_inventory_turns_and_gmroi.gmroi_365}","cl_inventory_turns_and_gmroi.gmroi_365",""],["365 Day Turns","${cl_inventory_turns_and_gmroi.three_hundred_sixty_five_days_turns}","cl_inventory_turns_and_gmroi.three_hundred_sixty_five_days_turns",""],["Last Month GMROI","${cl_inventory_turns_and_gmroi.gmroi_last_month}","cl_inventory_turns_and_gmroi.gmroi_last_month",""],["Last Month Turns","${cl_inventory_turns_and_gmroi.last_month_turns}","cl_inventory_turns_and_gmroi.last_month_turns",""],["Last Year GMROI","${cl_inventory_turns_and_gmroi.gmroi_last_year}","cl_inventory_turns_and_gmroi.gmroi_last_year",""],["Last Year Turns","${cl_inventory_turns_and_gmroi.last_year_turns}","cl_inventory_turns_and_gmroi.last_year_turns",""],["Store","${shops.name}","shops.name",""],["Days Since PO Received","${cl_item_facts.days_since_po_received}","cl_item_facts.days_since_po_received",""],["Days Since Transfer Received","${cl_item_facts.days_since_transferred}","cl_item_facts.days_since_transferred",""],["Completed Date","${cl_item_shop_sales.completed_date}","cl_item_shop_sales.completed_date",""],["Register","${cl_item_shop_sales.register_filter}","cl_item_shop_sales.register_filter",""],["# of Lines","${cl_item_shop_sales.sum_count_sale_lines}","cl_item_shop_sales.sum_count_sale_lines",""],["# of Sales","${cl_item_shop_sales.sum_count_sales}","cl_item_shop_sales.sum_count_sales",""],["Avg Basket Size","${cl_item_shop_sales.avg_basket_size}","cl_item_shop_sales.avg_basket_size",""],["Avg Discount Percent","${cl_item_shop_sales.avg_discount_percent}","cl_item_shop_sales.avg_discount_percent",""],["Avg Price","${cl_item_shop_sales.avg_price}","cl_item_shop_sales.avg_price",""],["Cost","${cl_item_shop_sales.total_avg_cost}","cl_item_shop_sales.total_avg_cost",""],["Margin","${cl_item_shop_sales.total_margin}","cl_item_shop_sales.total_margin",""],["Profit","${cl_item_shop_sales.total_profit}","cl_item_shop_sales.total_profit",""],["Quantity Sold","${cl_item_shop_sales.total_quantity}","cl_item_shop_sales.total_quantity",""],["Total","${cl_item_shop_sales.sum_total_no_tax}","cl_item_shop_sales.sum_total_no_tax",""],["Total Discounts","${cl_item_shop_sales.total_discounts}","cl_item_shop_sales.total_discounts",""]]
const ItemDataNoUnfilterable = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["Average Lead Time","${cl_dynamic_reorder_vendor.average_lead_time}","cl_dynamic_reorder_vendor.average_lead_time",""],["Category","${cl_category_parents.parent_category}","cl_category_parents.parent_category",""],["Include Archived","${items.archived}","items.archived",""],["Brand","${manufacturers.name}","manufacturers.name",""],["Avg Cost","${items.avg_cost}","items.avg_cost",""],["Default Cost","${items.default_cost}","items.default_cost",""],["Default Vendor","${vendors.name}","vendors.name",""],["Description","${items.description}","items.description",""],["Custom SKU","${items.custom_sku}","items.custom_sku",""],["Default Vendor ID","${cl_item_vendor_nums.default_vendor_number}","cl_item_vendor_nums.default_vendor_number",""],["EAN","${items.EAN}","items.EAN",""],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku",""],["System ID","${items.system_sku}","items.system_sku",""],["UPC","${items.UPC}","items.UPC",""],["Item Type","${items.item_type}","items.item_type",""],["Attribute 1","${item_attributes.attribute1}","item_attributes.attribute1",""],["Attribute 2","${item_attributes.attribute2}","item_attributes.attribute2",""],["Attribute 3","${item_attributes.attribute3}","item_attributes.attribute3",""],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku",""],["Matrix","${item_matrices.description}","item_matrices.description",""],["Matrix Tag","${matrix_tags.name}","matrix_tags.name",""],["Single Tag","${tags.name}","tags.name",""],["Tax Class","${tax_classes.name}","tax_classes.name",""],["Days Since Counted","FILTER ONLY","cl_item_facts.days_since_counted_filter",""],["Days Since Received","FILTER ONLY","cl_item_facts.days_since_received_filter",""],["Days Since Sold","FILTER ONLY","cl_item_facts.days_since_sold_filter",""],["Days To Sell Out","FILTER ONLY","cl_item_facts.days_to_sell_out_filter",""],["Last Received Date","FILTER ONLY","cl_item_facts.last_received_date_filter",""],["Last Sold Date","FILTER ONLY","cl_item_facts.last_sold_date_filter",""],["Quantity on Order","FILTER ONLY","cl_item_facts.quantity_on_order_filter",""],["Quantity to Order","FILTER ONLY","cl_item_facts.quantity_to_order_filter",""],["Quantity on Hand","FILTER ONLY","cl_item_facts.quantity_on_hand_filter",""],["Desired Inventory Level","FILTER ONLY","cl_item_facts.desired_inventory_level_filter",""],["Reorder Point","FILTER ONLY","cl_item_facts.reorder_point_filter",""],["Lifetime Quantity Sold","FILTER ONLY","cl_item_facts.lifetime_quantity_sold_filter",""],["Lifetime Sales","FILTER ONLY","cl_item_facts.lifetime_sales_filter",""],["Tag Collection","FILTER ONLY","cl_item_facts.list_of_tag_filter",""],["365 Day GMROI","FILTER ONLY","cl_inventory_turns_and_gmroi.gmroi_365_filter",""],["365 Day Turns","FILTER ONLY","cl_inventory_turns_and_gmroi.three_hundred_sixty_five_day_turns_filter",""],["Last Year GMROI","FILTER ONLY","cl_inventory_turns_and_gmroi.gmroi_last_year_filter",""],["Last Year Turns","FILTER ONLY","cl_inventory_turns_and_gmroi.last_year_turns_filter",""],["Date (first_received_date_date)","${cl_item_facts.first_received_date_date}","cl_item_facts.first_received_date_date",""],["Is Dusty (Yes / No)","${cl_item_facts.is_dusty}","cl_item_facts.is_dusty",""],["Is Included (Yes / No)","${cl_item_facts.is_included}","cl_item_facts.is_included",""],["On Order (Yes / No)","${cl_item_facts.on_order}","cl_item_facts.on_order",""],["On Transfer (Yes / No)","${cl_item_facts.on_transfer}","cl_item_facts.on_transfer",""],["Price","${item_prices.amount}","item_prices.amount",""],["Days Since PO Received","FILTER ONLY","cl_item_facts.days_since_po_received_filter",""],["Days Since Transfer Received","FILTER ONLY","cl_item_facts.days_since_transferred_filter",""],["Store","${shops.name}","shops.name",""],["Completed Date","${cl_item_shop_sales.completed_date}","cl_item_shop_sales.completed_date",""],["Register","${cl_item_shop_sales.register_filter}","cl_item_shop_sales.register_filter",""]]
const ItemDataNumType = [["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["Avg Cost","${items.avg_cost}","items.avg_cost",""],["Default Cost","${items.default_cost}","items.default_cost",""],["Days Since Counted","FILTER ONLY","cl_item_facts.days_since_counted_filter",""],["Days Since Received","FILTER ONLY","cl_item_facts.days_since_received_filter",""],["Days Since Sold","FILTER ONLY","cl_item_facts.days_since_sold_filter",""],["Days To Sell Out","FILTER ONLY","cl_item_facts.days_to_sell_out_filter",""],["Quantity on Order","FILTER ONLY","cl_item_facts.quantity_on_order_filter",""],["Quantity to Order","FILTER ONLY","cl_item_facts.quantity_to_order_filter",""],["Quantity on Hand","FILTER ONLY","cl_item_facts.quantity_on_hand_filter",""],["Desired Inventory Level","FILTER ONLY","cl_item_facts.desired_inventory_level_filter",""],["Reorder Point","FILTER ONLY","cl_item_facts.reorder_point_filter",""],["Lifetime Quantity Sold","FILTER ONLY","cl_item_facts.lifetime_quantity_sold_filter",""],["Lifetime Sales","FILTER ONLY","cl_item_facts.lifetime_sales_filter",""],["365 Day GMROI","FILTER ONLY","cl_inventory_turns_and_gmroi.gmroi_365_filter",""],["365 Day Turns","FILTER ONLY","cl_inventory_turns_and_gmroi.three_hundred_sixty_five_day_turns_filter",""],["Last Year GMROI","FILTER ONLY","cl_inventory_turns_and_gmroi.gmroi_last_year_filter",""],["Last Year Turns","FILTER ONLY","cl_inventory_turns_and_gmroi.last_year_turns_filter",""]]
const ItemDataFilterTable = [["Company Name","FALSE","",""],["Ls Account ID","FALSE","",""],["Average Lead Time","FALSE","",""],["Forecast Period","TRUE","",""],["Trailing Sales Period","TRUE","",""],["Days of Cover","TRUE","",""],["Dynamic Reorder Level","TRUE","",""],["Dynamic Reorder Point","TRUE","",""],["Quantity to Order","TRUE","",""],["Trailing Average Daily Sales","TRUE","",""],["Category","FALSE","",""],["Include Archived","FALSE","",""],["Brand","FALSE","",""],["Category","TRUE","",""],["Top Level Category","TRUE","",""],["Avg Cost","FALSE","",""],["Default Cost","FALSE","",""],["Default Vendor","FALSE","",""],["Description","FALSE","",""],["Custom SKU","FALSE","",""],["Default Vendor ID","FALSE","",""],["EAN","FALSE","",""],["Manufacturer SKU","FALSE","",""],["System ID","FALSE","",""],["UPC","FALSE","",""],["Item Type","FALSE","",""],["Attribute 1","FALSE","",""],["Attribute 2","FALSE","",""],["Attribute 3","FALSE","",""],["Manufacturer SKU","FALSE","",""],["Matrix","FALSE","",""],["Matrix Tag","FALSE","",""],["Single Tag","FALSE","",""],["Tax Class","FALSE","",""],["# of Items","TRUE","",""],["Days Since Counted","FALSE","",""],["Days Since Received","FALSE","",""],["Days Since Sold","FALSE","",""],["Days To Sell Out","FALSE","",""],["Last Received Date","FALSE","",""],["Last Sold Date","FALSE","",""],["Quantity on Order","FALSE","",""],["Quantity to Order","FALSE","",""],["Quantity on Hand","FALSE","",""],["Desired Inventory Level","FALSE","",""],["Reorder Point","FALSE","",""],["Lifetime Quantity Sold","FALSE","",""],["Lifetime Sales","FALSE","",""],["Tag Collection","FALSE","",""],["365 Day GMROI","FALSE","",""],["365 Day Turns","FALSE","",""],["Last Year GMROI","FALSE","",""],["Last Year Turns","FALSE","",""],["Date (first_received_date_date)","FALSE","",""],["Is Dusty (Yes / No)","FALSE","",""],["Is Included (Yes / No)","FALSE","",""],["On Order (Yes / No)","FALSE","",""],["On Transfer (Yes / No)","FALSE","",""],["Price","FALSE","",""],["Days Since Counted","TRUE","",""],["Days Since First Received","TRUE","",""],["Days Since Received","TRUE","",""],["Days Since Sold","TRUE","",""],["Days to Sell Out","TRUE","",""],["Avg Default Price","TRUE","",""],["365 Day Avg Inventory","TRUE","",""],["Last Year Avg Inventory","TRUE","",""],["Quantity on Hand","TRUE","",""],["Total Cost","TRUE","",""],["Total Retail Value","TRUE","",""],["Cost on Order","TRUE","",""],["Lifetime Received Quantity","TRUE","",""],["Quantity on Order","TRUE","",""],["Desired Inventory Level","TRUE","",""],["Reorder Point","TRUE","",""],["Lifetime Quantity Sold","TRUE","",""],["Lifetime Sales","TRUE","",""],["365 Day GMROI","TRUE","",""],["365 Day Turns","TRUE","",""],["Last Month GMROI","TRUE","",""],["Last Month Turns","TRUE","",""],["Last Year GMROI","TRUE","",""],["Last Year Turns","TRUE","",""],["Days Since PO Received","FALSE","",""],["Days Since Transfer Received","FALSE","",""],["Store","FALSE","",""],["Days Since PO Received","TRUE","",""],["Days Since Transfer Received","TRUE","",""],["Completed Date","FALSE","",""],["Register","FALSE","",""],["# of Lines","TRUE","",""],["# of Sales","TRUE","",""],["Avg Basket Size","TRUE","",""],["Avg Discount Percent","TRUE","",""],["Avg Price","TRUE","",""],["Cost","TRUE","",""],["Margin","TRUE","",""],["Profit","TRUE","",""],["Quantity Sold","TRUE","",""],["Total","TRUE","",""],["Total Discounts","TRUE","",""]]

const CustomerDataLookML = [["Company Name","${cl_companies.company_name}","cl_companies.company_name","FALSE"],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id","FALSE"],["Days Between Purchases","FILTER ONLY","cl_combined_facts.days_between_purchases_filter","TRUE"],["Days Since Last Purchase","FILTER ONLY","cl_combined_facts.days_since_last_purchase_filter","TRUE"],["Historic Lifetime Value","${cl_combined_facts.lifetime_value}","cl_combined_facts.lifetime_value","FALSE"],["Address","${contact_addresses.zip}","contact_addresses.zip","FALSE"],["Date of birth","${customers.dob}","customers.dob","FALSE"],["Days Between Sales Tiered","${cl_combined_facts.ind_days_between_sales_tiered}","cl_combined_facts.ind_days_between_sales_tiered","FALSE"],["Email","${contact_emails.address}","contact_emails.address","FALSE"],["First Employee","${cl_combined_facts.first_employee}","cl_combined_facts.first_employee","FALSE"],["First Sale Date","${cl_combined_facts.first_sale_date}","cl_combined_facts.first_sale_date","FALSE"],["Is Repeat (Yes / No)","${cl_combined_facts.repeat_customer}","cl_combined_facts.repeat_customer","FALSE"],["First Name","${customers.first_name}","customers.first_name","FALSE"],["Full Name","${customers.full_name}","customers.full_name","FALSE"],["Last Name","${customers.last_name}","customers.last_name","FALSE"],["On Do Not Call List (Yes / No)","${contacts.no_phone}","contacts.no_phone","FALSE"],["On Do Not Email List (Yes / No)","${contacts.no_email}","contacts.no_email","FALSE"],["Phone Number","${contact_phones.number}","contact_phones.number","FALSE"],["Single Tag","${from_tags.name}","from_tags.name","FALSE"],["Status","${cl_combined_facts.status}","cl_combined_facts.status","FALSE"],["Type","${customer_types.name}","customer_types.name","FALSE"],["# of Customers","${customers.count_customers}","customers.count_customers","TRUE"],["Avg Lifetime Value","${cl_combined_facts.ltv_avg}","cl_combined_facts.ltv_avg","TRUE"],["Days Between Purchases","${cl_combined_facts.days_between_purchases_measure}","cl_combined_facts.days_between_purchases_measure","TRUE"],["Days Since Last Purchase","${cl_combined_facts.avg_days_since_last_purchase}","cl_combined_facts.avg_days_since_last_purchase","TRUE"],["Historic Lifetime Value","${cl_combined_facts.total_lifetime_value}","cl_combined_facts.total_lifetime_value","TRUE"],["Brand","FILTER ONLY","items.manufacturer_name_filter","TRUE"],["Category","FILTER ONLY","items.parent_category_filter","TRUE"],["Top Level Category","FILTER ONLY","items.top_level_category_filter","TRUE"],["Avg Cost","FILTER ONLY","items.avg_cost_filter","TRUE"],["Default Vendor","FILTER ONLY","items.vendor_name_filter","TRUE"],["Description","FILTER ONLY","items.description_filter","TRUE"],["# of Items","${items.count}","items.count","TRUE"],["Store","${shops.name}","shops.name","FALSE"],["Date","${sales.time_stamp_date}","sales.time_stamp_date","FALSE"],["Day of Month","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month","FALSE"],["Day of Week","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week","FALSE"],["Month","${sales.time_stamp_month}","sales.time_stamp_month","FALSE"],["Month Name","${sales.time_stamp_month_name}","sales.time_stamp_month_name","FALSE"],["Quarter of Year","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year","FALSE"],["Week","${sales.time_stamp_week}","sales.time_stamp_week","FALSE"],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year","FALSE"],["Year","${sales.time_stamp_year}","sales.time_stamp_year","FALSE"],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop","FALSE"],["Sale ID","${sales.sale_id}","sales.sale_id","FALSE"],["# of Sales","${sale_lines.count_sales}","sale_lines.count_sales","TRUE"],["Avg Basket Value","${sales.average_sale_no_tax}","sales.average_sale_no_tax","TRUE"],["Total","${sales.total_sales_no_tax}","sales.total_sales_no_tax","TRUE"],["# of Sale Lines","${sale_lines.count}","sale_lines.count","TRUE"],["Avg Discount","${sale_lines.discount_avg}","sale_lines.discount_avg","TRUE"],["Avg Quantity","${sale_lines.unit_avg}","sale_lines.unit_avg","TRUE"],["Avg Unit Price","${sale_lines.price_avg}","sale_lines.price_avg","TRUE"],["Margin","${sale_lines.margin}","sale_lines.margin","TRUE"],["Profit","${sale_lines.profit}","sale_lines.profit","TRUE"],["Total","${sale_lines.total_sales_no_tax}","sale_lines.total_sales_no_tax","TRUE"],["Cost","${sale_lines.total_cost}","sale_lines.total_cost","TRUE"],["Quantity Sold","${sale_lines.unit_total}","sale_lines.unit_total","TRUE"]]
const CustomerDataNoFilterOnly = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["Historic Lifetime Value","${cl_combined_facts.lifetime_value}","cl_combined_facts.lifetime_value",""],["Address","${contact_addresses.zip}","contact_addresses.zip",""],["Date of birth","${customers.dob}","customers.dob",""],["Days Between Sales Tiered","${cl_combined_facts.ind_days_between_sales_tiered}","cl_combined_facts.ind_days_between_sales_tiered",""],["Email","${contact_emails.address}","contact_emails.address",""],["First Employee","${cl_combined_facts.first_employee}","cl_combined_facts.first_employee",""],["First Sale Date","${cl_combined_facts.first_sale_date}","cl_combined_facts.first_sale_date",""],["Is Repeat (Yes / No)","${cl_combined_facts.repeat_customer}","cl_combined_facts.repeat_customer",""],["First Name","${customers.first_name}","customers.first_name",""],["Full Name","${customers.full_name}","customers.full_name",""],["Last Name","${customers.last_name}","customers.last_name",""],["On Do Not Call List (Yes / No)","${contacts.no_phone}","contacts.no_phone",""],["On Do Not Email List (Yes / No)","${contacts.no_email}","contacts.no_email",""],["Phone Number","${contact_phones.number}","contact_phones.number",""],["Single Tag","${from_tags.name}","from_tags.name",""],["Status","${cl_combined_facts.status}","cl_combined_facts.status",""],["Type","${customer_types.name}","customer_types.name",""],["# of Customers","${customers.count_customers}","customers.count_customers",""],["Avg Lifetime Value","${cl_combined_facts.ltv_avg}","cl_combined_facts.ltv_avg",""],["Days Between Purchases","${cl_combined_facts.days_between_purchases_measure}","cl_combined_facts.days_between_purchases_measure",""],["Days Since Last Purchase","${cl_combined_facts.avg_days_since_last_purchase}","cl_combined_facts.avg_days_since_last_purchase",""],["Historic Lifetime Value","${cl_combined_facts.total_lifetime_value}","cl_combined_facts.total_lifetime_value",""],["# of Items","${items.count}","items.count",""],["Store","${shops.name}","shops.name",""],["Date","${sales.time_stamp_date}","sales.time_stamp_date",""],["Day of Month","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month",""],["Day of Week","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week",""],["Month","${sales.time_stamp_month}","sales.time_stamp_month",""],["Month Name","${sales.time_stamp_month_name}","sales.time_stamp_month_name",""],["Quarter of Year","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year",""],["Week","${sales.time_stamp_week}","sales.time_stamp_week",""],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year",""],["Year","${sales.time_stamp_year}","sales.time_stamp_year",""],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop",""],["Sale ID","${sales.sale_id}","sales.sale_id",""],["# of Sales","${sale_lines.count_sales}","sale_lines.count_sales",""],["Avg Basket Value","${sales.average_sale_no_tax}","sales.average_sale_no_tax",""],["Total","${sales.total_sales_no_tax}","sales.total_sales_no_tax",""],["# of Sale Lines","${sale_lines.count}","sale_lines.count",""],["Avg Discount","${sale_lines.discount_avg}","sale_lines.discount_avg",""],["Avg Quantity","${sale_lines.unit_avg}","sale_lines.unit_avg",""],["Avg Unit Price","${sale_lines.price_avg}","sale_lines.price_avg",""],["Margin","${sale_lines.margin}","sale_lines.margin",""],["Profit","${sale_lines.profit}","sale_lines.profit",""],["Total","${sale_lines.total_sales_no_tax}","sale_lines.total_sales_no_tax",""],["Cost","${sale_lines.total_cost}","sale_lines.total_cost",""],["Quantity Sold","${sale_lines.unit_total}","sale_lines.unit_total",""]]
const CustomerDataNoUnfilterable = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["Historic Lifetime Value","${cl_combined_facts.lifetime_value}","cl_combined_facts.lifetime_value",""],["Address","${contact_addresses.zip}","contact_addresses.zip",""],["Date of birth","${customers.dob}","customers.dob",""],["Days Between Sales Tiered","${cl_combined_facts.ind_days_between_sales_tiered}","cl_combined_facts.ind_days_between_sales_tiered",""],["Email","${contact_emails.address}","contact_emails.address",""],["First Employee","${cl_combined_facts.first_employee}","cl_combined_facts.first_employee",""],["First Sale Date","${cl_combined_facts.first_sale_date}","cl_combined_facts.first_sale_date",""],["Is Repeat (Yes / No)","${cl_combined_facts.repeat_customer}","cl_combined_facts.repeat_customer",""],["First Name","${customers.first_name}","customers.first_name",""],["Full Name","${customers.full_name}","customers.full_name",""],["Last Name","${customers.last_name}","customers.last_name",""],["On Do Not Call List (Yes / No)","${contacts.no_phone}","contacts.no_phone",""],["On Do Not Email List (Yes / No)","${contacts.no_email}","contacts.no_email",""],["Phone Number","${contact_phones.number}","contact_phones.number",""],["Single Tag","${from_tags.name}","from_tags.name",""],["Status","${cl_combined_facts.status}","cl_combined_facts.status",""],["Type","${customer_types.name}","customer_types.name",""],["Store","${shops.name}","shops.name",""],["Date","${sales.time_stamp_date}","sales.time_stamp_date",""],["Day of Month","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month",""],["Day of Week","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week",""],["Month","${sales.time_stamp_month}","sales.time_stamp_month",""],["Month Name","${sales.time_stamp_month_name}","sales.time_stamp_month_name",""],["Quarter of Year","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year",""],["Week","${sales.time_stamp_week}","sales.time_stamp_week",""],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year",""],["Year","${sales.time_stamp_year}","sales.time_stamp_year",""],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop",""],["Sale ID","${sales.sale_id}","sales.sale_id",""]]
const CustomerDataNumType = [["Days Between Purchases","FILTER ONLY","cl_combined_facts.days_between_purchases_filter",""],["Days Since Last Purchase","FILTER ONLY","cl_combined_facts.days_since_last_purchase_filter",""],["Historic Lifetime Value","${cl_combined_facts.lifetime_value}","cl_combined_facts.lifetime_value",""],["Avg Cost","FILTER ONLY","items.avg_cost_filter",""],["Sale ID","${sales.sale_id}","sales.sale_id",""]]
const CustomerDataFilterTable = [["Company Name","FALSE","",""],["Ls Account ID","FALSE","",""],["Days Between Purchases","TRUE","",""],["Days Since Last Purchase","TRUE","",""],["Historic Lifetime Value","FALSE","",""],["Address","FALSE","",""],["Date of birth","FALSE","",""],["Days Between Sales Tiered","FALSE","",""],["Email","FALSE","",""],["First Employee","FALSE","",""],["First Sale Date","FALSE","",""],["Is Repeat (Yes / No)","FALSE","",""],["First Name","FALSE","",""],["Full Name","FALSE","",""],["Last Name","FALSE","",""],["On Do Not Call List (Yes / No)","FALSE","",""],["On Do Not Email List (Yes / No)","FALSE","",""],["Phone Number","FALSE","",""],["Single Tag","FALSE","",""],["Status","FALSE","",""],["Type","FALSE","",""],["# of Customers","TRUE","",""],["Avg Lifetime Value","TRUE","",""],["Days Between Purchases","TRUE","",""],["Days Since Last Purchase","TRUE","",""],["Historic Lifetime Value","TRUE","",""],["Brand","TRUE","",""],["Category","TRUE","",""],["Top Level Category","TRUE","",""],["Avg Cost","TRUE","",""],["Default Vendor","TRUE","",""],["Description","TRUE","",""],["# of Items","TRUE","",""],["Store","FALSE","",""],["Date","FALSE","",""],["Day of Month","FALSE","",""],["Day of Week","FALSE","",""],["Month","FALSE","",""],["Month Name","FALSE","",""],["Quarter of Year","FALSE","",""],["Week","FALSE","",""],["Week of Year","FALSE","",""],["Year","FALSE","",""],["Register","FALSE","",""],["Sale ID","FALSE","",""],["# of Sales","TRUE","",""],["Avg Basket Value","TRUE","",""],["Total","TRUE","",""],["# of Sale Lines","TRUE","",""],["Avg Discount","TRUE","",""],["Avg Quantity","TRUE","",""],["Avg Unit Price","TRUE","",""],["Margin","TRUE","",""],["Profit","TRUE","",""],["Total","TRUE","",""],["Cost","TRUE","",""],["Quantity Sold","TRUE","",""]]

const TaxDataLookML = [["Company Name","${cl_companies.company_name}","cl_companies.company_name","FALSE"],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id","FALSE"],["City","${contact_addresses.city}","contact_addresses.city","FALSE"],["State","${contact_addresses.state}","contact_addresses.state","FALSE"],["Street Address 1","${contact_addresses.address1}","contact_addresses.address1","FALSE"],["Street Address 2","${contact_addresses.address2}","contact_addresses.address2","FALSE"],["Zip","${contact_addresses.zip}","contact_addresses.zip","FALSE"],["Country","${contact_addresses.country}","contact_addresses.country","FALSE"],["Full Name","${customers.full_name}","customers.full_name","FALSE"],["Type","${customer_types.name}","customer_types.name","FALSE"],["Store","${shops.name}","shops.name","FALSE"],["Channel","${cl_ecom_sales.sale_channel}","cl_ecom_sales.sale_channel","FALSE"],["Date","${sales.time_stamp_date}","sales.time_stamp_date","FALSE"],["Day of Month","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month","FALSE"],["Day of Week","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week","FALSE"],["Month","${sales.time_stamp_month}","sales.time_stamp_month","FALSE"],["Month Name","${sales.time_stamp_month_name}","sales.time_stamp_month_name","FALSE"],["Quarter of Year","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year","FALSE"],["Week","${sales.time_stamp_week}","sales.time_stamp_week","FALSE"],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year","FALSE"],["Year","${sales.time_stamp_year}","sales.time_stamp_year","FALSE"],["Employee","${employees.full_name}","employees.full_name","FALSE"],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop","FALSE"],["Sale ID","${sales.sale_id}","sales.sale_id","FALSE"],["Tax 1 Rate","${sales.tax1_rate}","sales.tax1_rate","FALSE"],["Tax 2 Rate","${sales.tax2_rate}","sales.tax2_rate","FALSE"],["Tax Name","${tax_categories.tax1_name}","tax_categories.tax1_name","FALSE"],["# of Sales","${sale_lines.count_sales}","sale_lines.count_sales","TRUE"],["Avg Basket Size","${sales.avg_basket_size}","sales.avg_basket_size","TRUE"],["Avg Basket Value","${sales.average_sale_no_tax}","sales.average_sale_no_tax","TRUE"],["Total Tax 1","${sale_lines.total_tax1}","sale_lines.total_tax1","TRUE"],["Total Tax 2","${sale_lines.total_tax2}","sale_lines.total_tax2","TRUE"],["Total Tax Paid","${sale_lines.total_tax_paid}","sale_lines.total_tax_paid","TRUE"],["Margin","FILTER ONLY","sale_lines.margin_filter","FALSE"],["Quantity Sold","FILTER ONLY","sale_lines.quantity_sold_filter","FALSE"],["Discount Name","${discounts.name}","discounts.name","FALSE"],["Is Layaway (Yes / No)","${sale_lines.is_layaway}","sale_lines.is_layaway","FALSE"],["Is Miscellaneous (Yes / No)","${sale_lines.is_miscellaneous}","sale_lines.is_miscellaneous","FALSE"],["Is Special Order (Yes / No)","${sale_lines.is_special_order}","sale_lines.is_special_order","FALSE"],["Is Taxed (Yes / No)","${sale_lines.actually_taxed}","sale_lines.actually_taxed","FALSE"],["Is Workorder (Yes / No)","${sale_lines.is_workorder}","sale_lines.is_workorder","FALSE"],["Tax Class","${tax_classes.name}","tax_classes.name","FALSE"],["Tax Class 1 Rate","${sale_lines.tax1_rate}","sale_lines.tax1_rate","FALSE"],["Tax Class 2 Rate","${sale_lines.tax2_rate}","sale_lines.tax2_rate","FALSE"],["# of Sale Lines","${sale_lines.count}","sale_lines.count","TRUE"],["Avg Discount","${sale_lines.discount_avg}","sale_lines.discount_avg","TRUE"],["Avg Quantity","${sale_lines.unit_avg}","sale_lines.unit_avg","TRUE"],["Avg Unit Price","${sale_lines.price_avg}","sale_lines.price_avg","TRUE"],["Margin","${sale_lines.margin}","sale_lines.margin","TRUE"],["Profit","${sale_lines.profit}","sale_lines.profit","TRUE"],["Cost","${sale_lines.total_cost}","sale_lines.total_cost","TRUE"],["Quantity Sold","${sale_lines.unit_total}","sale_lines.unit_total","TRUE"],["Subtotal","${sale_lines.total_subtotal}","sale_lines.total_subtotal","TRUE"],["Total Discount","${sale_lines.total_discount}","sale_lines.total_discount","TRUE"],["Total with Tax","${sale_lines.total_total}","sale_lines.total_total","TRUE"],["City","${shipping_contact_addresses.city}","shipping_contact_addresses.city","FALSE"],["State","${shipping_contact_addresses.state}","shipping_contact_addresses.state","FALSE"],["Street Address 1","${shipping_contact_addresses.address1}","shipping_contact_addresses.address1","FALSE"],["Street Address 2","${shipping_contact_addresses.address2}","shipping_contact_addresses.address2","FALSE"],["Zip","${shipping_contact_addresses.zip}","shipping_contact_addresses.zip","FALSE"],["Country","${shipping_contact_addresses.country}","shipping_contact_addresses.country","FALSE"]]
const TaxDataNoFilterOnly = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["City","${contact_addresses.city}","contact_addresses.city",""],["State","${contact_addresses.state}","contact_addresses.state",""],["Street Address 1","${contact_addresses.address1}","contact_addresses.address1",""],["Street Address 2","${contact_addresses.address2}","contact_addresses.address2",""],["Zip","${contact_addresses.zip}","contact_addresses.zip",""],["Country","${contact_addresses.country}","contact_addresses.country",""],["Full Name","${customers.full_name}","customers.full_name",""],["Type","${customer_types.name}","customer_types.name",""],["Store","${shops.name}","shops.name",""],["Channel","${cl_ecom_sales.sale_channel}","cl_ecom_sales.sale_channel",""],["Date","${sales.time_stamp_date}","sales.time_stamp_date",""],["Day of Month","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month",""],["Day of Week","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week",""],["Month","${sales.time_stamp_month}","sales.time_stamp_month",""],["Month Name","${sales.time_stamp_month_name}","sales.time_stamp_month_name",""],["Quarter of Year","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year",""],["Week","${sales.time_stamp_week}","sales.time_stamp_week",""],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year",""],["Year","${sales.time_stamp_year}","sales.time_stamp_year",""],["Employee","${employees.full_name}","employees.full_name",""],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop",""],["Sale ID","${sales.sale_id}","sales.sale_id",""],["Tax 1 Rate","${sales.tax1_rate}","sales.tax1_rate",""],["Tax 2 Rate","${sales.tax2_rate}","sales.tax2_rate",""],["Tax Name","${tax_categories.tax1_name}","tax_categories.tax1_name",""],["# of Sales","${sale_lines.count_sales}","sale_lines.count_sales",""],["Avg Basket Size","${sales.avg_basket_size}","sales.avg_basket_size",""],["Avg Basket Value","${sales.average_sale_no_tax}","sales.average_sale_no_tax",""],["Total Tax 1","${sale_lines.total_tax1}","sale_lines.total_tax1",""],["Total Tax 2","${sale_lines.total_tax2}","sale_lines.total_tax2",""],["Total Tax Paid","${sale_lines.total_tax_paid}","sale_lines.total_tax_paid",""],["Discount Name","${discounts.name}","discounts.name",""],["Is Layaway (Yes / No)","${sale_lines.is_layaway}","sale_lines.is_layaway",""],["Is Miscellaneous (Yes / No)","${sale_lines.is_miscellaneous}","sale_lines.is_miscellaneous",""],["Is Special Order (Yes / No)","${sale_lines.is_special_order}","sale_lines.is_special_order",""],["Is Taxed (Yes / No)","${sale_lines.actually_taxed}","sale_lines.actually_taxed",""],["Is Workorder (Yes / No)","${sale_lines.is_workorder}","sale_lines.is_workorder",""],["Tax Class","${tax_classes.name}","tax_classes.name",""],["Tax Class 1 Rate","${sale_lines.tax1_rate}","sale_lines.tax1_rate",""],["Tax Class 2 Rate","${sale_lines.tax2_rate}","sale_lines.tax2_rate",""],["# of Sale Lines","${sale_lines.count}","sale_lines.count",""],["Avg Discount","${sale_lines.discount_avg}","sale_lines.discount_avg",""],["Avg Quantity","${sale_lines.unit_avg}","sale_lines.unit_avg",""],["Avg Unit Price","${sale_lines.price_avg}","sale_lines.price_avg",""],["Margin","${sale_lines.margin}","sale_lines.margin",""],["Profit","${sale_lines.profit}","sale_lines.profit",""],["Cost","${sale_lines.total_cost}","sale_lines.total_cost",""],["Quantity Sold","${sale_lines.unit_total}","sale_lines.unit_total",""],["Subtotal","${sale_lines.total_subtotal}","sale_lines.total_subtotal",""],["Total Discount","${sale_lines.total_discount}","sale_lines.total_discount",""],["Total with Tax","${sale_lines.total_total}","sale_lines.total_total",""],["City","${shipping_contact_addresses.city}","shipping_contact_addresses.city",""],["State","${shipping_contact_addresses.state}","shipping_contact_addresses.state",""],["Street Address 1","${shipping_contact_addresses.address1}","shipping_contact_addresses.address1",""],["Street Address 2","${shipping_contact_addresses.address2}","shipping_contact_addresses.address2",""],["Zip","${shipping_contact_addresses.zip}","shipping_contact_addresses.zip",""],["Country","${shipping_contact_addresses.country}","shipping_contact_addresses.country",""]]
const TaxDataNoUnfilterable = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["City","${contact_addresses.city}","contact_addresses.city",""],["State","${contact_addresses.state}","contact_addresses.state",""],["Street Address 1","${contact_addresses.address1}","contact_addresses.address1",""],["Street Address 2","${contact_addresses.address2}","contact_addresses.address2",""],["Zip","${contact_addresses.zip}","contact_addresses.zip",""],["Country","${contact_addresses.country}","contact_addresses.country",""],["Full Name","${customers.full_name}","customers.full_name",""],["Type","${customer_types.name}","customer_types.name",""],["Store","${shops.name}","shops.name",""],["Channel","${cl_ecom_sales.sale_channel}","cl_ecom_sales.sale_channel",""],["Date","${sales.time_stamp_date}","sales.time_stamp_date",""],["Day of Month","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month",""],["Day of Week","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week",""],["Month","${sales.time_stamp_month}","sales.time_stamp_month",""],["Month Name","${sales.time_stamp_month_name}","sales.time_stamp_month_name",""],["Quarter of Year","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year",""],["Week","${sales.time_stamp_week}","sales.time_stamp_week",""],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year",""],["Year","${sales.time_stamp_year}","sales.time_stamp_year",""],["Employee","${employees.full_name}","employees.full_name",""],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop",""],["Sale ID","${sales.sale_id}","sales.sale_id",""],["Tax 1 Rate","${sales.tax1_rate}","sales.tax1_rate",""],["Tax 2 Rate","${sales.tax2_rate}","sales.tax2_rate",""],["Tax Name","${tax_categories.tax1_name}","tax_categories.tax1_name",""],["Margin","FILTER ONLY","sale_lines.margin_filter",""],["Quantity Sold","FILTER ONLY","sale_lines.quantity_sold_filter",""],["Discount Name","${discounts.name}","discounts.name",""],["Is Layaway (Yes / No)","${sale_lines.is_layaway}","sale_lines.is_layaway",""],["Is Miscellaneous (Yes / No)","${sale_lines.is_miscellaneous}","sale_lines.is_miscellaneous",""],["Is Special Order (Yes / No)","${sale_lines.is_special_order}","sale_lines.is_special_order",""],["Is Taxed (Yes / No)","${sale_lines.actually_taxed}","sale_lines.actually_taxed",""],["Is Workorder (Yes / No)","${sale_lines.is_workorder}","sale_lines.is_workorder",""],["Tax Class","${tax_classes.name}","tax_classes.name",""],["Tax Class 1 Rate","${sale_lines.tax1_rate}","sale_lines.tax1_rate",""],["Tax Class 2 Rate","${sale_lines.tax2_rate}","sale_lines.tax2_rate",""],["City","${shipping_contact_addresses.city}","shipping_contact_addresses.city",""],["State","${shipping_contact_addresses.state}","shipping_contact_addresses.state",""],["Street Address 1","${shipping_contact_addresses.address1}","shipping_contact_addresses.address1",""],["Street Address 2","${shipping_contact_addresses.address2}","shipping_contact_addresses.address2",""],["Zip","${shipping_contact_addresses.zip}","shipping_contact_addresses.zip",""],["Country","${shipping_contact_addresses.country}","shipping_contact_addresses.country",""]]
const TaxDataNumType = [["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["Sale ID","${sales.sale_id}","sales.sale_id",""],["Tax 1 Rate","${sales.tax1_rate}","sales.tax1_rate",""],["Tax 2 Rate","${sales.tax2_rate}","sales.tax2_rate",""]]
const TaxDataFilterTable = [["Company Name","FALSE","",""],["Ls Account ID","FALSE","",""],["City","FALSE","",""],["State","FALSE","",""],["Street Address 1","FALSE","",""],["Street Address 2","FALSE","",""],["Zip","FALSE","",""],["Country","FALSE","",""],["Full Name","FALSE","",""],["Type","FALSE","",""],["Store","FALSE","",""],["Channel","FALSE","",""],["Date","FALSE","",""],["Day of Month","FALSE","",""],["Day of Week","FALSE","",""],["Month","FALSE","",""],["Month Name","FALSE","",""],["Quarter of Year","FALSE","",""],["Week","FALSE","",""],["Week of Year","FALSE","",""],["Year","FALSE","",""],["Employee","FALSE","",""],["Register","FALSE","",""],["Sale ID","FALSE","",""],["Tax 1 Rate","FALSE","",""],["Tax 2 Rate","FALSE","",""],["Tax Name","FALSE","",""],["# of Sales","TRUE","",""],["Avg Basket Size","TRUE","",""],["Avg Basket Value","TRUE","",""],["Total Tax 1","TRUE","",""],["Total Tax 2","TRUE","",""],["Total Tax Paid","TRUE","",""],["Margin","FALSE","",""],["Quantity Sold","FALSE","",""],["Discount Name","FALSE","",""],["Is Layaway (Yes / No)","FALSE","",""],["Is Miscellaneous (Yes / No)","FALSE","",""],["Is Special Order (Yes / No)","FALSE","",""],["Is Taxed (Yes / No)","FALSE","",""],["Is Workorder (Yes / No)","FALSE","",""],["Tax Class","FALSE","",""],["Tax Class 1 Rate","FALSE","",""],["Tax Class 2 Rate","FALSE","",""],["# of Sale Lines","TRUE","",""],["Avg Discount","TRUE","",""],["Avg Quantity","TRUE","",""],["Avg Unit Price","TRUE","",""],["Margin","TRUE","",""],["Profit","TRUE","",""],["Cost","TRUE","",""],["Quantity Sold","TRUE","",""],["Subtotal","TRUE","",""],["Total Discount","TRUE","",""],["Total with Tax","TRUE","",""],["City","FALSE","",""],["State","FALSE","",""],["Street Address 1","FALSE","",""],["Street Address 2","FALSE","",""],["Zip","FALSE","",""],["Country","FALSE","",""]]

const OnOrderDataLookML = [["Company Name","${cl_companies.company_name}","cl_companies.company_name","FALSE"],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id","FALSE"],["Category","FILTER ONLY","cl_category_parents.parent_category","FALSE"],["Brand","${manufacturers.name}","manufacturers.name","FALSE"],["Category","${categories.full_path_name}","categories.full_path_name","FALSE"],["Top Level Category","${cl_category_tops.top_level_category}","cl_category_tops.top_level_category","FALSE"],["Custom SKU","${items.custom_sku}","items.custom_sku","FALSE"],["EAN","${items.EAN}","items.EAN","FALSE"],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku","FALSE"],["System ID","${items.system_sku}","items.system_sku","FALSE"],["UPC","${items.UPC}","items.UPC","FALSE"],["Attribute 1","${item_attributes.attribute1}","item_attributes.attribute1","FALSE"],["Attribute 2","${item_attributes.attribute2}","item_attributes.attribute2","FALSE"],["Attribute 3","${item_attributes.attribute3}","item_attributes.attribute3","FALSE"],["Manufacturer SKU","${item_matrices.manufacturer_sku}","item_matrices.manufacturer_sku","FALSE"],["Matrix","${item_matrices.description}","item_matrices.description","FALSE"],["Price","${item_prices.amount}","item_prices.amount","FALSE"],["Quantity on Hand","${to_item_shops.qoh_measure}","to_item_shops.qoh_measure","TRUE"],["Receiving Shop","${to_shop.name}","to_shop.name","FALSE"],["Sending Shop","${from_shop.name}","from_shop.name","FALSE"],["Archived (Yes / No)","${cl_items_on_order.archived}","cl_items_on_order.archived","FALSE"],["Complete (Yes / No)","${cl_items_on_order.complete}","cl_items_on_order.complete","FALSE"],["Date","${cl_items_on_order.expected_date_date}","cl_items_on_order.expected_date_date","FALSE"],["Day of Month","${cl_items_on_order.expected_date_day_of_month}","cl_items_on_order.expected_date_day_of_month","FALSE"],["Day of Week","${cl_items_on_order.expected_date_day_of_week}","cl_items_on_order.expected_date_day_of_week","FALSE"],["Month","${cl_items_on_order.expected_date_month}","cl_items_on_order.expected_date_month","FALSE"],["Month Name","${cl_items_on_order.expected_date_month_name}","cl_items_on_order.expected_date_month_name","FALSE"],["Quarter of Year","${cl_items_on_order.expected_date_quarter_of_year}","cl_items_on_order.expected_date_quarter_of_year","FALSE"],["Week","${cl_items_on_order.expected_date_week}","cl_items_on_order.expected_date_week","FALSE"],["Week of Year","${cl_items_on_order.expected_date_week_of_year}","cl_items_on_order.expected_date_week_of_year","FALSE"],["Year","${cl_items_on_order.expected_date_year}","cl_items_on_order.expected_date_year","FALSE"],["Date","${cl_items_on_order.po_item_received_date_date}","cl_items_on_order.po_item_received_date_date","FALSE"],["On Order (Yes / No)","${cl_items_on_order.on_order}","cl_items_on_order.on_order","FALSE"],["Order ID","${cl_items_on_order.order_id}","cl_items_on_order.order_id","FALSE"],["Date","${cl_items_on_order.ordered_date_date}","cl_items_on_order.ordered_date_date","FALSE"],["Week of Year","${cl_items_on_order.ordered_date_week_of_year}","cl_items_on_order.ordered_date_week_of_year","FALSE"],["Year","${cl_items_on_order.ordered_date_year}","cl_items_on_order.ordered_date_year","FALSE"],["Date","${cl_items_on_order.received_date_date}","cl_items_on_order.received_date_date","FALSE"],["Day of Month","${cl_items_on_order.received_date_day_of_month}","cl_items_on_order.received_date_day_of_month","FALSE"],["Day of Week","${cl_items_on_order.received_date_day_of_week}","cl_items_on_order.received_date_day_of_week","FALSE"],["Month","${cl_items_on_order.received_date_month}","cl_items_on_order.received_date_month","FALSE"],["Month Name","${cl_items_on_order.received_date_month_name}","cl_items_on_order.received_date_month_name","FALSE"],["Quarter of Year","${cl_items_on_order.received_date_quarter_of_year}","cl_items_on_order.received_date_quarter_of_year","FALSE"],["Week","${cl_items_on_order.received_date_week}","cl_items_on_order.received_date_week","FALSE"],["Week of Year","${cl_items_on_order.received_date_week_of_year}","cl_items_on_order.received_date_week_of_year","FALSE"],["Year","${cl_items_on_order.received_date_year}","cl_items_on_order.received_date_year","FALSE"],["Transfer ID","${cl_items_on_order.transfer_id}","cl_items_on_order.transfer_id","FALSE"],["Type","${cl_items_on_order.order_type}","cl_items_on_order.order_type","FALSE"],["Vendor","${cl_items_on_order.vendor_name}","cl_items_on_order.vendor_name","FALSE"],["# of Items","${cl_items_on_order.count}","cl_items_on_order.count","TRUE"],["Cost of Ordered","${cl_items_on_order.cost_ordered}","cl_items_on_order.cost_ordered","TRUE"],["Cost of Received","${cl_items_on_order.cost_received}","cl_items_on_order.cost_received","TRUE"],["Order Discounts","${cl_items_on_order.discounts}","cl_items_on_order.discounts","TRUE"],["Original Order Quantity","${cl_items_on_order.quantity_ordered}","cl_items_on_order.quantity_ordered","TRUE"],["Quantity on Order","${cl_items_on_order.quantity_on_order}","cl_items_on_order.quantity_on_order","TRUE"],["Retail Value on Order","${cl_items_on_order.retail_value_on_order}","cl_items_on_order.retail_value_on_order","TRUE"],["Retail Value Received","${cl_items_on_order.retail_value_received}","cl_items_on_order.retail_value_received","TRUE"],["Total Received Quantity","${cl_items_on_order.quantity_received}","cl_items_on_order.quantity_received","TRUE"]]
const OnOrderDataNoFilterOnly = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["Brand","${manufacturers.name}","manufacturers.name",""],["Category","${categories.full_path_name}","categories.full_path_name",""],["Top Level Category","${cl_category_tops.top_level_category}","cl_category_tops.top_level_category",""],["Custom SKU","${items.custom_sku}","items.custom_sku",""],["EAN","${items.EAN}","items.EAN",""],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku",""],["System ID","${items.system_sku}","items.system_sku",""],["UPC","${items.UPC}","items.UPC",""],["Attribute 1","${item_attributes.attribute1}","item_attributes.attribute1",""],["Attribute 2","${item_attributes.attribute2}","item_attributes.attribute2",""],["Attribute 3","${item_attributes.attribute3}","item_attributes.attribute3",""],["Manufacturer SKU","${item_matrices.manufacturer_sku}","item_matrices.manufacturer_sku",""],["Matrix","${item_matrices.description}","item_matrices.description",""],["Price","${item_prices.amount}","item_prices.amount",""],["Quantity on Hand","${to_item_shops.qoh_measure}","to_item_shops.qoh_measure",""],["Receiving Shop","${to_shop.name}","to_shop.name",""],["Sending Shop","${from_shop.name}","from_shop.name",""],["Archived (Yes / No)","${cl_items_on_order.archived}","cl_items_on_order.archived",""],["Complete (Yes / No)","${cl_items_on_order.complete}","cl_items_on_order.complete",""],["Date","${cl_items_on_order.expected_date_date}","cl_items_on_order.expected_date_date",""],["Day of Month","${cl_items_on_order.expected_date_day_of_month}","cl_items_on_order.expected_date_day_of_month",""],["Day of Week","${cl_items_on_order.expected_date_day_of_week}","cl_items_on_order.expected_date_day_of_week",""],["Month","${cl_items_on_order.expected_date_month}","cl_items_on_order.expected_date_month",""],["Month Name","${cl_items_on_order.expected_date_month_name}","cl_items_on_order.expected_date_month_name",""],["Quarter of Year","${cl_items_on_order.expected_date_quarter_of_year}","cl_items_on_order.expected_date_quarter_of_year",""],["Week","${cl_items_on_order.expected_date_week}","cl_items_on_order.expected_date_week",""],["Week of Year","${cl_items_on_order.expected_date_week_of_year}","cl_items_on_order.expected_date_week_of_year",""],["Year","${cl_items_on_order.expected_date_year}","cl_items_on_order.expected_date_year",""],["Date","${cl_items_on_order.po_item_received_date_date}","cl_items_on_order.po_item_received_date_date",""],["On Order (Yes / No)","${cl_items_on_order.on_order}","cl_items_on_order.on_order",""],["Order ID","${cl_items_on_order.order_id}","cl_items_on_order.order_id",""],["Date","${cl_items_on_order.ordered_date_date}","cl_items_on_order.ordered_date_date",""],["Week of Year","${cl_items_on_order.ordered_date_week_of_year}","cl_items_on_order.ordered_date_week_of_year",""],["Year","${cl_items_on_order.ordered_date_year}","cl_items_on_order.ordered_date_year",""],["Date","${cl_items_on_order.received_date_date}","cl_items_on_order.received_date_date",""],["Day of Month","${cl_items_on_order.received_date_day_of_month}","cl_items_on_order.received_date_day_of_month",""],["Day of Week","${cl_items_on_order.received_date_day_of_week}","cl_items_on_order.received_date_day_of_week",""],["Month","${cl_items_on_order.received_date_month}","cl_items_on_order.received_date_month",""],["Month Name","${cl_items_on_order.received_date_month_name}","cl_items_on_order.received_date_month_name",""],["Quarter of Year","${cl_items_on_order.received_date_quarter_of_year}","cl_items_on_order.received_date_quarter_of_year",""],["Week","${cl_items_on_order.received_date_week}","cl_items_on_order.received_date_week",""],["Week of Year","${cl_items_on_order.received_date_week_of_year}","cl_items_on_order.received_date_week_of_year",""],["Year","${cl_items_on_order.received_date_year}","cl_items_on_order.received_date_year",""],["Transfer ID","${cl_items_on_order.transfer_id}","cl_items_on_order.transfer_id",""],["Type","${cl_items_on_order.order_type}","cl_items_on_order.order_type",""],["Vendor","${cl_items_on_order.vendor_name}","cl_items_on_order.vendor_name",""],["# of Items","${cl_items_on_order.count}","cl_items_on_order.count",""],["Cost of Ordered","${cl_items_on_order.cost_ordered}","cl_items_on_order.cost_ordered",""],["Cost of Received","${cl_items_on_order.cost_received}","cl_items_on_order.cost_received",""],["Order Discounts","${cl_items_on_order.discounts}","cl_items_on_order.discounts",""],["Original Order Quantity","${cl_items_on_order.quantity_ordered}","cl_items_on_order.quantity_ordered",""],["Quantity on Order","${cl_items_on_order.quantity_on_order}","cl_items_on_order.quantity_on_order",""],["Retail Value on Order","${cl_items_on_order.retail_value_on_order}","cl_items_on_order.retail_value_on_order",""],["Retail Value Received","${cl_items_on_order.retail_value_received}","cl_items_on_order.retail_value_received",""],["Total Received Quantity","${cl_items_on_order.quantity_received}","cl_items_on_order.quantity_received",""]]
const OnOrderDataNoUnfilterable = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["Category","FILTER ONLY","cl_category_parents.parent_category",""],["Brand","${manufacturers.name}","manufacturers.name",""],["Category","${categories.full_path_name}","categories.full_path_name",""],["Top Level Category","${cl_category_tops.top_level_category}","cl_category_tops.top_level_category",""],["Custom SKU","${items.custom_sku}","items.custom_sku",""],["EAN","${items.EAN}","items.EAN",""],["Manufacturer SKU","${items.manufacturer_sku}","items.manufacturer_sku",""],["System ID","${items.system_sku}","items.system_sku",""],["UPC","${items.UPC}","items.UPC",""],["Attribute 1","${item_attributes.attribute1}","item_attributes.attribute1",""],["Attribute 2","${item_attributes.attribute2}","item_attributes.attribute2",""],["Attribute 3","${item_attributes.attribute3}","item_attributes.attribute3",""],["Manufacturer SKU","${item_matrices.manufacturer_sku}","item_matrices.manufacturer_sku",""],["Matrix","${item_matrices.description}","item_matrices.description",""],["Price","${item_prices.amount}","item_prices.amount",""],["Receiving Shop","${to_shop.name}","to_shop.name",""],["Sending Shop","${from_shop.name}","from_shop.name",""],["Archived (Yes / No)","${cl_items_on_order.archived}","cl_items_on_order.archived",""],["Complete (Yes / No)","${cl_items_on_order.complete}","cl_items_on_order.complete",""],["Date","${cl_items_on_order.expected_date_date}","cl_items_on_order.expected_date_date",""],["Day of Month","${cl_items_on_order.expected_date_day_of_month}","cl_items_on_order.expected_date_day_of_month",""],["Day of Week","${cl_items_on_order.expected_date_day_of_week}","cl_items_on_order.expected_date_day_of_week",""],["Month","${cl_items_on_order.expected_date_month}","cl_items_on_order.expected_date_month",""],["Month Name","${cl_items_on_order.expected_date_month_name}","cl_items_on_order.expected_date_month_name",""],["Quarter of Year","${cl_items_on_order.expected_date_quarter_of_year}","cl_items_on_order.expected_date_quarter_of_year",""],["Week","${cl_items_on_order.expected_date_week}","cl_items_on_order.expected_date_week",""],["Week of Year","${cl_items_on_order.expected_date_week_of_year}","cl_items_on_order.expected_date_week_of_year",""],["Year","${cl_items_on_order.expected_date_year}","cl_items_on_order.expected_date_year",""],["Date","${cl_items_on_order.po_item_received_date_date}","cl_items_on_order.po_item_received_date_date",""],["On Order (Yes / No)","${cl_items_on_order.on_order}","cl_items_on_order.on_order",""],["Order ID","${cl_items_on_order.order_id}","cl_items_on_order.order_id",""],["Date","${cl_items_on_order.ordered_date_date}","cl_items_on_order.ordered_date_date",""],["Week of Year","${cl_items_on_order.ordered_date_week_of_year}","cl_items_on_order.ordered_date_week_of_year",""],["Year","${cl_items_on_order.ordered_date_year}","cl_items_on_order.ordered_date_year",""],["Date","${cl_items_on_order.received_date_date}","cl_items_on_order.received_date_date",""],["Day of Month","${cl_items_on_order.received_date_day_of_month}","cl_items_on_order.received_date_day_of_month",""],["Day of Week","${cl_items_on_order.received_date_day_of_week}","cl_items_on_order.received_date_day_of_week",""],["Month","${cl_items_on_order.received_date_month}","cl_items_on_order.received_date_month",""],["Month Name","${cl_items_on_order.received_date_month_name}","cl_items_on_order.received_date_month_name",""],["Quarter of Year","${cl_items_on_order.received_date_quarter_of_year}","cl_items_on_order.received_date_quarter_of_year",""],["Week","${cl_items_on_order.received_date_week}","cl_items_on_order.received_date_week",""],["Week of Year","${cl_items_on_order.received_date_week_of_year}","cl_items_on_order.received_date_week_of_year",""],["Year","${cl_items_on_order.received_date_year}","cl_items_on_order.received_date_year",""],["Transfer ID","${cl_items_on_order.transfer_id}","cl_items_on_order.transfer_id",""],["Type","${cl_items_on_order.order_type}","cl_items_on_order.order_type",""],["Vendor","${cl_items_on_order.vendor_name}","cl_items_on_order.vendor_name",""]]
const OnOrderDataNumType = [["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["Price","${item_prices.amount}","item_prices.amount",""],["Transfer ID","${cl_items_on_order.transfer_id}","cl_items_on_order.transfer_id",""],["Order ID","${cl_items_on_order.order_id}","cl_items_on_order.order_id",""]]
const OnOrderDataFilterTable = [["Company Name","FALSE","",""],["Ls Account ID","FALSE","",""],["Category","FALSE","",""],["Brand","FALSE","",""],["Category","FALSE","",""],["Top Level Category","FALSE","",""],["Custom SKU","FALSE","",""],["EAN","FALSE","",""],["Manufacturer SKU","FALSE","",""],["System ID","FALSE","",""],["UPC","FALSE","",""],["Attribute 1","FALSE","",""],["Attribute 2","FALSE","",""],["Attribute 3","FALSE","",""],["Manufacturer SKU","FALSE","",""],["Matrix","FALSE","",""],["Price","FALSE","",""],["Quantity on Hand","TRUE","",""],["Receiving Shop","FALSE","",""],["Sending Shop","FALSE","",""],["Archived (Yes / No)","FALSE","",""],["Complete (Yes / No)","FALSE","",""],["Date","FALSE","",""],["Day of Month","FALSE","",""],["Day of Week","FALSE","",""],["Month","FALSE","",""],["Month Name","FALSE","",""],["Quarter of Year","FALSE","",""],["Week","FALSE","",""],["Week of Year","FALSE","",""],["Year","FALSE","",""],["Date","FALSE","",""],["On Order (Yes / No)","FALSE","",""],["Order ID","FALSE","",""],["Date","FALSE","",""],["Week of Year","FALSE","",""],["Year","FALSE","",""],["Date","FALSE","",""],["Day of Month","FALSE","",""],["Day of Week","FALSE","",""],["Month","FALSE","",""],["Month Name","FALSE","",""],["Quarter of Year","FALSE","",""],["Week","FALSE","",""],["Week of Year","FALSE","",""],["Year","FALSE","",""],["Transfer ID","FALSE","",""],["Type","FALSE","",""],["Vendor","FALSE","",""],["# of Items","TRUE","",""],["Cost of Ordered","TRUE","",""],["Cost of Received","TRUE","",""],["Order Discounts","TRUE","",""],["Original Order Quantity","TRUE","",""],["Quantity on Order","TRUE","",""],["Retail Value on Order","TRUE","",""],["Retail Value Received","TRUE","",""],["Total Received Quantity","TRUE","",""]]

const PaymentDataLookML = [["Company Name","${cl_companies.company_name}","cl_companies.company_name","FALSE"],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id","FALSE"],["Full Name","${customers.full_name}","customers.full_name","FALSE"],["Type","${customer_types.name}","customer_types.name","FALSE"],["Store","${shops.name}","shops.name","FALSE"],["Channel","${cl_ecom_sales.sale_channel}","cl_ecom_sales.sale_channel","FALSE"],["Date","${sales.time_stamp_date}","sales.time_stamp_date","FALSE"],["Day of Month","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month","FALSE"],["Day of Week","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week","FALSE"],["Month","${sales.time_stamp_month}","sales.time_stamp_month","FALSE"],["Month Name","${sales.time_stamp_month_name}","sales.time_stamp_month_name","FALSE"],["Quarter of Year","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year","FALSE"],["Week","${sales.time_stamp_week}","sales.time_stamp_week","FALSE"],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year","FALSE"],["Year","${sales.time_stamp_year}","sales.time_stamp_year","FALSE"],["Employee","${employees.full_name}","employees.full_name","FALSE"],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop","FALSE"],["Sale ID","${sales.sale_id}","sales.sale_id","FALSE"],["# of Sales","${sale_lines.count_sales}","sale_lines.count_sales","TRUE"],["Avg Basket Size","${sales.avg_basket_size}","sales.avg_basket_size","TRUE"],["Avg Basket Value","${sales.average_sale_no_tax}","sales.average_sale_no_tax","TRUE"],["Margin","FILTER ONLY","sale_lines.margin_filter","FALSE"],["Quantity Sold","FILTER ONLY","sale_lines.quantity_sold_filter","FALSE"],["Discount Name","${discounts.name}","discounts.name","FALSE"],["Is Layaway (Yes / No)","${sale_lines.is_layaway}","sale_lines.is_layaway","FALSE"],["Is Miscellaneous (Yes / No)","${sale_lines.is_miscellaneous}","sale_lines.is_miscellaneous","FALSE"],["Is Special Order (Yes / No)","${sale_lines.is_special_order}","sale_lines.is_special_order","FALSE"],["Is Workorder (Yes / No)","${sale_lines.is_workorder}","sale_lines.is_workorder","FALSE"],["Tax Class","${tax_classes.name}","tax_classes.name","FALSE"],["# of Sale Lines","${sale_lines.count}","sale_lines.count","TRUE"],["Avg Discount","${sale_lines.discount_avg}","sale_lines.discount_avg","TRUE"],["Avg Quantity","${sale_lines.unit_avg}","sale_lines.unit_avg","TRUE"],["Avg Unit Price","${sale_lines.price_avg}","sale_lines.price_avg","TRUE"],["Margin","${sale_lines.margin}","sale_lines.margin","TRUE"],["Profit","${sale_lines.profit}","sale_lines.profit","TRUE"],["Cost","${sale_lines.total_cost}","sale_lines.total_cost","TRUE"],["Quantity Sold","${sale_lines.unit_total}","sale_lines.unit_total","TRUE"],["Payment Type","${payment_types.name}","payment_types.name","FALSE"],["Amount","${sale_payments.amount}","sale_payments.amount","TRUE"]]
const PaymentDataNoFilterOnly = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["Full Name","${customers.full_name}","customers.full_name",""],["Type","${customer_types.name}","customer_types.name",""],["Store","${shops.name}","shops.name",""],["Channel","${cl_ecom_sales.sale_channel}","cl_ecom_sales.sale_channel",""],["Date","${sales.time_stamp_date}","sales.time_stamp_date",""],["Day of Month","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month",""],["Day of Week","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week",""],["Month","${sales.time_stamp_month}","sales.time_stamp_month",""],["Month Name","${sales.time_stamp_month_name}","sales.time_stamp_month_name",""],["Quarter of Year","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year",""],["Week","${sales.time_stamp_week}","sales.time_stamp_week",""],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year",""],["Year","${sales.time_stamp_year}","sales.time_stamp_year",""],["Employee","${employees.full_name}","employees.full_name",""],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop",""],["Sale ID","${sales.sale_id}","sales.sale_id",""],["# of Sales","${sale_lines.count_sales}","sale_lines.count_sales",""],["Avg Basket Size","${sales.avg_basket_size}","sales.avg_basket_size",""],["Avg Basket Value","${sales.average_sale_no_tax}","sales.average_sale_no_tax",""],["Discount Name","${discounts.name}","discounts.name",""],["Is Layaway (Yes / No)","${sale_lines.is_layaway}","sale_lines.is_layaway",""],["Is Miscellaneous (Yes / No)","${sale_lines.is_miscellaneous}","sale_lines.is_miscellaneous",""],["Is Special Order (Yes / No)","${sale_lines.is_special_order}","sale_lines.is_special_order",""],["Is Workorder (Yes / No)","${sale_lines.is_workorder}","sale_lines.is_workorder",""],["Tax Class","${tax_classes.name}","tax_classes.name",""],["# of Sale Lines","${sale_lines.count}","sale_lines.count",""],["Avg Discount","${sale_lines.discount_avg}","sale_lines.discount_avg",""],["Avg Quantity","${sale_lines.unit_avg}","sale_lines.unit_avg",""],["Avg Unit Price","${sale_lines.price_avg}","sale_lines.price_avg",""],["Margin","${sale_lines.margin}","sale_lines.margin",""],["Profit","${sale_lines.profit}","sale_lines.profit",""],["Cost","${sale_lines.total_cost}","sale_lines.total_cost",""],["Quantity Sold","${sale_lines.unit_total}","sale_lines.unit_total",""],["Payment Type","${payment_types.name}","payment_types.name",""],["Amount","${sale_payments.amount}","sale_payments.amount",""]]
const PaymentDataNoUnfilterable = [["Company Name","${cl_companies.company_name}","cl_companies.company_name",""],["Ls Account ID","${cl_companies.ls_account_id}","cl_companies.ls_account_id",""],["Full Name","${customers.full_name}","customers.full_name",""],["Type","${customer_types.name}","customer_types.name",""],["Store","${shops.name}","shops.name",""],["Channel","${cl_ecom_sales.sale_channel}","cl_ecom_sales.sale_channel",""],["Date","${sales.time_stamp_date}","sales.time_stamp_date",""],["Day of Month","${sales.time_stamp_day_of_month}","sales.time_stamp_day_of_month",""],["Day of Week","${sales.time_stamp_day_of_week}","sales.time_stamp_day_of_week",""],["Month","${sales.time_stamp_month}","sales.time_stamp_month",""],["Month Name","${sales.time_stamp_month_name}","sales.time_stamp_month_name",""],["Quarter of Year","${sales.time_stamp_quarter_of_year}","sales.time_stamp_quarter_of_year",""],["Week","${sales.time_stamp_week}","sales.time_stamp_week",""],["Week of Year","${sales.time_stamp_week_of_year}","sales.time_stamp_week_of_year",""],["Year","${sales.time_stamp_year}","sales.time_stamp_year",""],["Employee","${employees.full_name}","employees.full_name",""],["Register","${cl_register_shops.register_shop}","cl_register_shops.register_shop",""],["Sale ID","${sales.sale_id}","sales.sale_id",""],["Margin","FILTER ONLY","sale_lines.margin_filter",""],["Quantity Sold","FILTER ONLY","sale_lines.quantity_sold_filter",""],["Discount Name","${discounts.name}","discounts.name",""],["Is Layaway (Yes / No)","${sale_lines.is_layaway}","sale_lines.is_layaway",""],["Is Miscellaneous (Yes / No)","${sale_lines.is_miscellaneous}","sale_lines.is_miscellaneous",""],["Is Special Order (Yes / No)","${sale_lines.is_special_order}","sale_lines.is_special_order",""],["Is Workorder (Yes / No)","${sale_lines.is_workorder}","sale_lines.is_workorder",""],["Tax Class","${tax_classes.name}","tax_classes.name",""],["Payment Type","${payment_types.name}","payment_types.name",""]]
const PaymentDataNumType = [["Sale ID","${sales.sale_id}","sales.sale_id",""],["Margin","FILTER ONLY","sale_lines.margin_filter",""],["Quantity Sold","FILTER ONLY","sale_lines.quantity_sold_filter",""]]
const PaymentDataFilterTable = [["Company Name","FALSE","",""],["Ls Account ID","FALSE","",""],["Full Name","FALSE","",""],["Type","FALSE","",""],["Store","FALSE","",""],["Channel","FALSE","",""],["Date","FALSE","",""],["Day of Month","FALSE","",""],["Day of Week","FALSE","",""],["Month","FALSE","",""],["Month Name","FALSE","",""],["Quarter of Year","FALSE","",""],["Week","FALSE","",""],["Week of Year","FALSE","",""],["Year","FALSE","",""],["Employee","FALSE","",""],["Register","FALSE","",""],["Sale ID","FALSE","",""],["# of Sales","TRUE","",""],["Avg Basket Size","TRUE","",""],["Avg Basket Value","TRUE","",""],["Margin","FALSE","",""],["Quantity Sold","FALSE","",""],["Discount Name","FALSE","",""],["Is Layaway (Yes / No)","FALSE","",""],["Is Miscellaneous (Yes / No)","FALSE","",""],["Is Special Order (Yes / No)","FALSE","",""],["Is Workorder (Yes / No)","FALSE","",""],["Tax Class","FALSE","",""],["# of Sale Lines","TRUE","",""],["Avg Discount","TRUE","",""],["Avg Quantity","TRUE","",""],["Avg Unit Price","TRUE","",""],["Margin","TRUE","",""],["Profit","TRUE","",""],["Cost","TRUE","",""],["Quantity Sold","TRUE","",""],["Payment Type","FALSE","",""],["Amount","TRUE","",""]]




// Filter Type	Type Def Pre	String	Type Def Suff
//FilterTable!A:D

const RefTable_StringF = [["IS","","{string}",""],["CONTAINS","%25","{string}",""],["STARTS WITH","","{string}",""],["ENDS WITH","%25","{string}",""],["IS BLANK","EMPTY","",""],["IS NULL","NULL","",""],["IS NOT","-","{string}",""],["DOESNT CONTAIN","-%25","{string}",""],["DOESNT START WITH","-","{string}",""],["DOESNT END WITH","-%25","{string}",""],["ISNT BLANK","-EMPTY","",""],["ISNT NULL","-NULL","",""]]



// Date Filter Type	Prefix	1	2	3
//FilterTable!F:K


const RefTable_DateF = [["IS IN THE LAST","","NUMVAL","DATETYPE1"],["IS ON THE DAY","","YEAR/","DAY"],["IS IN RANGE","","YEAR/MONTH/DAY","YEAR/MONTH/DAY"],["IS BEFORE (RELATIVE)","before+","NUMVAL","DATETYPE2"],["IS BEFORE (ABSOLUTE)","before+","YEAR/","DAY"],["IS ON OR AFTER (RELATIVE)","after+","NUMVAL","DATETYPE2"],["IS ON OR AFTER (ABSOLUTE)","after+","YEAR/","DAY"],["IS IN THE YEAR","","YEAR",""],["IS IN THE MONTH","","YEAR","MONTH"],["IS THIS","","this","DATESCHEM"],["IS NEXT","","next","DATESCHEM"],["IS PREVIOUS","","last","DATESCHEM"],["IS NULL","","NULL",""],["IS ANY TIME","","",""],["IS NOT NULL","","-NULL",""]]




//NUMTYPE	Type Def Pre	{number}	Type Def Suff
//FilterTable!X:AA

const RefTable_NumberF = [["IS","","{number}",""],["IS >","%3E","{number}",""],["IS >=","%3E%3D","{number}",""],["IS <","%3C","{number}",""],["IS <=","%3C%3D","{number}",""],["IS BETWEEN (INCLUSIVE)","%5B","{number}%2C{number2}",""],["IS BETWEEN (EXCLUSIVE)","%28","{number}%2C{number2}",""],["IS NULL","NULL","",""],["IS NOT","not+","{number}",""],["IS NOT BETWEEN (INCLUSIVE)","not+%5B","{number}%2C{number2}",""],["IS NOT BETWEEN (EXCLUSIVE)","not+%28","{number}%2C{number2}",""],["IS NOT NULL","not+NULL","",""]]





// DATETYPE	Date Type 1 Examples
//FilterTable!M:N

const RefTable_DateType1F = [["seconds","Seconds","",""],["minutes","Minutes","",""],["hours","Hours","",""],["days","Days","",""],["weeks","Weeks","",""],["months","Months","",""],["quarters","Quarters","",""],["years","Years","",""],["second+ago+for+NUMVAL+second","Complete Seconds","",""],["minute+ago+for+NUMVAL+minute","Complete Minutes","",""],["hour+ago+for+NUMVAL+hour","Complete Hours","",""],["day+ago+for+NUMVAL+day","Complete Days","",""],["week+ago+for+NUMVAL+week","Complete Weeks","",""],["month+ago+for+NUMVAL+month","Complete Months","",""],["quarter+ago+for+NUMVAL+quarter","Complete Quarters","",""],["year+ago+for+NUMVAL+year","Complete Years","",""]]



// DATETYPE 2	Date Type 2 Examples
//FilterTable!P:Q


const RefTable_DateType2F = [["seconds","seconds ago","",""],["minutes","minutes ago","",""],["hours","hours ago","",""],["days","days ago","",""],["weeks","weeks ago","",""],["months","months ago","",""],["quarters","quarters ago","",""],["years","years ago","",""],["seconds+from+now","seconds from now","",""],["minutes+from+now","minutes from now","",""],["hours+from+now","hours from now","",""],["days+from+now","days from now","",""],["weeks+from+now","weeks from now","",""],["months+from+now","months from now","",""],["quarters+from+now","quarters from now","",""],["years+from+now","years from now","",""]]




// DATESCHEM	Notation	Example
//FilterTable!S:U


const RefTable_DateSchemF = [["MONTH","2 Digit Notation","01,02,05,10",""],["YEAR","4 Digit Notation","2003 , 2005, 2024",""],["DAY","2 Digit Notation","01,02,05,10",""],["QUARTER","45295","1,2,3,4",""],["WEEK","1-53","1,5,36,53",""]]



























































































































































































































































































































































































































































































































































































































































































































































































































































