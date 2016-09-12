var mobileAppInstall = (function () {
    var ua = navigator.userAgent,
        loadIframe;

    function getIntentIframe() {
        if (!loadIframe) {
            var iframe = document.createElement("iframe");
            iframe.style.cssText = "display:none;width:0px;height:0px;";
            document.body.appendChild(iframe);
            loadIframe = iframe;
        }
        return loadIframe;
    }

    var appInstall = {
        appurl: 'douban://douban.com/movie/22939161?from=mdouban',
        h5url: 'https://www.douban.com/doubanapp/?from_card=1&amp;channel=card_movie'.replace(/&amp;/g, '&'),
        timeout: 500,

        getiOSVersion: function () {
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            }
            return null;
        },
        /**
         * 尝试跳转appurl,如果跳转失败，进入h5url
         * @param {Object} appurl 应用地址
         * @param {Object} h5url  http地址
         */
        open: function () {
            appInstall.openApp();
            setTimeout(function () {
                appInstall.openH5();
            }, this.timeout)
        },
        openApp: function () {
            var version = this.getiOSVersion();
            if (version && version[0] > 8) {
                // iOS 9 do not support custom protocal in iframe src
                // http://stackoverflow.com/questions/31891777/ios-9-safari-iframe-src-with-custom-url-scheme-not-working
                this.openH5();
            } else {
                getIntentIframe().src = this.appurl;
            }

        },

        openH5: function () {
            window.location.href = this.h5url;
        }
    };

    return appInstall;
})();
mobileAppInstall.open();