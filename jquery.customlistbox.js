(function($) {

    $.fn.customSelectBox = function(options) {
        var opts = $.extend({
            disabledCls: 'disabled',
            selectedCls: 'selected',
            maxSelectedCount: 1
        }, options);

        function CreateCusomSelectBox(select, opts) {
            if (!(this instanceof CreateCusomSelectBox)) {
                return new CreateCusomSelectBox(select, opts);
            }

            this.opts = opts;
            this.maxSelectedCount = ($(select).prop('multiple') ? ($(select).attr('data-maxSelectedCount') || this.opts.maxSelectedCount) : 1);
            this.triggerSelectUpdate = false;
            this.$originalSelect = $(select);
            this.$customSelect = this.createCustomSelect($('option', select));

            this.$originalSelect.wrap('<div class="customMutipleSelectBox" style="display: none;" />')
                .hide()
                .parent()
                .prepend(this.$customSelect)
                .show();

            this.bindOriginalSelectEvent();
            this.bindCustomSelectEvent();
            this.$originalSelect.change();
        }

        CreateCusomSelectBox.prototype.createCustomSelect = function($options) {
            var itemsHtml = ['<ul>'],
                _this = this;
            $options.each(function(i) {
                var $item = $(this);
                itemsHtml.push('<li><a href="#" title="' + $(this).html() + '" data-index="' + i + '">' + $(this).html() + '</a></li>');
            });
            itemsHtml.push('</ul>');

            return $(itemsHtml.join(''));
        };

        CreateCusomSelectBox.prototype.customEvents = {
            OptionSelected: 'OptionSelected',
            OptionUnSelected: 'OptionUnSelected',
            ItemSelected: 'ItemSelected',
            ItemUnSelected: 'ItemUnSelected',
            ItemPreSelected: 'ItemPreSelected',
            ItemPreUnSelected: 'ItemPreUnSelected',
            Disabled: 'Disabled',
            UnDisabled: 'UnDisabled'
        };

        CreateCusomSelectBox.prototype.getOriginalSelectEvents = function() {
            var _this = this;
            return {
                update: function(e) {
                    _this.triggerSelectUpdate = true;

                    switch (e.type) {
                        case _this.customEvents.OptionSelected:
                            $(this)[0].selected = true;
                            break;
                        case _this.customEvents.OptionUnSelected:
                            $(this)[0].selected = false;
                            break;
                        default:
                            return;
                    }

                    _this.$originalSelect.change();
                },
                change: function(e) {
                    if (_this.triggerSelectUpdate) {
                        _this.triggerSelectUpdate = false;
                    } else {
                        $(this).find('option').each(function(i) {
                            var $item = _this.$customSelect.find('a[data-index=' + i + ']');


                            if ($(this).is(':disabled')) {
                                $(this).prop('selected', false);
                                return;
                            }

                            if ($(this).is(':selected')) {
                                $item.trigger(_this.customEvents.ItemSelected);
                            } else {
                                $item.trigger(_this.customEvents.ItemUnSelected);
                            }
                        });
                    }
                },
                disabled: function(e) {
                    $(this).prop('disabled', true);
                },
                unDisabled: function(e) {
                    $(this).prop('disabled', false);
                }
            };
        };

        CreateCusomSelectBox.prototype.bindOriginalSelectEvent = function() {
            var originalSelectEvents = this.getOriginalSelectEvents();

            this.$originalSelect.bind('change', originalSelectEvents.change);

            this.$originalSelect.find('option')
                .bind(this.customEvents.OptionSelected, originalSelectEvents.update)
                .bind(this.customEvents.OptionUnSelected, originalSelectEvents.update)
                .bind(this.customEvents.Disabled, originalSelectEvents.disabled)
                .bind(this.customEvents.UnDisabled, originalSelectEvents.unDisabled);

        };

        CreateCusomSelectBox.prototype.isOverMaxCount = function() {
            return this.maxSelectedCount <= 0;
        };

        CreateCusomSelectBox.prototype.getCustomSelectEvents = function() {
            var _this = this,
                disabledCls = _this.opts.disabledCls,
                selectedCls = _this.opts.selectedCls,
                customEvents = _this.customEvents;

            var triggerOriginalOptionEvent = function(index, eventType) {
                _this.$originalSelect.find('option:eq(' + index + ')').trigger(eventType);
            };

            return {
                change: function(e) {
                    e.preventDefault();

                    var $item = $(e.target);

                    if ($item.hasClass(disabledCls) || $item.parents('ul').hasClass(disabledCls)) {
                        return;
                    }

                    if ($item.hasClass(selectedCls)) {
                        $item.trigger(customEvents.ItemPreUnSelected);
                    } else {
                        $item.trigger(customEvents.ItemPreSelected);
                    }
                },
                disabled: function(e) {
                    $(this).addClass(disabledCls);
                    triggerOriginalOptionEvent($(this).attr('data-index'), customEvents.Disabled);
                },
                unDisabled: function(e) {
                    $(this).removeClass(disabledCls);
                    triggerOriginalOptionEvent($(this).attr('data-index'), customEvents.UnDisabled);
                },
                unSelectedItem: function(e) {

                    if (_this.isOverMaxCount()) {
                        _this.$customSelect.find('a.' + disabledCls).trigger(customEvents.UnDisabled);
                    }

                    if ($(this).hasClass(selectedCls)) {
                        $(this).removeClass(selectedCls);
                        _this.maxSelectedCount = _this.maxSelectedCount + 1;
                    }
                },
                selectedItem: function(e) {
                    $(this).addClass(selectedCls);
                    _this.maxSelectedCount = _this.maxSelectedCount - 1;

                    if (_this.isOverMaxCount()) {
                        _this.$customSelect.find('a:not(.' + selectedCls + ')').trigger(customEvents.Disabled);
                    }
                },
                preUnSelectedItem: function(e) {
                    var $item = $(this);

                    triggerOriginalOptionEvent($item.attr('data-index'), customEvents.OptionUnSelected);
                    $item.trigger(customEvents.ItemUnSelected);
                },
                preSelectedItem: function(e) {
                    if (_this.isOverMaxCount()) return;

                    var $item = $(this);

                    triggerOriginalOptionEvent($item.attr('data-index'), customEvents.OptionSelected);
                    $item.trigger(customEvents.ItemSelected);
                }
            };
        };

        CreateCusomSelectBox.prototype.bindCustomSelectEvent = function() {
            var events = this.getCustomSelectEvents();
            this.$customSelect.find('a')
                .bind('click', events.change)
                .bind(this.customEvents.ItemPreSelected, events.preSelectedItem)
                .bind(this.customEvents.ItemPreUnSelected, events.preUnSelectedItem)
                .bind(this.customEvents.ItemSelected, events.selectedItem)
                .bind(this.customEvents.ItemUnSelected, events.unSelectedItem)
                .bind(this.customEvents.Disabled, events.disabled)
                .bind(this.customEvents.UnDisabled, events.unDisabled);
        };

        return this.each(function() {
            CreateCusomSelectBox(this, opts);
        });
    };
})(jQuery);