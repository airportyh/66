define(function(require) {

    var Router = require('index');

    console.log(Router);

    describe('Router', function() {

        beforeEach(function() {
            this.router = new Router();
            this.router.start();
        });

        describe('enabling click captures', function() {

            beforeEach(function() {
                this.anchor = document.createElement('a');
                this.clickEvent = document.createEvent('MouseEvent');
                this.clickEvent.initEvent('click', true, false);

                this.router.captureAnchorTagClicks(this.anchor);
                this.historyStub = spyOn(history, 'pushState');
            });

            afterEach(function() {
                this.router.handleClicks = this.originalClickHandler;
            });

            it('does not capture hash anchors', function() {
                this.anchor.href = '#hash';
                this.anchor.dispatchEvent(this.clickEvent);

                expect(this.historyStub).not.toHaveBeenCalled();
            });

            it('captures anchor tags with relative urls', function() {
                this.anchor.href = 'post/1';
                this.anchor.dispatchEvent(this.clickEvent);

                expect(this.historyStub).toHaveBeenCalled();
            });

            it('captures anchor tags with local urls', function() {
                this.anchor.href = location.origin + '/localurl';
                this.anchor.dispatchEvent(this.clickEvent);

                expect(this.historyStub).toHaveBeenCalled();
            });

            it('does not capture anchor tags with target set to blank', function() {
                this.anchor.href = location.origin + '/localurl';
                this.anchor.target = '_blank';
                this.anchor.dispatchEvent(this.clickEvent);

                expect(this.historyStub).not.toHaveBeenCalled();
            });

        });

    });

});
