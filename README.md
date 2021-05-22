# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

   - 1.) Within a Github action that runs whenever code is pushed 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

    - No, because the "message" feature in its entirety involves several different components of the program and how the interact with eachother. It wouldn't be a test of each and every individual component. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

    - Yes, this is a feature that is small enough to be compartmentalized into its own individual component, and therefore would be suitable for a unit test. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

    - If we set "headless" to true, it will run the tests without a browser UI. We would not see how the Puppeteer API interacts with our webpage.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

```
beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.$eval( 'img', form => form.click() );
    await page.waitForTimeout(500);    
  });
```

