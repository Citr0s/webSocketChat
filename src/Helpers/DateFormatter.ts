export class DateFormatter {
    private date: Date;

    constructor(date) {
        this.date = date;
    }

    toShortDate() {
        let hours = this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours();
        let minutes = this.date.getMinutes() < 10 ? '0' + this.date.getMinutes() : this.date.getMinutes();
        let seconds = this.date.getSeconds() < 10 ? '0' + this.date.getSeconds() : this.date.getSeconds();

        return hours + ':' + minutes + ':' + seconds;
    }
}