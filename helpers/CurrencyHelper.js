class CurrencyHelper{
  static toIDR(number){
    return Intl.NumberFormat('id-ID').format(number);
  }
}
module.exports = CurrencyHelper;