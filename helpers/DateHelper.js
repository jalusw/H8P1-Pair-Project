class DateHelper{
  static generateTimestamp(){
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  static formatDateInputValue(date){
    return new Date(date).toISOString().substring(0,10);
  }

  static generateAge(){
    
  }
}
module.exports = DateHelper;