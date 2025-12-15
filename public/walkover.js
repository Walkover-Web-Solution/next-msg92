(function (window, document) {
    'use strict';

    // =====================
    // Utilities
    // =====================
    function uuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
            (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
        );
    }

    function now() {
        return Date.now();
    }

    function safeJSON(data) {
        try {
            return JSON.stringify(data);
        } catch {
            return '{}';
        }
    }

    // =====================
    // Storage
    // =====================
    function getOrCreate(key, storage) {
        var value = storage.getItem(key);
        if (!value) {
            value = uuid();
            storage.setItem(key, value);
        }
        return value;
    }

    // =====================
    // Core SDK
    // =====================
    function Analytics() {
        this.config = {};
        this.userId = null;
        this.consentGranted = false;
        this.anonymousId = null;
        this.sessionId = null;
    }

    Analytics.prototype.init = function (config) {
        this.config = config || {};
        this.anonymousId = getOrCreate('an_uid', localStorage);
        this.sessionId = getOrCreate('an_sid', sessionStorage);

        if (this.config.autoTrack !== false) {
            this._autoPage();
            this._autoClicks();
        }
    };

    Analytics.prototype.consent = function (flags) {
        this.consentGranted = !!(flags && flags.analytics === true);
    };

    Analytics.prototype.identify = function (userId, traits) {
        if (!this.consentGranted) return;
        this.userId = userId;
        this.track('Identify', traits || {});
    };

    Analytics.prototype.track = function (event, properties) {
        if (!this.consentGranted || !event) return;

        var payload = {
            event: event,
            userId: this.userId,
            anonymousId: this.anonymousId,
            sessionId: this.sessionId,
            properties: properties || {},
            context: this._context(),
            timestamp: now(),
        };

        this._send(payload);
    };

    Analytics.prototype.page = function () {
        this.track('Page Viewed');
    };

    Analytics.prototype.reset = function () {
        this.userId = null;
    };

    // =====================
    // Internals
    // =====================
    Analytics.prototype._send = function (payload) {
        var url = this.config.endpoint;
        if (!url) return;

        var body = safeJSON(payload);

        if (navigator.sendBeacon) {
            navigator.sendBeacon(url, body);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(body);
        }
    };

    Analytics.prototype._context = function () {
        return {
            page: {
                url: location.href,
                referrer: document.referrer || '',
                title: document.title || '',
            },
            device: {
                userAgent: navigator.userAgent,
                screen: screen.width + 'x' + screen.height,
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
        };
    };

    Analytics.prototype._autoPage = function () {
        var self = this;
        if (document.readyState === 'complete') {
            self.page();
        } else {
            window.addEventListener('load', function () {
                self.page();
            });
        }
    };

    Analytics.prototype._autoClicks = function () {
        document.addEventListener('click', function (e) {
            var el = e.target.closest('[data-track]');
            if (!el) return;

            window.analytics.track('Element Clicked', {
                label: el.getAttribute('data-track'),
            });
        });
    };

    // =====================
    // Expose globally
    // =====================
    window.analytics = new Analytics();
})(window, document);
