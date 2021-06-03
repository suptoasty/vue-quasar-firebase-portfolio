class User {
  userName: String = "";
  userId: String = "";
  email: String = "";
  name: String = "";
  title: String = "";

  constructor(
    userName: String = "",
    email: String = "",
    name: String = "",
    title: String = ""
  ) {
    this.userName = userName;
    this.email = email;
    this.name = name;
    this.title = title;
  }
}

export default { User };
