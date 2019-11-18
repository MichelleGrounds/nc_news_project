exports.formatDates = list => {
  return list.map(item => {
    const newItem = { ...item };
    newItem.created_at = new Date(newItem.created_at);
    return newItem;
  });
};

exports.makeRefObj = list => {
  const articleRefObj = {};
  list.forEach(item => {
    articleRefObj[item.title] = item.article_id;
  });
  return articleRefObj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(originalComment => {
    const comment = { ...originalComment };
    //created_by is now author
    comment.author = comment.created_by;
    delete comment.created_by;
    //belongs_to is now article_id
    comment.article_id = comment.belongs_to;
    delete comment.belongs_to;
    //article_id refers to the refObject
    comment.article_id = articleRef[comment.article_id];
    //created_at is now in the correct format
    comment.created_at = new Date(comment.created_at);

    return comment;
  });
};
