(function(){
    // 获取 amp-investment-analysis 模块
    var investmentAnalysisModule = null;
    try{
        investmentAnalysisModule = angular.module("amp-investment-analysis");
    }catch(e){
        investmentAnalysisModule = angular.module("amp-investment-analysis", []);
    }

    investmentAnalysisModule.service("loanRepaymentAnalysisCalculationService",function(){
        this.ipmt = ipmt;
        this.ppmt = ppmt;
        this.pmt = pmt;
    });

    /**
     * PPmt(rate, per, nper, pv[, fv[, type]])
     　　rate 必要。Double 指定每一期的利率。例如，如果有一笔贷款年百分比率 (APR) 为百分之十且按月付款的汽车贷款，则每一期的利率为 0.1/12 或 0.0083。
     　　per 必要。Integer 指定在 nper 间范围 1 中的付款周期。
     　　nper 必要。Integer 指定一笔年金的付款总期数。例如，如果对一笔为期四年的汽车贷款选择按月付款，则贷款共有 4 * 12（或 48）个付款期。
     　　pv 必要。Double 指定未来一系列付款或收款的现值。例如，当贷款买一辆汽车时，向贷方所借贷的金额为将来每月偿付给贷方款项的现值。
     　　fv 可选。Variant 指定在付清贷款后所希望的未来值或现金结存值。例如，贷款的未来值在贷款付清后为 0 美元。但是，如果想要在 18 年间存下 50，000 美元作为子女教育基金，那么 50，000 美元为未来值。如果省略的话，缺省值为 0。
     　　type 可选。Variant 指定贷款到期时间。如果贷款是在贷款周期结束时到期，则请使用 0。如果贷款是在周期开始时到期，则请使用 1。如果省略的话，缺省值为 0。
     　　说明：金是在一段时间内一系列固定现金支付。年金可以是贷款（如房屋抵押贷款），也可以是一笔投资（如按月储蓄计划）。 在支付期间必须用相同的单位计算 rate 和 nper 参数。
     　　例如，如果 rate 用月份计算，则 nper 也必须用月份计算。 对所有参数，用负数表示现金支出（如储蓄存款），而用正数表示现金收入（如红利支票）。
     *
     */
    function _pmt(r, nper, pv, fv, type) {
        if (r == 0) return -(pv + fv)/nper;

        // i.e., pmt = r / ((1 + r)^N - 1) * -(pv * (1 + r)^N + fv)
        var  pmt = r / (Math.pow(1 + r, nper) - 1)
            * -(pv * Math.pow(1 + r, nper) + fv);

        // account for payments at beginning of period versus end.
        if (type == 1)
            pmt /= (1 + r);

        // return results to caller.
        return pmt;
    }


    /**
     * PMT基于固定利率及等额分期付款方式，返回贷款的每期付款额。
     * @param r
     * @param nper
     * @param pv
     * @returns {*}
     */
    function pmt(r, nper, pv) {
        return _pmt(r, nper, pv,0, 0);
    }

    function _fv(r, nper, c, pv, type) {
        if (r==0) return pv;

        // account for payments at beginning of period versus end.
        // since we are going in reverse, we multiply by 1 plus interest rate.
        if (type == 1)
            c *= (1 + r);

        // fv = -(((1 + r)^N - 1) / r * c + pv * (1 + r)^N);
        var fv = -((Math.pow(1 + r, nper) - 1) / r * c + pv * Math.pow(1 + r, nper));

        // return results to caller.
        return fv;
    }

    /**
     * 基于固定利率及等额分期付款方式，返回给定期数内对投资的利息偿还额
     * @param r
     * @param per
     * @param nper
     * @param pv
     * @param fv
     * @param type
     * @returns {number}
     * @private
     */
    function _ipmt(r, per, nper, pv,fv, type) {

        var ipmt = _fv(r, per - 1, _pmt(r, nper, pv, fv, type), pv, type) * r;

        // account for payments at beginning of period versus end.
        if (type == 1)
            ipmt /= (1 + r);

        // return results to caller.
        return ipmt;
    }

    function ipmt(r, per, nper, pv) {
        return _ipmt(r, per, nper, pv,0, 0);
    }

    /**
     * PPMT函数是基于固定利率及等额分期付款方式，返回投资在某一给定期间内的本金偿还额。
     * @param r
     * @param per
     * @param nper
     * @param pv
     * @param fv
     * @param type
     * @returns {number}
     * @private
     */
    function _ppmt(r, per, nper, pv,fv,type) {
        return _pmt(r, nper, pv, fv, type) - _ipmt(r, per, nper, pv, fv, type);
    }

    function ppmt(r, per, nper, pv) {
        return _ppmt(r, per, nper, pv,0,0);
    }


})();


