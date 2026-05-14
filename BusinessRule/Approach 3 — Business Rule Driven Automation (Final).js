(function executeRule(current, previous /*null when async*/) {
    try {
        var r = new sn_ws.RESTMessageV2('Snow ebonding integration', 'Problem Creation');
        r.setStringParameterNoEscape('sd', current.short_description);
        r.setStringParameterNoEscape('desc', current.description);
        var response = r.execute();
        var responseBody = response.getBody();
        var httpStatus = response.getStatusCode();
        gs.log("The response from target instance is " + responseBody);
        gs.log("The status code of my REST message is " + httpStatus);
    } catch (ex) {
        var message = ex.message;
    }
})(current, previous);
