function getListRequestHandler(schema) {
  return {
    items: schema.db.repoList,
    totalCount: schema.db.repoList.length
  };
}

function deleteListRequestHandler(schema, request) {
  const { id = '' } = request.queryParams;
  schema.db.repoList.remove(id);
  return { ...schema.db.deleteRepo[0] };
}

export { getListRequestHandler, deleteListRequestHandler };
