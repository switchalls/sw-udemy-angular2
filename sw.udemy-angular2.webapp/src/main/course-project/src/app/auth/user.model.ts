export interface StoredUser {
    email:       string;
    id:          string;
    _token:      string;
    _expiryDate: string;
}

export class User {

    constructor(
        public email: string,
        public id: string,
        private _token:string,
        private _expiryDate: Date) {
    }

    get token() {
        if (this.isExpired()) {
            return null;
        }

        return this._token;
    }

    isExpired() {
        return new Date() > this._expiryDate;
    }

}