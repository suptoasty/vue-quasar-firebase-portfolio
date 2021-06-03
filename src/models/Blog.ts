const categories = [
  {
    label: "Programming",
    value: 0
  },
  {
    label: "Misc.",
    value: 1
  },
  {
    label: "Software",
    value: 2
  },
  {
    label: "Other",
    value: 3
  }
];

class BlogPost {
  categories: Array<Object> = [];
  content: String = "";
  createdOn: Date = new Date();
  updatedOn: Date = new Date();
  userId: String = "";
  userName: String = "";
  author: String = "";
  comments!: Number;
  likes!: Number;
  title: String = "";
  description: String = "";
  featured: boolean = false;
  image: String = "";

  constructor(
    title: String = "",
    content: string = "",
    userId: String,
    author: String
  ) {
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.author = author;
  }
}

// class Comment {
//     id!: Number;

//     constructor() { };
// };

class Like {}

export default { BlogPost, Like };
