View.$conversationContent = (function() {

    /**
     * @constructor
     */
    function PPConversationContent(items) {
        var ctrl = Ctrl.$conversationContent.init();
        View.PPDiv.call(this, {
            id: id,
            'class': id + ' pp-unselectable pp-box-sizing-borderbox',
            event: {
                click: function() {
                    ctrl.onConversationContentClicked();
                },
                init: function() {
                    ctrl.onConversationContentInit();
                }
            }
        }, ctrl);
        if (items && items.length > 0) {
            for (var i=0; i<items.length; ++i) {
                this.add(new View.PPConversationPart(items[i]));
            }
        }

        $timeout( function() {
            // Bind mouse wheel event
            var isFF = Service.$device.isFirefox(),
                event = isFF ? 'DOMMouseScroll' : 'mousewheel',
                $el = $( selector );
            
            $el.bind( event ,function( e ) {
                if ( Ctrl.$conversationQuickMessage.isEnabled() ) return;

                var st = $(this).scrollTop(),
                    delta = isFF ? -e.originalEvent.detail : e.originalEvent.wheelDelta /120;
                if ( delta > 0) {
                    if (st <= 0 ) { // Down
                        if (!View.$sheetHeader.isShowingTeamProfileFull()) {
                            View.$sheetHeader.showTeamProfileFull();
                        }
                    }
                } else { // Up
                    if (View.$sheetHeader.isShowingTeamProfileFull()) {
                        View.$sheetHeader.hideTeamProfileFull();
                    }
                }             
            } );
            
        } );
    }
    extend(PPConversationContent, View.PPDiv);

    var id = 'pp-conversation-content',
        selector = '#' + id;

    return {
        
        build: function(items) {
            return new PPConversationContent(items);
        },

        scrollToBottom: function() { //scroll to bottom
            $(selector).stop().animate({
                scrollTop: $(selector)[0].scrollHeight
            }, 600, 'swing');
            // $(selector).scrollTop($(selector)[0].scrollHeight);
        },

        html: function($el) {
            $(selector).html($el);
        },

        append: function(html) {
            $(selector).append(html);
        },

        show: function(fadeIn) {
            if (fadeIn) $(selector).show();
            else $(selector).fadeIn();
        }
    }
    
})();
