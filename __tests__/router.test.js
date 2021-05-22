/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';
import { pushToHistory } from '../scripts/router.js';

//Default new page history length is 1
 test('History length test', () => {
    let returnHistory = pushToHistory("");
    expect(returnHistory.length).toBe(2);
});

//Settings page
test('Settings page', () => {
    let returnHistory = pushToHistory("settings");
    expect(returnHistory.state).toStrictEqual({"page": "settings"})
});

//Home page
test('Home page', () => {
    let returnHistory = pushToHistory("home");
    expect(returnHistory.state).toStrictEqual({});
});

//Entry 1 to 10
describe('Entry 1 to 10', () => {
    test('Entry 1', () => {
        let returnHistory = pushToHistory("entry", 1);
        expect(returnHistory.state).toStrictEqual({page: "entry1"});
    });
    
    test('Entry 2', () => {
        let returnHistory = pushToHistory("entry", 2);
        expect(returnHistory.state).toStrictEqual({page: "entry2"});
    });
    
    test('Entry 3', () => {
        let returnHistory = pushToHistory("entry", 3);
        expect(returnHistory.state).toStrictEqual({page: "entry3"});
    });
    
    test('Entry 4', () => {
        let returnHistory = pushToHistory("entry", 4);
        expect(returnHistory.state).toStrictEqual({page: "entry4"});
    });
    
    test('Entry 5', () => {
        let returnHistory = pushToHistory("entry", 5);
        expect(returnHistory.state).toStrictEqual({page: "entry5"});
    });
    
    test('Entry 6', () => {
        let returnHistory = pushToHistory("entry", 6);
        expect(returnHistory.state).toStrictEqual({page: "entry6"});
    });
    
    test('Entry 7', () => {
        let returnHistory = pushToHistory("entry", 7);
        expect(returnHistory.state).toStrictEqual({page: "entry7"});
    });
    
    test('Entry 8', () => {
        let returnHistory = pushToHistory("entry", 8);
        expect(returnHistory.state).toStrictEqual({page: "entry8"});
    });
    
    test('Entry 9', () => {
        let returnHistory = pushToHistory("entry", 9);
        expect(returnHistory.state).toStrictEqual({page: "entry9"});
    });
    
    test('Entry 10', () => {
        let returnHistory = pushToHistory("entry", 10);
        expect(returnHistory.state).toStrictEqual({page: "entry10"});
    });
  });

/*
test('Entry 1', () => {
    let returnHistory = pushToHistory("entry", 1);
    expect(returnHistory.state).toStrictEqual({page: "entry1"});
});

test('Entry 2', () => {
    let returnHistory = pushToHistory("entry", 2);
    expect(returnHistory.state).toStrictEqual({page: "entry2"});
});

test('Entry 3', () => {
    let returnHistory = pushToHistory("entry", 3);
    expect(returnHistory.state).toStrictEqual({page: "entry3"});
});

test('Entry 4', () => {
    let returnHistory = pushToHistory("entry", 4);
    expect(returnHistory.state).toStrictEqual({page: "entry4"});
});

test('Entry 5', () => {
    let returnHistory = pushToHistory("entry", 5);
    expect(returnHistory.state).toStrictEqual({page: "entry5"});
});

test('Entry 6', () => {
    let returnHistory = pushToHistory("entry", 6);
    expect(returnHistory.state).toStrictEqual({page: "entry6"});
});

test('Entry 7', () => {
    let returnHistory = pushToHistory("entry", 7);
    expect(returnHistory.state).toStrictEqual({page: "entry7"});
});

test('Entry 8', () => {
    let returnHistory = pushToHistory("entry", 8);
    expect(returnHistory.state).toStrictEqual({page: "entry8"});
});

test('Entry 9', () => {
    let returnHistory = pushToHistory("entry", 9);
    expect(returnHistory.state).toStrictEqual({page: "entry9"});
});

test('Entry 10', () => {
    let returnHistory = pushToHistory("entry", 10);
    expect(returnHistory.state).toStrictEqual({page: "entry10"});
});

*/