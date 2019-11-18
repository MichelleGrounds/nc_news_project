const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("taking an empty array returns an empty array", () => {
    const input = [];
    const actual = formatDates(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("given an array with an object convert the timestamps to JS object format and don't change anythinge else", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ];
    const actual = formatDates(input);
    const expected = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: new Date(1471522072389)
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("given an array with two objects only convert the timestamps to suitable formats", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256
      }
    ];
    const actual = formatDates(input);
    const expected = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: new Date(1471522072389)
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: new Date(1500584273256)
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("given an array of data return the data unmutated", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256
      }
    ];
    const originalInput = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256
      }
    ];
    formatDates(input);
    expect(input).to.eql(originalInput);
  });
});

describe("makeRefObj", () => {
  it("given an empty array returns an empty object", () => {
    const input = [];
    const actual = makeRefObj(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it("given an array with an object: creates a key of article_id and its title", () => {
    const input = [{ article_id: 1, title: "A" }];
    const actual = makeRefObj(input);
    const expected = { A: 1 };
    expect(actual).to.eql(expected);
  });
  it("given an array with two objects: creates a key of article_id and its title", () => {
    const input = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" }
    ];
    const actual = makeRefObj(input);
    const expected = { A: 1, B: 2 };
    expect(actual).to.eql(expected);
  });
});

describe.only("formatComments", () => {
  it("given an empty array, returns an empty array", () => {
    const input = [];
    const actual = formatComments(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("given an array with one object, return a correct comment object in the array", () => {
    const input = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      }
    ];
    const articleRef = { "Making sense of Redux": 4 };
    const actual = formatComments(input, articleRef);
    const expected = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        article_id: 4,
        author: "grumpy19",
        votes: 7,
        created_at: new Date(1478813209256)
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("given an array with two objects or more return the cprrect comment object in the array", () => {
    const input = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        belongs_to: "Running a Node App",
        created_by: "weegembump",
        votes: 11,
        created_at: 1454293795551
      }
    ];
    const articleRef = { "Making sense of Redux": 4, "Running a Node App": 1 };
    const actual = formatComments(input, articleRef);
    const expected = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        article_id: 4,
        author: "grumpy19",
        votes: 7,
        created_at: new Date(1478813209256)
      },
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        article_id: 1,
        author: "weegembump",
        votes: 11,
        created_at: new Date(1454293795551)
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("when given an array of objects do not mutate the original data", () => {
    const input = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        belongs_to: "Running a Node App",
        created_by: "weegembump",
        votes: 11,
        created_at: 1454293795551
      }
    ];
    const articleRef = { "Making sense of Redux": 4, "Running a Node App": 1 };
    formatComments(input, articleRef);
    const originalInput = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        belongs_to: "Running a Node App",
        created_by: "weegembump",
        votes: 11,
        created_at: 1454293795551
      }
    ];
    expect(input).to.eql(originalInput);
  });
});
