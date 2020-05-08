let fs=require("fs");
let puppeteer=require("puppeteer");
let cFile=process.argv[2];
let username=process.argv[4];
let num=process.argv[3];
(async function(){
    let browser=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        slowMo:100,
        args:["--incognito","--start-maximized","--disable-notifications"]
    });
    let pages=await browser.pages();
    let page=pages[0];
    //await page.goto("https://www.google.com");
    let data=await fs.promises.readFile(cFile);
    let{url,pwd,user}=JSON.parse(data);
    await page.goto(url,{waitUntil:"networkidle2"});
    await page.waitForSelector("input[name=username]",{visible:true})
    await page.type("input[name=username]",user,{delay:20});
    await page.type("input[name=password]",pwd,{delay:20});
    await Promise.all([page.click("button[type=submit]"),page.waitForNavigation({waitUntil:"networkidle2"})]);
    await page.waitForSelector(".XTCLo.x3qfX",{visible:true});
    await page.type(".XTCLo.x3qfX",username);
    await page.keyboard.press("Enter");
    await page.waitForSelector(".Ap253",{visible:true});
    let instapages=await page.$$(".Ap253");
    await Promise.all([instapages[0].click(),page.waitForNavigation({waitUntil:"networkidle2"})]);
               console.log("Reached till page")
               let idx=0;
               let i=1;
               
     while(true){
           await page.waitForSelector(".ySN3v .KL4Bh",{timeout:0});
           let likeposts=await page.$$(".KL4Bh");
           if(likeposts==null){
               console.log(idx);
               return;
           }
           //console.log(likeposts.length);
           if(idx==31){
               idx=28;
           }
            await Promise.all([likeposts[idx].click(),page.waitForNavigation({waitUntil:"networkidle2"})]);
           await page.waitForSelector(".fr66n");
           await page.click(".fr66n",{delay:100});
           console.log(i+" posts liked");
           await Promise.all([page.click("svg[aria-label=Close]",{delay:100}),page.waitForNavigation({waitUntil:"networkidle2"})]);
           i++;
           idx++;
     }
      // }
    

    })();