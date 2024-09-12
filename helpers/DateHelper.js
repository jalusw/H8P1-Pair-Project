class DateHelper {
  static generateTimestamp() {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  static formatDateInputValue(date) {
    return new Date(date).toISOString().substring(0, 10);
  }

  static formatToID(date) {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
    }).format(date);
  }
}
module.exports = DateHelper;
