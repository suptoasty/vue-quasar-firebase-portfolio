class Game {
  description: String = "";
  image: String = "";
  imageAlt: String = "";
  shortDescription: String = "";
  subTitle: String = "";
  title: String = "";

  constructor(
    title: String = "",
    subTitle: String = "",
    desription: String = "",
    image: String = "",
    imageAlt: String = ""
  ) {
    this.title = title;
    this.subTitle = subTitle;
    this.description = desription;
    this.image = image;
    this.imageAlt = imageAlt;

    this.createShortDescription(this.description);
  }

  createShortDescription(description: String = this.description) {
    this.shortDescription = description
      .slice(0, 97)
      .split(" ")
      .slice(0, -1)
      .join(" ")
      .concat("...");

    return this.shortDescription;
  }
}

export default { Game };
