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
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
        * in the allFeeds object and ensures it has a URL defined
        * and that the URL is not empty.
        */
        function test_for_url(feed) {
            it('have a URL defined', function() {
                expect(feed.url).toBeTruthy();
            });

         }

        // This test looped through each feed and determines that each
        // feed has a name and not empty.
        it('name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
                expect(typeof feed.name).toEqual('string');
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    // Menu test suite.
    describe('The menu', function() {
      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */

        // This test ensures the menu element is hidden by default.
        it('hides by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // This test validates proper functioning of the menuicon menu toggle.
        it('changes visibility when clicked', function() {
            var menuicon = $('.menu-icon-link');

            // This tests for menu display.
            menuicon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // This tests for menu hide.
            menuicon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    // Initial entries test suite.
    describe('Initial Entries', function() {

        // beforeEach allows for use of asynchronous loadFeed().
        beforeEach(function(done) {
            loadFeed(0, done);
            });

        // tests that there is at least one entry in feed.
        it('at least a single entry element is within feed container', function() {
            expect($('.entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {

      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
        var $previousfeed;
        var $afterfeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                previousfeed = $('.feed').html();
                done();
            });
        });

        it('content changes when new feed is loaded', function(done) {
            loadFeed(1, function() {
                afterfeed = $('.feed').html();
                expect(afterfeed).not.toEqual(previousfeed);
                done();
            });
        });
    });
}());
