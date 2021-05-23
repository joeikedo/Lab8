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
    

    /*
    await page.$eval( 'journal-entry', form => form.click() ); //Click on first entry

    const [elementHandle] = await page.$x('/html/body/main/journal-entry[1]');
    const propertyHandle = await elementHandle.getProperty('innerText');
    const propertyValue = await propertyHandle.jsonValue();

    expect(propertyValue).toMatch(/kill me/);
    */

    //I'm gonna try and come back to this one
    
    //!!!!!!!!!TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!

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

    

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’

  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’

  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”


  // define and implement test13: On the home page the <body> element should not have any class attribute 


  // define and implement test14: Verify the url is correct when clicking on the second entry


  // define and implement test15: Verify the title is current when clicking on the second entry


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry


  // create your own test 17

  // create your own test 18

  // create your own test 19

  // create your own test 20
  
});
