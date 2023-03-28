export class User {
    private static _instance: User;
    public firstName: string | undefined;
    public lastName: string | undefined;
    public dob: string | undefined;
    public street: string | undefined;
    public city: string | undefined;
    public state: string | undefined;
    public jobTitle: string | undefined;
    public phoneNumber: string | undefined;
    public pictureUrl: string | undefined;

    constructor() {
        this.firstName = undefined;
        this.lastName = undefined;
        this.dob = undefined;
        this.street = undefined;
        this.city = undefined;
        this.state = undefined;
        this.jobTitle = undefined;
        this.phoneNumber = undefined;
        this.pictureUrl = undefined;
    }

    public static getUserState() {
        return this._instance || (this._instance = new this());
    }

    setUser(
        firstName: string,
        lastName: string,
        dob: string,
        street: string,
        city: string,
        state: string,
        jobTitle: string,
        phoneNumber: string,
        pictureUrl: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.street = street;
        this.city = city;
        this.state = state;
        this.jobTitle = jobTitle;
        this.phoneNumber = phoneNumber;
        this.pictureUrl = pictureUrl;
    }
    
}