import { expect } from "@jest/globals";

describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500); 
       
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”


   
    await page.$eval( 'journal-entry', form => form.click() ); //Click on first entry
    //expect(page.url()).toMatch(/killmeplease/); //Just to test that this won't work
    let placeholder = '/#entry1';
    expect(page.url()).toMatch(placeholder); //This should check if it contains /#entry1

    //This works!

  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 

    await page.$eval( 'journal-entry', form => form.click() ); //Click on first entry

    
    let element = await page.$('h1')
    let value = await page.evaluate(el => el.textContent, element)
    
    expect(value).toMatch(/Entry 1/);

    //This works!


  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */


    await page.$eval( 'journal-entry', form => form.click() ); //Click on first entry


    const [elementHandle] = await page.$x('/html/body/main/journal-entry[1]');
    const propertyHandle = await elementHandle.getProperty('entry'); //I guess this is like doing .entry kinda? 
    const propertyValue = await propertyHandle.jsonValue();


    var obj = new Object();
    obj.title = "You like jazz?";
    obj.date  = '4/25/2021';
    obj.content = "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.";

    var innerObj = new Object();
    innerObj.src = 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455';
    innerObj.alt = 'bee with sunglasses';

    obj.image = innerObj;
    
    expect(propertyValue).toEqual(obj);

    

    

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’

    await page.$eval( 'journal-entry', form => form.click() ); //Click on first entry

    const el = await page.$('body');

    const className = await (await el.getProperty('className')).jsonValue();

    expect(className).toBe('single-entry');

    //It works!

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”

    await page.$eval( 'img', form => form.click() );

    let placeholder = '/#settings'; //Using this placeholder because regex doesn't like forward slashes
    expect(page.url()).toMatch(placeholder); //This should check if it contains /#settings

    //It works!

  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”

    await page.$eval( 'img', form => form.click() );
    
    let element = await page.$('h1')
    let value = await page.evaluate(el => el.textContent, element)
    
    expect(value).toMatch(/Settings/);

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’

    await page.$eval( 'img', form => form.click() );

    const el = await page.$('body');

    const className = await (await el.getProperty('className')).jsonValue();

    expect(className).toBe('settings');

  });

  

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’

    await page.$eval( 'journal-entry', form => form.click() ); //Click on first entry

    await page.$eval( 'img', form => form.click() );


    await page.goBack(); //Simulates clikcing the back button

    
    let placeholder = '/#entry1'; //Using this placeholder because regex doesn't like forward slashes
    expect(page.url()).toMatch(placeholder); //This should check if it contains /#entry1
    


  });


  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    let placeHolder = page.url(); //starting url (home)

    await page.$eval( 'journal-entry', form => form.click() ); //Click on first entry

    await page.goBack(); //Simulates clikcing the back button

    
 
    expect(page.url()).toBe(placeHolder); //This should check if it contains /#entry1
    


  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be “Journal Entries', async() => {

    await page.$eval( 'h1', form => form.click() ); //Click on header

    let element = await page.$('h1')
    let value = await page.evaluate(el => el.textContent, element)
    
    expect(value).toBe('Journal Entries');

  });

  


  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute ', async () => {

    await page.$eval( 'h1', form => form.click() ); //Click on header

    const el = await page.$('body');

    const className = await (await el.getProperty('className')).jsonValue();

    expect(className).toBe('');

  });


  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async () => {
   

    await page.$$eval( 'journal-entry', form => form[1].click() ); //select the array element at index 1 for the second entry


    let placeholder = '/#entry2';
    expect(page.url()).toMatch(placeholder); 



  });


  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async () => {
   

    await page.$$eval( 'journal-entry', form => form[1].click() ); //select the array element at index 1 for the second entry


    let element = await page.$('h1')
    let value = await page.evaluate(el => el.textContent, element)
    
    expect(value).toMatch(/Entry 2/);

  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async () => {

    await page.$$eval( 'journal-entry', form => form[1].click() ); //select the array element at index 1 for the second entry


    const [elementHandle] = await page.$x('/html/body/main/journal-entry[2]');
    const propertyHandle = await elementHandle.getProperty('entry'); //I guess this is like doing .entry kinda? 
    const propertyValue = await propertyHandle.jsonValue();


    
    var obj = new Object();
    obj.title = "Run, Forrest! Run!";
    obj.date  = '4/26/2021';
    obj.content = "Mama always said life was like a box of chocolates. You never know what you're gonna get.";

    var innerObj = new Object();
    innerObj.src = 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg';
    innerObj.alt = 'forrest running';

    obj.image = innerObj;
    
    expect(propertyValue).toEqual(obj);

  }, 10000);



  // create your own test 17
  // define and implement test17: Verify the url is correct when clicking on the third entry
  it('Test17: Verify the url is correct when clicking on the third entry', async () => {
   

    await page.$$eval( 'journal-entry', form => form[2].click() ); //select the array element at index 2 for the third entry


    let placeholder = '/#entry3';
    expect(page.url()).toMatch(placeholder); 



  });


  // create your own test 18
  // define and implement test15: Verify the title is current when clicking on the third entry
  it('Test18: Verify the title is current when clicking on the second entry', async () => {
   

    await page.$$eval( 'journal-entry', form => form[2].click() ); //select the array element at index 1 for the second entry


    let element = await page.$('h1')
    let value = await page.evaluate(el => el.textContent, element)
    
    expect(value).toMatch(/Entry 3/);

  });


  // create your own test 19
  it('Test19: Verify the entry page contents is correct when clicking on the third entry', async () => {

    await page.$$eval( 'journal-entry', form => form[2].click() ); //select the array element at index 1 for the second entry


    const [elementHandle] = await page.$x('/html/body/main/journal-entry[3]');
    const propertyHandle = await elementHandle.getProperty('entry'); //I guess this is like doing .entry kinda? 
    const propertyValue = await propertyHandle.jsonValue();


    
    var obj = new Object();
    obj.title = "Ogres are like onions";
    obj.date  = '4/27/2021';
    obj.content = "Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.";

    var innerObj = new Object();
    innerObj.src = 'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg';
    innerObj.alt = 'shrek and donkey looking confused';

    obj.image = innerObj;
    
    expect(propertyValue).toEqual(obj);

  }, 10000);

  // create your own test 20
  // define and implement test20: Verify the url is correct when clicking on the 10th entry
  it('Test20: Verify the url is correct when clicking on the tenth entry', async () => {
   

    await page.$$eval( 'journal-entry', form => form[9].click() ); //select the array element at index 2 for the third entry


    let placeholder = '/#entry10';
    expect(page.url()).toMatch(placeholder); 



  });
  
});
