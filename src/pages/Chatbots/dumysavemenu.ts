export const dummySavedMenus = [
    {
      id: 1,
      name: "Main Menu 1",
      key: "main1",
      children: [
        {
          id: 101,
          type: "Text",
          name: "Welcome to our services!",
        },
        {
          id: 102,
          type: "Image",
          name: "https://via.placeholder.com/100x60",
        },
      ],
      subMenus: [
        {
          id: 11,
          name: "Sub Menu A",
          key: "2",
          children: [
            {
              id: 111,
              type: "Document",
              name: "https://example.com/doc1.pdf",
            },
          ],
          subMenus: [
            {
              id: 1111,
              name: "Sub Sub Menu A1",
              key: "4",
              children: [],
              subMenus: [
                {
                    id: 1112,
                    name: "Sub Sub Menu A1",
                    key: "5", 
                }
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Main Menu 2",
      key: "main2",
      children: [],
      subMenus: [],
    },
  ];
  