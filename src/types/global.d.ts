type LinkType = {
  href: string;
  name: string;
}

type CardType = {
  title: string;
  description: string;
  img: string;
}

type CardsType = CardType[];

type WorkType = {
  title: string;
  img: string;
  categories: string[];
}

type WorksType = WorkType[];