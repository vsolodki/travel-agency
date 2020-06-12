import UU5 from "uu5g04";

export const About = {
  licence: {
    organisation: {
      cs: {
        name: "Unicorn a.s.",
        uri: "https://www.unicorn.com/"
      },
      en: {
        name: "Unicorn a.s.",
        uri: "https://www.unicorn.com/"
      }
    },
    authorities: {
      cs: [
        {
          name: "Vladimír Kovář",
          uri: "https://www.unicorn.com/"
        }
      ],
      en: [
        {
          name: "Vladimír Kovář",
          uri: "https://www.unicorn.com/"
        }
      ]
    }
  },
  leadingAuthors: [
    {
      name: "Vladislav Solodki",
      uuIdentity: "20-5866-1",
      role: {
        en: "Chief Business Architect & Developer"
      }
    },
    {
      name: "Shakhzod Kholikov",
      uuIdentity: "22-9156-1",
      role: {
        en: "Frontend Developer"
      }
    },
    {
      name: "Mukhammad Makhkamov",
      uuIdentity: "22-9332-1",
      role: {
        en: "DB Developer"
      }
    },
    {
      name: "Valeriia Naumova",
      uuIdentity: "20-5943-1",
      role: {
        en: "Designer"
      }
    }

  ],
  usedTechnologies: {
    technologies: {
      en: [
        <UU5.Bricks.LinkUAF />,
        <UU5.Bricks.LinkUuApp />,
        <UU5.Bricks.LinkUU5 />,
        <UU5.Bricks.LinkUuPlus4U5 />,
        <UU5.Bricks.Link
          content="uuProductCatalogue"
          href="https://uuapp.plus4u.net/uu-bookkit-maing01/7f743efd1bf6486d8e72b27a0df92ba7/book"
          target="_blank"
        />,
        <UU5.Bricks.LinkUuAppServer />,
        <UU5.Bricks.LinkUuOIDC />
      ]
    },
    content: {
      cs: [
        `<uu5string/>Dále byly použity technologie: <UU5.Bricks.LinkHTML5/>, <UU5.Bricks.LinkCSS/>, <UU5.Bricks.LinkJavaScript/>, <UU5.Bricks.LinkMaterialDesign/>,
        <UU5.Bricks.LinkReact/>.`
      ],
      en: [
        `<uu5string/>Other used technologies: <UU5.Bricks.LinkHTML5/>, <UU5.Bricks.LinkCSS/>, <UU5.Bricks.LinkJavaScript/>, <UU5.Bricks.LinkMaterialDesign/>,
        <UU5.Bricks.LinkReact/>.`
      ]
    }
  }
};

export default About;
