create table trip_docs (
  id bigserial primary key,
  content text, 
  embedding vector(1024)
);
