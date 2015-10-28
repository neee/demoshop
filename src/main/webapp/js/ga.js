/**
 * Created by antosha.
 * Date: 26.09.2014.
 */

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1247553-1']);
_gaq.push(['_setDomainName', 'alfabank.ru']);
_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_addIgnoredRef', 'alfabank.ru']);
//_gaq.push(['_setCustomVar', 2, 'A/B', 'A', 3]);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

$(document).ready(function() {
    //исполнить для каждого поля в $(document).ready()
    _gaq.push(['_trackPageview', "/pos_demo0"]);
});