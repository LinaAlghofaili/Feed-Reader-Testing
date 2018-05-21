/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // First suite
    describe('RSS Feeds', function() {

        // test that ensure feeds are defined & not empty
        it('feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // test that ensure feed urls are defined & not empty
        it('urls are defined', function() {
            for(let i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        // test that ensure feed names are defined & not empty
        it('names are defined', function() {
            for(let i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].length).not.toBe(0);
            }
        });
    });


    // Second suite
    describe('The menu', function() { 

        // test that ensures the menu element is hidden by default
        it('menu element is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        // test that ensures the menu changes visibility when the menu icon is clicked
        it('menu changes visibility when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });

    // Third suite
    describe('Initial Entries', function() { 
        // loadFeed() is asynchronous so it requires Jasmine's beforeEach & asynchronous done() function
        beforeEach(function (done) {
            loadFeed(0, function() {
                done();
            });
        });

        // test that there is at least a single .entry element within the .feed container
        it('ensure if there is at least a single entry', function() {
            expect($('.entry .feed')).toBeDefined();
        });
    });

    // Forth suite
    describe('New Feed Selection', function() { 

        let newFeed,
            oldFeed;   

        // loadFeed() is asynchronous so it requires Jasmine's beforeEach & asynchronous done() function
        beforeEach(function (done) {
            $('.feed').empty();
            loadFeed(0, function() {
                oldFeed = $('.feed').find(allFeeds.url);
                done();
            });
            loadFeed(1, function() {
                newFeed = $('.feed').find(allFeeds.url);
                done();
            });
        });

        // test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
        it('ensure if new feed is different from old one', function() {
            expect(oldFeed).not.toBe(newFeed);
        });
    });   
}());
