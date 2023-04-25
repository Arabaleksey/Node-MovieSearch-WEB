export default class UserDto {
  name: string;
  surname:string;
  email: string;
  id: string;
  isActivated: boolean;

  constructor(model:any) {
    this.name = model.name;
    this.surname = model.surname;
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
};
