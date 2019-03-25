export default function injectStylesheet(ruleText: string): any
{
    let sheets = document.styleSheets;
    
    if(sheets.length === 0)
    {
        let style = document.createElement('style');
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
    }
    
    let sheet: any = sheets[sheets.length - 1];
    console.log(sheet.insertRule);
    sheet.insertRule(ruleText, sheet.rules ? sheet.rules.length : sheet.cssRules.length);
}