import studyListFilter from "./studyListFilter";

test("Returns unchanged array if search is empty or array of elements which include the search term", () => {
  expect(
    studyListFilter(
      [
        {
          user_id: 4,
          recommendation_id: 7,
        },
        {
          user_id: 4,
          recommendation_id: 1,
        },
      ],
      [
        {
          recommendation_id: 1,
          title: "Google",
          author: "Alphabet",
          url: "google.com",
          description: "Very useful link to google",
          content: "Website",
          time: "2022-01-04T15:51:42.234Z",
          recommended_description: "Very useful for googling things",
          recommended: "Recommended",
          user_id: 1,
          stage_id: 2,
        },
        {
          recommendation_id: 6,
          title: "Arrow functions",
          author: "Mozilla",
          url: "[deverlop.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)",
          description: "Introduction to writing arrow function expressions",
          content: "Article",
          time: "2022-01-05T05:38:28.965Z",
          recommended_description:
            "I haven't used it but it could be useful :)",
          recommended: "Promising",
          user_id: 4,
          stage_id: 2,
        },
        {
          recommendation_id: 7,
          title: "Third party APIs",
          author: "Mozilla",
          url: "[developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs)",
          description: "Introduction to using third party APIs",
          content: "Article",
          time: "2022-01-05T05:41:37.758Z",
          recommended_description: "This was bad don't use it",
          recommended: "Not recommended",
          user_id: 4,
          stage_id: 6,
        },
      ]
    )
  ).toStrictEqual([
    {
      recommendation_id: 1,
      title: "Google",
      author: "Alphabet",
      url: "google.com",
      description: "Very useful link to google",
      content: "Website",
      time: "2022-01-04T15:51:42.234Z",
      recommended_description: "Very useful for googling things",
      recommended: "Recommended",
      user_id: 1,
      stage_id: 2,
    },
    {
      recommendation_id: 7,
      title: "Third party APIs",
      author: "Mozilla",
      url: "[developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs)",
      description: "Introduction to using third party APIs",
      content: "Article",
      time: "2022-01-05T05:41:37.758Z",
      recommended_description: "This was bad don't use it",
      recommended: "Not recommended",
      user_id: 4,
      stage_id: 6,
    },
  ]);
});
