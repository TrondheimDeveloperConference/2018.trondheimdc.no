export default function installAnalytics(){
    try {
        let hash = location.hash;
        if (hash.length > 2 && hash.indexOf('clientid=') !== -1) {
            const clientId = hash.substring(hash.indexOf('clientid=') + 'clientid='.length, hash.indexOf('&favs'));
            console.log(`Got clientid ${clientId} from hash`);
            localStorage.setItem('tdc-client-uuid', clientId);
        }
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga(function(tracker) {
            const clientId = tracker.get('clientId');
            console.log(`Got GA id ${clientId}`);
            localStorage.setItem('tdc-client-uuid', clientId);
        });
        ga('set', 'anonymizeIp', true);
        if (localStorage) {
            let clientuuid = localStorage.getItem('tdc-client-uuid');
            if (!clientuuid) {
                clientuuid = uuid.v4();
                console.log(`Creating client id ${clientuuid}`);
                localStorage.setItem('tdc-client-uuid', clientuuid);
            }

            ga('create','UA-98174789-1', {
                'storage': 'none',
                'storeGac': false,
                'clientId': clientuuid
            });

        } else {
            ga('create','UA-98174789-1','auto');
        }
        ga('send','pageview');
    } catch (e) {
        console.error(e);
    }
};